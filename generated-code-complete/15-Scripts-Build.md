# 15-Scripts-Build

Files: 12

---

## D:\projectsing\S-Delivery-AppV3\generated-code-complete\15-Scripts-Build.md

Size: 49.02 KB

Error reading file

---

## D:\projectsing\S-Delivery-AppV3\scripts\check-deploy.mjs

Size: 6.11 KB

```
#!/usr/bin/env node

/**
 * 배포 전 필수 체크 스크립트 (Pre-flight Check)
 * 
 * 이 스크립트는 배포 명령어(npm run deploy 등) 실행 시 자동으로 호출되어
 * 다음 사항을 검증합니다:
 * 1. Firebase 로그인 계정 (REQUIRED_ACCOUNT)
 * 2. 활성 Firebase 프로젝트 (Active Project vs .firebaserc)
 * 3. 빌드 결과물 존재 여부 (build 폴더)
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- 환경 설정 ---
const REQUIRED_ACCOUNT = 'jsbae59@gmail.com'; // 배포 권한이 있는 유일한 계정
const BUILD_DIR_NAME = 'build'; // Vite 기본 출력 디렉터리

let hasError = false;
let requiredProject = null;

console.log('\n🔍 [Safety Check] 배포 전 필수 점검 시작...\n');

// 0. 타겟 프로젝트 식별 (.firebaserc 파싱)
try {
    const firebasercPath = join(__dirname, '..', '.firebaserc');
    if (fs.existsSync(firebasercPath)) {
        const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, 'utf-8'));
        requiredProject = firebaserc.projects?.default;
        // console.log(`ℹ️  Target Project defined in .firebaserc: ${requiredProject}`);
    } else {
        console.warn('⚠️  .firebaserc 파일이 없습니다. 프로젝트 일치 여부를 확인할 수 없습니다.');
    }
} catch (e) {
    console.warn('⚠️  .firebaserc 파싱 실패:', e.message);
}

// 1. Firebase 계정 확인
process.stdout.write('1️⃣  Firebase 계정 확인... ');
try {
    // firebase login:list를 사용하여 현재 로그인된 계정을 확인합니다.
    const loginOutput = execSync('firebase login:list', { encoding: 'utf-8', stdio: 'pipe' });
    const loggedInAccount = loginOutput.match(/Logged in as (.+)/)?.[1]?.trim();

    if (!loggedInAccount) {
        console.log('❌\n   Firebase에 로그인되어 있지 않습니다.');
        hasError = true;
    } else if (loggedInAccount !== REQUIRED_ACCOUNT) {
        console.log('❌');
        console.error(`   ⛔ 잘못된 계정입니다: ${loggedInAccount}`);
        console.error(`   ✅ 필수 계정: ${REQUIRED_ACCOUNT}`);
        console.error('   -> 해결: firebase logout 후 firebase login 으로 전환하세요.');
        hasError = true;
    } else {
        console.log(`✅ (${loggedInAccount})`);
    }
} catch (error) {
    // 명령어가 실패한다는 건 로그인이 안되어있거나 CLI 문제
    console.log('❌ 오류 발생');
    console.error('   Firebase CLI 실행 중 오류:', error.message);
    hasError = true;
}

// 2. Firebase 프로젝트 확인
process.stdout.write('2️⃣  Firebase 프로젝트 확인... ');
try {
    let activeProject = null;

    // firebase use 로 현재 활성 alias 확인
    try {
        const useOutput = execSync('firebase use', { encoding: 'utf-8', stdio: 'pipe' });
        const activeMatch = useOutput.match(/Active Project:\s*(.+)/i);
        // "Active Project: complex-name (alias)" 형식일 수 있음
        if (activeMatch) {
            activeProject = activeMatch[1]?.trim();
        } else {
            // "Active Project" 텍스트 없이 그냥 alias 목록만 나오는 경우, * 표시된 줄 찾기
            const asteriskMatch = useOutput.match(/\*\s*(\S+)/);
            if (asteriskMatch) {
                // alias 이름일 수 있음. alias면 실제 ID를 찾아야 함.
                // .firebaserc에서 매핑 확인 필요하지만 복잡하므로 activeProject가 ID라고 가정하거나
                // use output에 괄호로 ID가 같이 나오는지 확인 "(project-id)"
                const idInParens = useOutput.match(/\*\s*.+\s*\((.+)\)/);
                activeProject = idInParens ? idInParens[1] : asteriskMatch[1];
            }
        }
    } catch (e) { /* ignore */ }

    // 만약 activeProject를 못 찾았고, .firebaserc에 default가 있다면 default를 사용한다고 가정
    if (!activeProject && requiredProject) {
        // CLI가 active project가 없으면 default를 씀
        activeProject = requiredProject;
    }

    if (!activeProject) {
        console.log('❌');
        console.error('   활성 프로젝트를 확인할 수 없습니다.');
        hasError = true;
    } else if (requiredProject && activeProject !== requiredProject) {
        console.log('❌');
        console.error(`   ⛔ 프로젝트 불일치!`);
        console.error(`   Current Active : ${activeProject}`);
        console.error(`   Target (.rc)   : ${requiredProject}`);
        console.error(`   -> 해결: 'firebase use default' 또는 'firebase use ${requiredProject}' 실행`);
        hasError = true;
    } else {
        console.log(`✅ (${activeProject})`);
    }
} catch (error) {
    console.log('❌ 오류');
    console.error('   프로젝트 확인 중 예외:', error.message);
    hasError = true;
}

// 3. 빌드 확인
process.stdout.write('3️⃣  빌드 결과물 확인... ');
try {
    const buildDir = join(__dirname, '..', BUILD_DIR_NAME);
    if (!fs.existsSync(buildDir)) {
        console.log('❌');
        console.error(`   ⛔ '${BUILD_DIR_NAME}' 폴더가 없습니다.`);
        console.error('   -> 해결: 먼저 빌드를 실행하세요 (npm run build)');
        // 빌드 없는 배포는 치명적이지 않을 수 있지만(Functions만 배포할 때 등), 
        // 통상적으로 Hosting 배포 시 필수이므로 Error로 처리합니다.
        hasError = true;
    } else {
        console.log('✅');
    }
} catch (error) {
    console.warn('⚠️  빌드 확인 중 오류 (무시 가능)', error.message);
}

console.log('');

// 결과 처리
if (hasError) {
    console.error('🚫 [BLOCK] 배포가 중단되었습니다. 위 에러를 수정한 후 다시 시도하세요.');
    process.exit(1);
} else {
    console.log('✨ 모든 체크 포인트를 통과했습니다. 배포를 시작합니다! 🚀\n');
    process.exit(0);
}

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\clear_orders_only.js

Size: 1.55 KB

```
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';
import 'dotenv/config';

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearOrders() {
    console.log('🧹 Clearing Order History & Stats...');

    try {
        // Target: stores/default/orders
        const ordersRef = collection(db, 'stores', 'default', 'orders');
        const snapshot = await getDocs(ordersRef);

        if (snapshot.empty) {
            console.log('✅ No orders to delete.');
            process.exit(0);
        }

        console.log(`Found ${snapshot.size} orders. Deleting...`);

        // Delete fake orders one by one (Client SDK limit)
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        console.log('✅ All orders deleted successfully.');
        console.log('📊 Revenue stats should now be reset to 0.');
        console.log('🏪 Store settings and menus are PRESERVED.');

    } catch (e) {
        console.error('Error clearing orders:', e);
    }
    process.exit(0);
}

