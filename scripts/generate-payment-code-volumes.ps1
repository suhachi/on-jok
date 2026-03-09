<#
.SYNOPSIS
    결제 및 외부 연동(NICEPAY) 관련 전체 코드를 추출하여 최대 9개의 MD 파일로 분할 생성하는 스크립트.
.DESCRIPTION
    src/ 및 functions/src/ 디렉토리 내의 .ts, .tsx 파일 중 
    'nicepay', 'payment', '결제' 키워드가 포함된 모든 파일을 100% 누락 없이 병합하여 MD 파일로 추출합니다.
#>

$ErrorActionPreference = "Stop"

$workspace = Get-Location
$sourceDirs = @("$workspace\src", "$workspace\functions\src")
$outputDir = "$workspace\generated-payment-code"

# 이전 출력 폴더 초기화
If (Test-Path $outputDir) {
    Remove-Item -Recurse -Force $outputDir
}
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Write-Host "============================================================"
Write-Host "Payment Code Volume Generator"
Write-Host "============================================================"
Write-Host "Scanning files..."

# 대상 확장자
$extensions = @("*.ts", "*.tsx")
$paymentFiles = @()

foreach ($dir in $sourceDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Recurse -Include $extensions
        foreach ($file in $files) {
            # 파일 내용 중 결제 관련 키워드가 있는지 확인
            $content = Get-Content $file.FullName -Raw
            if ($content -match "(?i)nicepay|payment|결제") {
                $paymentFiles += $file.FullName
            }
        }
    }
}

# 명시적으로 반드시 포함해야 할 주요 파일들 (누락 방지)
$mandatoryFiles = @(
    "$workspace\src\pages\CheckoutPage.tsx",
    "$workspace\src\pages\NicepayReturnPage.tsx",
    "$workspace\src\lib\nicepayClient.ts",
    "$workspace\functions\src\nicepay-handlers.ts",
    "$workspace\src\services\orderService.ts",
    "$workspace\src\types\order.ts",
    "$workspace\src\types\global.d.ts",
    "$workspace\src\pages\admin\AdminOrderManagement.tsx"
)

foreach ($mf in $mandatoryFiles) {
    if ((Test-Path $mf) -and ($paymentFiles -notcontains $mf)) {
        $paymentFiles += $mf
    }
}

# 중복 제거 및 정렬
$paymentFiles = $paymentFiles | Select-Object -Unique | Sort-Object
$totalFiles = $paymentFiles.Count

Write-Host "Found $($totalFiles) payment-related files."

# 9개의 파일로 분할 (최대 9개 이하 조건 충족)
$maxVolumes = 9
$filesPerVolume = [math]::Ceiling($totalFiles / $maxVolumes)
if ($filesPerVolume -eq 0) { $filesPerVolume = 1 }

$volumeIndex = 1
$fileCounter = 0
$currentVolumeContent = @()

foreach ($filePath in $paymentFiles) {
    $relativePath = $filePath.Replace("$workspace\", "").Replace("\", "/")
    
    $fileContent = Get-Content $filePath -Raw
    $codeBlock = "### File: $relativePath`n``````typescript`n$fileContent`n```````n"
    $currentVolumeContent += $codeBlock
    
    $fileCounter++
    
    # 쪼갤 기준 도달 시 파일로 저장
    if ($fileCounter -ge $filesPerVolume -and $volumeIndex -lt $maxVolumes) {
        $outPath = Join-Path $outputDir "$($volumeIndex.ToString('00'))-PAYMENT_CODE.md"
        Set-Content -Path $outPath -Value ($currentVolumeContent -join "`n") -Encoding UTF8
        Write-Host "Created: $($volumeIndex.ToString('00'))-PAYMENT_CODE.md ($fileCounter files)"
        
        $volumeIndex++
        $fileCounter = 0
        $currentVolumeContent = @()
    }
}

# 마지막 남은 파일들 저장
if ($currentVolumeContent.Count -gt 0) {
    $outPath = Join-Path $outputDir "$($volumeIndex.ToString('00'))-PAYMENT_CODE.md"
    Set-Content -Path $outPath -Value ($currentVolumeContent -join "`n") -Encoding UTF8
    Write-Host "Created: $($volumeIndex.ToString('00'))-PAYMENT_CODE.md ($fileCounter files)"
}

Write-Host "============================================================"
Write-Host "Generation completed!"
Write-Host "Output: generated-payment-code"
Write-Host "============================================================"