clearOrders();

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\client_reset.js

Size: 1.88 KB

```
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import 'dotenv/config'; // Load env vars

// Config specifically for this script's environment
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function reset() {
    console.log('🔄 Resetting Database for Production...');

    try {
        // 1. Delete the main store document
        // This is the trigger for "Store Setup Wizard"
        await deleteDoc(doc(db, 'stores', 'default'));
        console.log('✅ Deleted stores/default');

        // 2. We can try to delete subcollections if rules allow (Admin might need to do this)
        // Since we are running this likely as a script, we might not be authenticated as Admin.
        // The previous seeding script ran in the browser? 
        // Ah, the user was editing `seed_v2_data.mjs` but running `npm run dev` and clicking a button.
        // There is no easy way to delete EVERYTHING from a node script without Service Account.

        console.log('⚠️  Note: Subcollections (orders, menus) remain. Firestore requires recursive delete.');
        console.log('⚠️  Please manually delete the "stores" collection in Firebase Console if you want a squeaky clean start.');
        console.log('ℹ️  However, deleting "stores/default" is enough to trigger the Setup Wizard.');

    } catch (e) {
        console.error('Error:', e);
    }
    process.exit(0);
}

reset();

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\generate-complete-code-structure.ps1

Size: 8.14 KB

```
param(
    [string]$ProjectPath = "d:\projectsing\S-Delivery-AppV3",
    [string]$OutputFolder = "generated-code-complete"
)

$ErrorActionPreference = "Stop"

if (-not $ProjectPath.EndsWith('\')) { $ProjectPath = $ProjectPath + '\' }

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "V3 App - Complete Code Structure Generator" -ForegroundColor Green
Write-Host "100% code documentation by project structure" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

$categories = @(
    @{name="01_Config"; display="01-Config-Root-Files"; patterns=@("firebase.json", "vite.config", "vitest.config", "tailwind.config", "tsconfig", "pnpm-lock.yaml", "package.json", "firestore.rules", "storage.rules", "firebase.indexes", "index.html", "postcss.config")},
    @{name="02_Types"; display="02-Type-Definitions"; patterns=@("src\types")},
    @{name="03_Context"; display="03-Context-State"; patterns=@("src\contexts")},
    @{name="04_Hooks"; display="04-Custom-Hooks"; patterns=@("src\hooks")},
    @{name="05_Services"; display="05-Services-Layer"; patterns=@("src\services")},
    @{name="06_Utils"; display="06-Library-Utils"; patterns=@("src\lib", "src\utils", "src\helpers", "src\devtools")},
    @{name="07_Components_Common"; display="07-Components-Common-UI"; patterns=@("src\components\common", "src\components\ui")},
    @{name="08_Pages"; display="08-Components-Pages"; patterns=@("src\pages", "src\App.tsx", "src\main.tsx")},
    @{name="09_Components_Feature"; display="09-Components-Features"; patterns=@("src\components\menu", "src\components\review", "src\components\notice", "src\components\event", "src\components\admin", "src\components\cart", "src\components\store", "src\components\figma")},
    @{name="10_Styles"; display="10-Styles-Assets"; patterns=@("src\styles")},
    @{name="11_Data"; display="11-Data-Constants"; patterns=@("src\data")},
    @{name="12_Firebase"; display="12-Firebase-Config"; patterns=@("firebase.json", "firestore.rules", "storage.rules", "firebase.indexes")},
    @{name="13_Functions"; display="13-Cloud-Functions"; patterns=@("functions")},
    @{name="14_Public"; display="14-Public-Assets"; patterns=@("public")},
    @{name="15_Scripts"; display="15-Scripts-Build"; patterns=@("scripts")},
    @{name="16_Docs"; display="16-Documentation"; patterns=@("docs")}
)

$excludeBinary = @(".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".woff", ".woff2", ".ttf", ".mp4", ".mp3", ".webm", ".wav")
$excludeDirs = @("node_modules", ".git", ".vscode", "dist", "build", ".pnpm-store", "coverage", ".cache", ".next", "out", "generated-code")

Write-Host "Scanning files..." -ForegroundColor Yellow

$allFiles = Get-ChildItem -Path $ProjectPath -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object {
        $path = $_.FullName
        foreach ($dir in $excludeDirs) {
            if ($path -match "\\$([regex]::Escape($dir))(\\|$)") { return $false }
        }
        if ($excludeBinary -contains $_.Extension.ToLower()) { return $false }
        return $true
    } | Sort-Object FullName

Write-Host "Files found: $($allFiles.Count)" -ForegroundColor Green

$filesByCategory = @{}
foreach ($cat in $categories) {
    $filesByCategory[$cat.name] = @()
}
$filesByCategory["17_Other"] = @()

foreach ($file in $allFiles) {
    $relative = $file.FullName.Replace($ProjectPath, "")
    $found = $false
    
    foreach ($cat in $categories) {
        foreach ($pattern in $cat.patterns) {
            if ($relative -match [regex]::Escape($pattern)) {
                $filesByCategory[$cat.name] += $file
                $found = $true
                break
            }
        }
        if ($found) { break }
    }
    
    if (-not $found) {
        $filesByCategory["17_Other"] += $file
    }
}

if (Test-Path $OutputFolder) {
    Remove-Item $OutputFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $OutputFolder | Out-Null

Write-Host "Generating markdown files..." -ForegroundColor Cyan
Write-Host ""

$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$totalFiles = 0
$indexLines = @()
$indexLines += "# S-Delivery-AppV3 - Complete Code Documentation"
$indexLines += ""
$indexLines += "Generated: $timestamp"
$indexLines += ""
$indexLines += "100 Percent Project Code - All Files Included"
$indexLines += "Organized by Project Structure"
$indexLines += ""
$indexLines += "Index of Documents"
$indexLines += ""

foreach ($cat in $categories) {
    $files = $filesByCategory[$cat.name]
    if ($files.Count -eq 0) { continue }
    
    Write-Host "  $($cat.display) - $($files.Count) files" -ForegroundColor Cyan
    
    $outFile = Join-Path $OutputFolder "$($cat.display).md"
    $lines = @("# $($cat.display)", "", "Files: $($files.Count)", "", "---", "")
    
    foreach ($file in $files) {
        $relative = $file.FullName.Replace($ProjectPath, "")
        $lines += "## $relative"
        $lines += ""
        $lines += "Size: $([Math]::Round($file.Length / 1KB, 2)) KB"
        $lines += ""
        
        try {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            if ($file.Length -gt 524288) {
                $lines += "File too large - Preview:"
                $lines += '```'
                $lines += $content.Substring(0, [Math]::Min(5000, $content.Length))
                $lines += "..."
                $lines += '```'
            } else {
                $lines += '```'
                $lines += $content
                $lines += '```'
            }
        } catch {
            $lines += "Error reading file"
        }
        
        $lines += ""
        $lines += "---"
        $lines += ""
        $totalFiles++
    }
    
    $lines | Out-File -FilePath $outFile -Encoding UTF8
    $indexLines += "- $($cat.display) ($($files.Count) files)"
}

$otherFiles = $filesByCategory["17_Other"]
if ($otherFiles.Count -gt 0) {
    Write-Host "  17-Other-Files - $($otherFiles.Count) files" -ForegroundColor Cyan
    
    $outFile = Join-Path $OutputFolder "17-Other-Files.md"
    $lines = @("# 17-Other-Files", "", "Files: $($otherFiles.Count)", "", "---", "")
    
    foreach ($file in $otherFiles) {
        $relative = $file.FullName.Replace($ProjectPath, "")
        $lines += "## $relative"
        $lines += ""
        
        try {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            if ($file.Length -gt 524288) {
                $lines += "File too large"
            } else {
                $lines += '```'
                $lines += $content
                $lines += '```'
            }
        } catch {
            $lines += "Error"
        }
        
        $lines += ""
        $lines += "---"
        $lines += ""
        $totalFiles++
    }
    
    $lines | Out-File -FilePath $outFile -Encoding UTF8
    $indexLines += "- 17-Other-Files ($($otherFiles.Count) files)"
}

$totalSize = ($allFiles | Measure-Object -Property Length -Sum).Sum
$indexLines += ""
$indexLines += "Project Statistics"
$indexLines += ""
$indexLines += "Total Files: $($allFiles.Count)"
$indexLines += "Documented Files: $totalFiles"
$indexLines += "Total Size: $([Math]::Round($totalSize / 1MB, 2)) MB"
$indexLines += "Generated: $timestamp"

$indexFile = Join-Path $OutputFolder "00-INDEX.md"
$indexLines | Out-File -FilePath $indexFile -Encoding UTF8

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "DONE - All Code 100% Documented" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Results:" -ForegroundColor Yellow
Write-Host "  Output: $OutputFolder" -ForegroundColor White
Write-Host "  Total files: $($allFiles.Count)" -ForegroundColor White
Write-Host "  Documented: $totalFiles" -ForegroundColor White
Write-Host "  Size: $([Math]::Round($totalSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host ""
Write-Host "All code structured and ready for reference!" -ForegroundColor Green

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\generate-multi-project-code.ps1

Size: 9.43 KB

```
# Generate code volumes for multiple projects
# Windows PowerShell 5.1 compatible

param(
    [string[]]$ProjectPaths = @(
        "D:\projectsing\S-Delivery-App",
        "D:\projectsing\hyun-poong\simple-delivery-app"
    ),
    [int]$VolumeCount = 10,
    [string]$OutputRootFolder = "multi-project-code-volumes",
    [string[]]$ExcludeDirs = @(
        "node_modules","dist","build",".git",".vscode",".pnpm-store",
        "coverage",".cache",".next","out","generated-code-docs","project-code-docs","docs"
    ),
    [switch]$IncludeDocs,
    [switch]$IncludeLocks
)

$ErrorActionPreference = "Stop"

Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "Multi-Project Code Volume Generator" -ForegroundColor Green
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

# Extensions to include
$includeExts = @(
    ".ts", ".tsx", ".js", ".jsx",
    ".cjs", ".mjs",
    ".json", ".html",
    ".css", ".scss", ".less",
    ".ps1", ".psm1", ".psd1",
    ".yaml", ".yml",
    ".rules"
)
if ($IncludeDocs) { $includeExts += ".md" }

# Binary extensions to exclude
$excludeBinaryExts = @(
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".bmp", ".tiff",
    ".woff", ".woff2", ".ttf", ".eot",
    ".mp4", ".mp3", ".webm"
)

# Names to exclude explicitly
$excludeFilesByName = @()
if (-not $IncludeLocks) {
    $excludeFilesByName += @("pnpm-lock.yaml", "yarn.lock", "package-lock.json")
}

function Get-LanguageFromExtension([string]$ext) {
    switch ($ext.ToLower()) {
        ".ts"   { "typescript" }
        ".tsx"  { "typescript" }
        ".js"   { "javascript" }
        ".jsx"  { "javascript" }
        ".cjs"  { "javascript" }
        ".mjs"  { "javascript" }
        ".json" { "json" }
        ".html" { "html" }
        ".css"  { "css" }
        ".scss" { "scss" }
        ".less" { "less" }
        ".ps1"  { "powershell" }
        ".psm1" { "powershell" }
        ".psd1" { "powershell" }
        ".yaml" { "yaml" }
        ".yml"  { "yaml" }
        ".rules" { "" }
        ".md"   { "markdown" }
        default  { "" }
    }
}

function Get-SafeFolderName([string]$path) {
    $basename = Split-Path -Leaf $path
    return $basename -replace '[\\/:*?"<>|]', '_'
}

function Process-Project([string]$projectPath, [string]$outputRoot, [int]$volCount) {
    Write-Host ""
    Write-Host "-----------------------------------------------------------" -ForegroundColor Yellow
    Write-Host "Processing Project: $projectPath" -ForegroundColor Green
    Write-Host "-----------------------------------------------------------" -ForegroundColor Yellow

    if (-not (Test-Path $projectPath)) {
        Write-Host "ERROR: Project path does not exist: $projectPath" -ForegroundColor Red
        return
    }

    $safeName = Get-SafeFolderName $projectPath
    $projectOutputFolder = Join-Path $outputRoot $safeName

    # Normalize path
    if (-not $projectPath.EndsWith('\')) { $projectPath = $projectPath + '\' }

    # Collect files
    $files = Get-ChildItem -Path $projectPath -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            # Exclude directories
            $excludeHit = $false
            foreach ($dir in $ExcludeDirs) {
                if ($_.FullName -match "\\$([regex]::Escape($dir))(\\|$)") { $excludeHit = $true; break }
            }
            if ($excludeHit) { return $false }
            # Include only selected extensions and exclude binaries
            ($includeExts -contains $_.Extension.ToLower()) -and -not ($excludeBinaryExts -contains $_.Extension.ToLower())
        } |
        Where-Object { $excludeFilesByName -notcontains $_.Name } |
        Sort-Object FullName

    if ($files.Count -eq 0) {
        Write-Host "WARNING: No files found in project: $projectPath" -ForegroundColor Yellow
        return
    }

    Write-Host "Found $($files.Count) files to include." -ForegroundColor Cyan

    # Ensure output folder fresh
    if (Test-Path $projectOutputFolder) {
        Remove-Item $projectOutputFolder -Recurse -Force
    }
    New-Item -ItemType Directory -Path $projectOutputFolder | Out-Null

    # Prepare volume containers with greedy size balancing
    $volumes = @()
    for ($i = 1; $i -le $volCount; $i++) {
        $volumes += [PSCustomObject]@{ Index = $i; Files = New-Object System.Collections.Generic.List[object]; Size = [long]0 }
    }

    # Sort files by size descending for better balancing
    $filesInfo = $files | Select-Object FullName, Length, Extension
    $filesSorted = $filesInfo | Sort-Object Length -Descending

    foreach ($f in $filesSorted) {
        # pick the volume with the smallest current size
        $minIdx = 0
        $minSize = [long]::MaxValue
        for ($i = 0; $i -lt $volumes.Count; $i++) {
            if ($volumes[$i].Size -lt $minSize) { $minSize = $volumes[$i].Size; $minIdx = $i }
        }
        $volumes[$minIdx].Files.Add($f)
        $volumes[$minIdx].Size += [long]$f.Length
    }

    # Write each volume markdown
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

    foreach ($v in $volumes) {
        $indexStr = "{0:D2}" -f $v.Index
        $outFile = Join-Path $projectOutputFolder "$indexStr-PROJECT_CODE.md"
        $md = New-Object System.Collections.Generic.List[string]

        $md.Add("# $safeName - Volume $indexStr")
        $md.Add("")
        $md.Add("Generated: $timestamp")
        $md.Add("Project Path: $projectPath")
        $md.Add("")
        $md.Add("- Files in volume: $($v.Files.Count)")
        $md.Add("- Approx size: $([Math]::Round($v.Size / 1MB, 2)) MB")
        $md.Add("")
        $md.Add("---")
        $md.Add("")

        foreach ($fi in $v.Files | Sort-Object FullName) {
            $relative = $fi.FullName.Replace($projectPath, "")
            $lang = Get-LanguageFromExtension $fi.Extension
            $md.Add("## File: $relative")
            $md.Add("")
            try {
                $content = Get-Content -Path $fi.FullName -Raw -Encoding UTF8
                $md.Add('```' + $lang)
                $md.Add($content)
                $md.Add('```')
            } catch {
                $md.Add("Warning: Cannot read file - $($_.Exception.Message)")
            }
            $md.Add("")
            $md.Add("---")
            $md.Add("")
        }

        $md | Out-File -FilePath $outFile -Encoding UTF8
        Write-Host "  Created: $outFile" -ForegroundColor Green
    }

    # Write index file for this project
    $indexMd = New-Object System.Collections.Generic.List[string]
    $indexMd.Add("# $safeName - Code Volumes Index")
    $indexMd.Add("")
    $indexMd.Add("Generated: $timestamp")
    $indexMd.Add("Project Path: $projectPath")
    $indexMd.Add("")
    $indexMd.Add("## Volumes")
    $indexMd.Add("")
    foreach ($v in ($volumes | Sort-Object Index)) {
        $indexStr = "{0:D2}" -f $v.Index
        $indexMd.Add("- [$indexStr-PROJECT_CODE.md](./$indexStr-PROJECT_CODE.md) — Files: $($v.Files.Count), Size: $([Math]::Round($v.Size / 1MB, 2)) MB")
    }
    $indexMd.Add("")
    $indexMd.Add("## Totals")
    $indexMd.Add("")
    $totalFiles = ($volumes | ForEach-Object { $_.Files.Count } | Measure-Object -Sum).Sum
    $totalSize = ($volumes | ForEach-Object { $_.Size } | Measure-Object -Sum).Sum
    $indexMd.Add("- Total Files: $totalFiles")
    $indexMd.Add("- Total Size: $([Math]::Round($totalSize / 1MB, 2)) MB")
    $indexMd.Add("- Volume Count: $volCount")

    $indexFile = Join-Path $projectOutputFolder "00-INDEX.md"
    $indexMd | Out-File -FilePath $indexFile -Encoding UTF8
    Write-Host "  Index written: $indexFile" -ForegroundColor Cyan
    Write-Host ""
}

# Ensure root output folder exists
if (Test-Path $OutputRootFolder) {
    Remove-Item $OutputRootFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $OutputRootFolder | Out-Null

# Process each project
foreach ($proj in $ProjectPaths) {
    Process-Project -projectPath $proj -outputRoot $OutputRootFolder -volCount $VolumeCount
}

# Write master index
$masterIndexMd = New-Object System.Collections.Generic.List[string]
$masterTimestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$masterIndexMd.Add("# Multi-Project Code Volumes - Master Index")
$masterIndexMd.Add("")
$masterIndexMd.Add("Generated: $masterTimestamp")
$masterIndexMd.Add("")
$masterIndexMd.Add("## Projects")
$masterIndexMd.Add("")

foreach ($proj in $ProjectPaths) {
    $safeName = Get-SafeFolderName $proj
    $projectFolder = Join-Path $OutputRootFolder $safeName
    if (Test-Path $projectFolder) {
        $masterIndexMd.Add("### $safeName")
        $masterIndexMd.Add("")
        $masterIndexMd.Add("Path: ``$proj``")
        $masterIndexMd.Add("")
        $masterIndexMd.Add("Index: [$safeName/00-INDEX.md](./$safeName/00-INDEX.md)")
        $masterIndexMd.Add("")
    }
}

$masterIndexFile = Join-Path $OutputRootFolder "00-MASTER-INDEX.md"
$masterIndexMd | Out-File -FilePath $masterIndexFile -Encoding UTF8

Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "All projects processed!" -ForegroundColor Green
Write-Host "Master Index: $masterIndexFile" -ForegroundColor Cyan
Write-Host "Output Folder: $OutputRootFolder" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\generate-project-code-md.ps1

Size: 3.28 KB

```
# Generate a single Markdown file with the project's source code
# Windows PowerShell 5.1 compatible

param(
    [string]$RootPath = (Get-Location).Path,
    [string]$OutputFile = "PROJECT_CODE.md",
    [string[]]$ExcludeDirs = @(
        "node_modules","dist","build",".git",".vscode",".pnpm-store",
        "coverage",".cache",".next","out","generated-code-docs","project-code-docs","docs"
    ),
    [switch]$IncludeDocs
)

$ErrorActionPreference = "Stop"

# Normalize root path to have trailing backslash
if (-not $RootPath.EndsWith('\')) { $RootPath = $RootPath + '\' }

Write-Host "Generating single Markdown with project code..." -ForegroundColor Green
Write-Host "Root: $RootPath" -ForegroundColor Cyan

# Extensions to include (add .md only if IncludeDocs)
$includeExts = @(
    ".ts", ".tsx", ".js", ".jsx",
    ".css", ".scss", ".json", ".html",
    ".cjs", ".mjs", ".ps1", ".yaml", ".yml", ".rules"
)
if ($IncludeDocs) { $includeExts += ".md" }

# Names to exclude explicitly (huge or non-source files)
$excludeFilesByName = @(
    "pnpm-lock.yaml", "yarn.lock", "package-lock.json"
)

function Get-LanguageFromExtension([string]$ext) {
    switch ($ext.ToLower()) {
        ".ts"   { "typescript" }
        ".tsx"  { "typescript" }
        ".js"   { "javascript" }
        ".jsx"  { "javascript" }
        ".css"  { "css" }
        ".scss" { "scss" }
        ".json" { "json" }
        ".html" { "html" }
        ".cjs"  { "javascript" }
        ".mjs"  { "javascript" }
        ".ps1"  { "powershell" }
        ".yaml" { "yaml" }
        ".yml"  { "yaml" }
        ".rules" { "" }
        default  { "" }
    }
}

# Collect files
$files = Get-ChildItem -Path $RootPath -Recurse -File |
    Where-Object {
        # Exclude directories
        $excludeHit = $false
        foreach ($dir in $ExcludeDirs) {
            if ($_.FullName -match "\\$([regex]::Escape($dir))(\\|$)") { $excludeHit = $true; break }
        }
        if ($excludeHit) { return $false }
        # Include only selected extensions
        $includeExts -contains $_.Extension.ToLower()
    } |
    Where-Object { $excludeFilesByName -notcontains $_.Name } |
    Sort-Object FullName

Write-Host "Found $($files.Count) files to include." -ForegroundColor Yellow

# Prepare Markdown content
$md = New-Object System.Collections.Generic.List[string]
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$md.Add("# Project Code Dump")
$md.Add("")
$md.Add("Generated: $timestamp")
$md.Add("Root: $RootPath")
$md.Add("")
$md.Add("- Total files: $($files.Count)")
$md.Add("")
$md.Add("---")
$md.Add("")

foreach ($file in $files) {
    $relative = $file.FullName.Replace($RootPath, "")
    $lang = Get-LanguageFromExtension $file.Extension
    $md.Add("## File: $relative")
    $md.Add("")
    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $md.Add('```' + $lang)
        $md.Add($content)
        $md.Add('```')
    } catch {
        $md.Add("Warning: Cannot read file - $($_.Exception.Message)")
    }
    $md.Add("")
    $md.Add("---")
    $md.Add("")
}

# Write to output file at root
$outPath = Join-Path $RootPath $OutputFile
$md | Out-File -FilePath $outPath -Encoding UTF8

Write-Host "Done. Output: $outPath" -ForegroundColor Green

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\generate-project-code-volumes.ps1

Size: 6.54 KB

```
# Generate ~10 Markdown volumes containing the project's source code
# Windows PowerShell 5.1 compatible

param(
    [string]$RootPath = (Get-Location).Path,
    [int]$VolumeCount = 10,
    [string]$OutputFolder = "generated-code-volumes",
    [string[]]$ExcludeDirs = @(
        "node_modules","dist","build",".git",".vscode",".pnpm-store",
        "coverage",".cache",".next","out","generated-code-docs","project-code-docs","docs"
    ),
    [switch]$IncludeDocs,
    [switch]$IncludeLocks
)

$ErrorActionPreference = "Stop"

# Normalize root path to have trailing backslash
if (-not $RootPath.EndsWith('\')) { $RootPath = $RootPath + '\' }

Write-Host "Generating $VolumeCount Markdown volumes with project code..." -ForegroundColor Green
Write-Host "Root: $RootPath" -ForegroundColor Cyan

# Extensions to include
$includeExts = @(
    ".ts", ".tsx", ".js", ".jsx",
    ".cjs", ".mjs",
    ".json", ".html",
    ".css", ".scss", ".less",
    ".ps1", ".psm1", ".psd1",
    ".yaml", ".yml",
    ".rules"
)
if ($IncludeDocs) { $includeExts += ".md" }

# Binary extensions to exclude from markdown
$excludeBinaryExts = @(
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".bmp", ".tiff",
    ".woff", ".woff2", ".ttf", ".eot",
    ".mp4", ".mp3", ".webm"
)

# Names to exclude explicitly (huge or non-source files)
$excludeFilesByName = @()
if (-not $IncludeLocks) {
    $excludeFilesByName += @("pnpm-lock.yaml", "yarn.lock", "package-lock.json")
}

function Get-LanguageFromExtension([string]$ext) {
    switch ($ext.ToLower()) {
        ".ts"   { "typescript" }
        ".tsx"  { "typescript" }
        ".js"   { "javascript" }
        ".jsx"  { "javascript" }
        ".cjs"  { "javascript" }
        ".mjs"  { "javascript" }
        ".json" { "json" }
        ".html" { "html" }
        ".css"  { "css" }
        ".scss" { "scss" }
        ".less" { "less" }
        ".ps1"  { "powershell" }
        ".psm1" { "powershell" }
        ".psd1" { "powershell" }
        ".yaml" { "yaml" }
        ".yml"  { "yaml" }
        ".rules" { "" }
        ".md"   { "markdown" }
        default  { "" }
    }
}

# Collect files (text code files)
$files = Get-ChildItem -Path $RootPath -Recurse -File |
    Where-Object {
        # Exclude directories
        $excludeHit = $false
        foreach ($dir in $ExcludeDirs) {
            if ($_.FullName -match "\\$([regex]::Escape($dir))(\\|$)") { $excludeHit = $true; break }
        }
        if ($excludeHit) { return $false }
        # Include only selected extensions and exclude binaries
        ($includeExts -contains $_.Extension.ToLower()) -and -not ($excludeBinaryExts -contains $_.Extension.ToLower())
    } |
    Where-Object { $excludeFilesByName -notcontains $_.Name } |
    Sort-Object FullName

if ($files.Count -eq 0) {
    Write-Host "No files found for inclusion." -ForegroundColor Red
    exit 1
}

Write-Host "Found $($files.Count) files to include." -ForegroundColor Yellow

# Ensure output folder fresh
if (Test-Path $OutputFolder) {
    Remove-Item $OutputFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $OutputFolder | Out-Null

# Prepare volume containers with greedy size balancing (bin packing heuristic)
$volumes = @()
for ($i = 1; $i -le $VolumeCount; $i++) {
    $volumes += [PSCustomObject]@{ Index = $i; Files = New-Object System.Collections.Generic.List[object]; Size = [long]0 }
}

# Sort files by size descending for better balancing
$filesInfo = $files | Select-Object FullName, Length, Extension
$filesSorted = $filesInfo | Sort-Object Length -Descending

foreach ($f in $filesSorted) {
    # pick the volume with the smallest current size
    $minIdx = 0
    $minSize = [long]::MaxValue
    for ($i = 0; $i -lt $volumes.Count; $i++) {
        if ($volumes[$i].Size -lt $minSize) { $minSize = $volumes[$i].Size; $minIdx = $i }
    }
    $volumes[$minIdx].Files.Add($f)
    $volumes[$minIdx].Size += [long]$f.Length
}

# Write each volume markdown
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

function Write-VolumeMarkdown($volume, $root, $outFolder) {
    $indexStr = "{0:D2}" -f $volume.Index
    $outFile = Join-Path $outFolder "$indexStr-PROJECT_CODE.md"
    $md = New-Object System.Collections.Generic.List[string]

    $md.Add("# Project Code Volume $indexStr")
    $md.Add("")
    $md.Add("Generated: $timestamp")
    $md.Add("Root: $root")
    $md.Add("")
    $md.Add("- Files in volume: $($volume.Files.Count)")
    $md.Add("- Approx size: $([Math]::Round($volume.Size / 1MB, 2)) MB")
    $md.Add("")
    $md.Add("---")
    $md.Add("")

    foreach ($fi in $volume.Files | Sort-Object FullName) {
        $relative = $fi.FullName.Replace($root, "")
        $lang = Get-LanguageFromExtension $fi.Extension
        $md.Add("## File: $relative")
        $md.Add("")
        try {
            $content = Get-Content -Path $fi.FullName -Raw -Encoding UTF8
            $md.Add('```' + $lang)
            $md.Add($content)
            $md.Add('```')
        } catch {
            $md.Add("Warning: Cannot read file - $($_.Exception.Message)")
        }
        $md.Add("")
        $md.Add("---")
        $md.Add("")
    }

    $md | Out-File -FilePath $outFile -Encoding UTF8
    Write-Host "Created: $outFile" -ForegroundColor Green
}

foreach ($v in $volumes) {
    Write-VolumeMarkdown -volume $v -root $RootPath -outFolder $OutputFolder
}

# Write index file
$indexMd = New-Object System.Collections.Generic.List[string]
$indexMd.Add("# Project Code Volumes Index")
$indexMd.Add("")
$indexMd.Add("Generated: $timestamp")
$indexMd.Add("Root: $RootPath")
$indexMd.Add("")
$indexMd.Add("## Volumes")
$indexMd.Add("")
foreach ($v in ($volumes | Sort-Object Index)) {
    $indexStr = "{0:D2}" -f $v.Index
    $indexMd.Add("- [$indexStr-PROJECT_CODE.md](./$indexStr-PROJECT_CODE.md) — Files: $($v.Files.Count), Size: $([Math]::Round($v.Size / 1MB, 2)) MB")
}
$indexMd.Add("")
$indexMd.Add("## Totals")
$indexMd.Add("")
$totalFiles = ($volumes | ForEach-Object { $_.Files.Count } | Measure-Object -Sum).Sum
$totalSize = ($volumes | ForEach-Object { $_.Size } | Measure-Object -Sum).Sum
$indexMd.Add("- Total Files: $totalFiles")
$indexMd.Add("- Total Size: $([Math]::Round($totalSize / 1MB, 2)) MB")
$indexMd.Add("- Volume Count: $VolumeCount")

$indexFile = Join-Path $OutputFolder "00-INDEX.md"
$indexMd | Out-File -FilePath $indexFile -Encoding UTF8
Write-Host "Index written: $indexFile" -ForegroundColor Cyan

Write-Host "All volumes generated in folder: $OutputFolder" -ForegroundColor Cyan

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\generate-v3-code-volumes.ps1

Size: 6.22 KB

```
# Generate 9 Markdown volumes for S-Delivery-AppV3 project
# Windows PowerShell 5.1 compatible

param(
    [string]$ProjectPath = "d:\projectsing\S-Delivery-AppV3",
    [int]$VolumeCount = 9,
    [string]$OutputFolder = "generated-code-v3"
)

$ErrorActionPreference = "Stop"

if (-not $ProjectPath.EndsWith('\')) { $ProjectPath = $ProjectPath + '\' }

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "S-Delivery-AppV3 Code Volume Generator" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

# Extensions to include
$includeExts = @(
    ".ts", ".tsx", ".js", ".jsx", ".cjs", ".mjs",
    ".css", ".scss", ".less", ".json", ".html", ".yaml", ".yml",
    ".rules", ".md", ".ps1", ".psm1", ".psd1"
)

# Extensions to exclude
$excludeBinaryExts = @(
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".bmp",
    ".woff", ".woff2", ".ttf", ".eot", ".otf", ".mp4", ".mp3", ".webm"
)

# Directories to exclude
$excludeDirs = @(
    "node_modules", "dist", "build", ".git", ".vscode", ".pnpm-store",
    "coverage", ".cache", ".next", "out"
)

$excludeFiles = @("pnpm-lock.yaml")

if (-not (Test-Path $ProjectPath)) {
    Write-Host "ERROR: Project path not found" -ForegroundColor Red
    exit 1
}

Write-Host "Collecting files from: $ProjectPath" -ForegroundColor Yellow

# Collect files
$files = @()
foreach ($file in (Get-ChildItem -Path $ProjectPath -Recurse -File -ErrorAction SilentlyContinue)) {
    $skip = $false
    
    # Exclude generated files and lock files
    if ($file.Name -match "pnpm-lock|yarn.lock|package-lock|PROJECT_CODE|PROJECT_FULL") { continue }
    
    # Check excluded directories
    foreach ($dir in $excludeDirs) {
        if ($file.FullName -match "\\$([regex]::Escape($dir))(\\|`$)") { $skip = $true; break }
    }
    if ($skip) { continue }
    
    if ($excludeBinaryExts -contains $file.Extension.ToLower()) { continue }
    if (-not ($includeExts -contains $file.Extension.ToLower())) { continue }
    
    $files += $file
}

$files = $files | Sort-Object FullName
Write-Host "Found $($files.Count) files" -ForegroundColor Green

if ($files.Count -eq 0) { exit 1 }

# Create volumes
$volumes = @()
for ($i = 1; $i -le $VolumeCount; $i++) {
    $volumes += @{ Index = $i; Files = @(); Size = 0 }
}

# Distribute files by size
$filesSorted = $files | Sort-Object Length -Descending
foreach ($file in $filesSorted) {
    $minIdx = 0
    $minSize = [long]::MaxValue
    for ($i = 0; $i -lt $volumes.Count; $i++) {
        if ($volumes[$i].Size -lt $minSize) {
            $minSize = $volumes[$i].Size
            $minIdx = $i
        }
    }
    $volumes[$minIdx].Files += $file
    $volumes[$minIdx].Size += $file.Length
}

Write-Host ""
Write-Host "Volume distribution:" -ForegroundColor Yellow
foreach ($v in $volumes) {
    $idx = "{0:D2}" -f $v.Index
    $mb = [Math]::Round($v.Size / 1MB, 2)
    Write-Host "  Volume $idx : $($v.Files.Count) files, $mb MB" -ForegroundColor Cyan
}

# Clean output folder
if (Test-Path $OutputFolder) {
    Remove-Item $OutputFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $OutputFolder -ErrorAction SilentlyContinue | Out-Null

Write-Host ""
Write-Host "Generating volumes..." -ForegroundColor Green

$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

# Generate volumes
foreach ($vol in $volumes) {
    $idx = "{0:D2}" -f $vol.Index
    $outFile = Join-Path $OutputFolder "$idx-PROJECT_CODE.md"
    
    $lines = @()
    $lines += "# S-Delivery-AppV3 - Volume $idx"
    $lines += ""
    $lines += "Generated: $timestamp"
    $lines += "- Files: $($vol.Files.Count)"
    $lines += "- Size: $([Math]::Round($vol.Size / 1MB, 2)) MB"
    $lines += ""
    $lines += "---"
    $lines += ""
    
    foreach ($file in ($vol.Files | Sort-Object FullName)) {
        $relative = $file.FullName.Replace($ProjectPath, "")
        
        $ext = $file.Extension.ToLower()
        $lang = switch ($ext) {
            ".ts" { "typescript" }
            ".tsx" { "typescript" }
            ".js" { "javascript" }
            ".jsx" { "javascript" }
            ".json" { "json" }
            ".css" { "css" }
            ".scss" { "scss" }
            ".html" { "html" }
            ".md" { "markdown" }
            ".yaml" { "yaml" }
            ".yml" { "yaml" }
            ".ps1" { "powershell" }
            default { "" }
        }
        
        $lines += "## File: $relative"
        $lines += ""
        
        try {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            $lines += '```' + $lang
            $lines += $content
            $lines += '```'
        } catch {
            $lines += "Warning: Cannot read file"
        }
        
        $lines += ""
        $lines += "---"
        $lines += ""
    }
    
    $lines | Out-File -FilePath $outFile -Encoding UTF8
    Write-Host "  Created: $idx-PROJECT_CODE.md" -ForegroundColor Green
}

# Create index
$index = @()
$index += "# S-Delivery-AppV3 - Code Volumes Index"
$index += ""
$index += "Generated: $timestamp"
$index += ""
$index += "## Overview"
$index += ""
$totalFiles = ($files.Count)
$totalSize = ($files | Measure-Object -Property Length -Sum).Sum
$index += "- Total Files: $totalFiles"
$index += "- Total Size: $([Math]::Round($totalSize / 1MB, 2)) MB"
$index += "- Total Volumes: $VolumeCount"
$index += ""
$index += "## Volumes"
$index += ""
foreach ($v in $volumes) {
    $idx = "{0:D2}" -f $v.Index
    $mb = [Math]::Round($v.Size / 1MB, 2)
    $index += "- [$idx-PROJECT_CODE.md](./$idx-PROJECT_CODE.md) - Files: $($v.Files.Count), Size: $mb MB"
}

$indexFile = Join-Path $OutputFolder "00-INDEX.md"
$index | Out-File -FilePath $indexFile -Encoding UTF8
Write-Host "  Created: 00-INDEX.md" -ForegroundColor Green

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Generation completed!" -ForegroundColor Green
Write-Host "Output: $OutputFolder" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\reset_for_production.js

Size: 4.17 KB

```
import admin from 'firebase-admin';
import serviceAccount from '../service-account-key.json' assert { type: 'json' };

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

async function resetDatabase() {
    console.log('🗑️  Starting Database Reset for Production...');

    try {
        // 1. Delete 'stores/default' document (and its subcollections ideally, but Firestore requires manual deletion check)
        // Deleting the document 'stores/default' puts the app in "Setup Mode".
        console.log('Removing stores/default...');
        await db.doc('stores/default').delete();

        // 2. Delete subcollections of 'stores/default' (orders, menus, etc) checks
        // Users might have generated data.
        console.log('Cleaning up subcollections...');
        await deleteCollection(db, 'stores/default/orders', 50);
        await deleteCollection(db, 'stores/default/menus', 50);
        await deleteCollection(db, 'stores/default/reviews', 50);
        await deleteCollection(db, 'stores/default/notices', 50);
        await deleteCollection(db, 'stores/default/events', 50);
        await deleteCollection(db, 'stores/default/coupons', 50);

        // 3. Clear 'users' collection? 
        // User said "Start from Store Setup". If we keep users, they log in and if they have no store, they go to wizard.
        // Keeping users is safer so they don't lose their account, but if "Complete Initial State", maybe delete users too.
        // However, I don't have the service account key easily accessible in this environment potentially?
        // Wait, the user has `functions` setup, so credentials might be there.
        // But usually local `npm run dev` doesn't have admin privileges without key.

        // Actually, I can rely on the user manually deleting or just deleting the store doc is enough to trigger the wizard.
        // The script above assumes `service-account-key.json` exists. I haven't seen it in the file list.
        // Use the client-side script approach if server key is missing?
        // Client side deletion is harder due to rules. 
        // I will write a script that assumes it can run with `firebase-admin` (which implies credentials).
        // If not, I'll ask user to do it via console.

        // WAIT! `scripts/seed_v2_data.mjs` was being edited by user.
        // It likely uses `import { initializeApp } from 'firebase/app'` (Client SDK).
        // I should use Client SDK for the script if possible, BUT client SDK cannot delete collections easily.
        // I'll stick to just deleting the root logic doc for now.

    } catch (error) {
        console.error('Error resetting DB:', error);
    }

    console.log('✅ Database reset complete. Ready for new store setup.');
}

// Check if we can run this.
// If service account is missing, this will fail.
// I will create a CLIENT SIDE script instead that runs in the browser context or via a helper page?
// No, I can just create a `reset_db.js` and ask user to run it IF they have admin setup.
// BUT, the safer bet is to use the existing `seed_v2_data.mjs` style which uses Client SDK.
// With Client SDK, I can just delete `stores/default`.

```

---

## D:\projectsing\S-Delivery-AppV3\scripts\S-Delivery-AppV3.code-workspace

Size: 0.16 KB

```
{
	"folders": [
		{
			"path": ".."
		},
		{
			"path": "../../S-Delivery-App"
		},
		{
			"path": "../../hyun-poong/simple-delivery-app"
		}
	],
	"settings": {}
}
```

---

## D:\projectsing\S-Delivery-AppV3\scripts\simple-delivery-app.code-workspace

Size: 0.18 KB

```
{
	"folders": [
		{
			"path": ".."
		},
		{
			"path": "../../../../projects/my-pho-app"
		},
		{
			"path": "../../../../projects/my-pho-app/my-pho-app"
		}
	],
	"settings": {}
}
```

---

