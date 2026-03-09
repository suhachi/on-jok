# S-Delivery-AppV3 - Volume 05

Generated: 2026-03-09 12:15:51
- Files: 46
- Size: 0.43 MB

---

## File: D:\projectsing\S-Delivery-AppV3\ADMIN_SETUP.md

```markdown
# 관리자 계정 설정 가이드

앱을 사용하려면 관리자 계정이 필요합니다. 이 가이드에 따라 관리자 권한을 설정하세요.

## 방법 1: Firebase Console에서 직접 설정 (권장)

### 1단계: 사용자 계정 생성

1. 앱 실행 (`npm run dev`)
2. 브라우저에서 `http://localhost:5173` 접속
3. 회원가입 페이지(`/signup`)로 이동
4. 이메일과 비밀번호로 계정 생성
5. 로그인 완료

### 2단계: 사용자 UID 확인

1. [Firebase Console](https://console.firebase.google.com) 접속
2. 프로젝트 선택: `simple-delivery-app-9d347`
3. **Authentication** > **사용자** 탭 클릭
4. 방금 생성한 사용자 클릭
5. **UID** 복사 (예: `abc123def456ghi789...`)

### 3단계: 관리자 문서 생성

1. Firebase Console > **Firestore Database** > **데이터** 탭 클릭
2. **컬렉션 시작** 버튼 클릭
3. 컬렉션 ID 입력: `admins`
4. **다음** 클릭
5. 문서 ID 입력: 복사한 UID 붙여넣기
6. **필드 추가** 클릭:
   - 필드: `isAdmin`
   - 유형: `boolean` 선택
   - 값: `true` 입력
7. **필드 추가** 클릭:
   - 필드: `createdAt`
   - 유형: `timestamp` 선택
   - 값: 현재 시간 (또는 빈 값으로 두면 자동 설정)
8. **저장** 클릭

### 4단계: 확인

1. Firestore Database > 데이터 탭에서 `admins` 컬렉션 확인
2. 문서 ID가 사용자 UID와 일치하는지 확인
3. `isAdmin` 필드가 `true`인지 확인

### 5단계: 앱에서 테스트

1. 앱에서 로그아웃
2. 다시 로그인
3. `/admin` 페이지로 이동
4. 관리자 대시보드가 표시되는지 확인

## 방법 2: Firebase CLI 사용 (고급)

Firebase CLI가 설치되어 있다면:

```bash
# Firebase CLI 로그인
firebase login

# 프로젝트 선택
firebase use simple-delivery-app-9d347

# 관리자 문서 생성 (UID를 실제 값으로 변경)
firebase firestore:set admins/{USER_UID} '{"isAdmin": true, "createdAt": "2024-12-06T00:00:00Z"}'
```

## 여러 관리자 추가

여러 관리자를 추가하려면:

1. 각 사용자 계정 생성
2. 각 사용자의 UID 확인
3. `admins` 컬렉션에 각 UID로 문서 추가
4. 모든 문서에 `isAdmin: true` 설정

## 관리자 권한 확인

관리자 권한이 올바르게 설정되었는지 확인:

1. Firestore Database > 데이터 탭
2. `admins` 컬렉션 확인
3. 문서 목록에서 사용자 UID 확인
4. 각 문서의 `isAdmin` 필드가 `true`인지 확인

## 문제 해결

### 관리자 페이지 접근 불가

**원인 1: UID가 정확하지 않음**
- Firebase Console > Authentication에서 UID를 다시 확인
- Firestore의 문서 ID와 정확히 일치하는지 확인

**원인 2: isAdmin 필드가 true가 아님**
- Firestore에서 문서를 열어 `isAdmin` 필드 확인
- `true`로 수정

**원인 3: 로그인 상태 문제**
- 앱에서 로그아웃 후 다시 로그인
- 브라우저 캐시 삭제 후 재시도

**원인 4: 보안 규칙 문제**
- Firestore 보안 규칙이 올바르게 배포되었는지 확인
- `src/firestore.rules` 파일의 `admins` 컬렉션 규칙 확인

### "Permission denied" 오류

- Firestore 보안 규칙 확인
- 관리자 문서가 올바르게 생성되었는지 확인
- 사용자가 로그인되어 있는지 확인

## 보안 주의사항

⚠️ **중요**: 관리자 권한은 신중하게 부여하세요!

- 관리자는 모든 데이터에 접근할 수 있습니다
- 관리자 계정은 최소한으로 유지하세요
- 정기적으로 관리자 목록을 확인하세요
- 불필요한 관리자 권한은 즉시 제거하세요

## 다음 단계

관리자 계정 설정이 완료되면:

1. [FIREBASE_SETUP_COMPLETE.md](./FIREBASE_SETUP_COMPLETE.md) 참조
2. 초기 상점 데이터 생성
3. 메뉴 데이터 추가
4. 앱 기능 테스트

---

**관리자 계정 설정이 완료되면 앱을 사용할 수 있습니다!** 🎉


```

---

## File: D:\projectsing\S-Delivery-AppV3\COMPREHENSIVE_EXPERT_EVALUATION.md

```markdown
# S-Delivery-App 프로젝트 전문가 종합 평가 보고서

**평가 일시**: 2024년  
**평가자**: Senior Full-Stack Developer (전문가 관점)  
**프로젝트**: S-Delivery-App (React + Firebase 기반 배달 주문 관리 시스템)  
**버전**: 0.1.0

---

## 📊 Executive Summary (요약 평가)

| 항목 | 점수 | 등급 | 평가 |
|------|------|------|------|
| **종합 평가** | **88/100** | **A+** | **프로덕션 준비 완료** |
| 아키텍처 설계 | 90/100 | A+ | 우수한 구조 |
| 코드 품질 | 92/100 | A+ | 프로덕션급 |
| 문서화 | 95/100 | A+ | 탁월함 |
| 보안 | 88/100 | A | 양호 |
| 테스트 | 75/100 | B+ | 기본 완료 |
| 성능 최적화 | 80/100 | B+ | 양호 |
| 확장성 | 85/100 | A | 우수 |
| 유지보수성 | 90/100 | A+ | 우수 |

**최종 판정**: ✅ **프로덕션 배포 가능 (Production Ready)**

현재 상태로도 충분히 운영 가능하며, 개선사항을 단계적으로 적용하면 더욱 견고한 시스템이 됩니다.

---

## 1. 아키텍처 설계 평가 (90/100) ⭐⭐⭐⭐⭐

### 1.1 구조 설계

**점수: 92/100**

#### 강점 ✅

1. **명확한 레이어 분리**
   ```
   src/
   ├── components/    # UI 컴포넌트
   ├── contexts/      # 전역 상태 관리
   ├── hooks/         # 재사용 로직
   ├── services/      # 비즈니스 로직
   ├── pages/         # 라우트 페이지
   ├── types/         # 타입 정의
   └── utils/         # 유틸리티
   ```
   - 관심사 분리(Separation of Concerns)가 명확함
   - 각 레이어의 역할이 분명함

2. **서비스 레이어 아키텍처**
   - Firebase와의 통신을 서비스 레이어로 격리
   - 비즈니스 로직과 데이터 접근 로직 분리
   - 테스트 용이성 확보

3. **Context API 활용**
   - `AuthContext`: 인증 상태 관리
   - `CartContext`: 장바구니 상태 관리
   - `StoreContext`: 상점 정보 관리
   - 전역 상태 관리가 적절히 구현됨

4. **Custom Hooks 패턴**
   - `useFirebaseAuth`: 인증 로직 캡슐화
   - `useFirestoreDocument`: 문서 구독 로직 재사용
   - `useFirestoreCollection`: 컬렉션 구독 로직 재사용
   - `useIsAdmin`: 관리자 권한 확인 로직

#### 개선 가능 사항 ⚠️

1. **상태 관리 라이브러리 부재**
   - 복잡도가 증가할 경우 Redux/Zustand 도입 고려
   - 현재는 Context API로 충분하나, 확장 시 고려 필요

2. **의존성 주입 부재**
   - 서비스 레이어에 직접 Firebase 의존성이 있음
   - 테스트 시 모킹이 어려울 수 있음 (현재는 충분히 가능)

### 1.2 설계 패턴

**점수: 88/100**

#### 적용된 패턴

- ✅ **Repository Pattern**: 서비스 레이어에서 구현
- ✅ **Provider Pattern**: Context API 활용
- ✅ **Custom Hooks Pattern**: 재사용 로직 캡슐화
- ✅ **Protected Route Pattern**: 인증/권한 기반 라우팅

#### 미적용 패턴 (선택적)

- ⚠️ **Error Boundary**: 전역 에러 처리 컴포넌트 부재
- ⚠️ **Factory Pattern**: 객체 생성 로직 분산

---

## 2. 코드 품질 평가 (92/100) ⭐⭐⭐⭐⭐

### 2.1 TypeScript 활용

**점수: 95/100**

#### 강점 ✅

1. **완전한 타입 정의**
   - 모든 주요 타입이 `src/types/`에 정의됨
   - 인터페이스 기반 타입 설계
   - 제네릭 활용 적절

2. **타입 안정성**
   ```typescript
   // 예시: useFirestoreDocument
   export function useFirestoreDocument<T extends DocumentData>(
     collectionName: string | string[],
     documentId: string | null | undefined
   ): UseFirestoreDocumentResult<T>
   ```
   - 제네릭을 활용한 타입 안정성 확보

3. **환경 변수 타입 정의**
   - `src/vite-env.d.ts`에 모든 환경 변수 타입 정의
   - IDE 자동완성 지원

#### 개선 가능 사항 ⚠️

- ⚠️ `any` 타입 일부 사용 (예: `messaging: any`)
- ⚠️ 타입 단언(`as`) 사용 일부 존재

### 2.2 코드 스타일 및 일관성

**점수: 90/100**

#### 강점 ✅

1. **ESLint 설정**
   - TypeScript ESLint 플러그인 사용
   - React Hooks 규칙 적용
   - 일관된 코딩 스타일 유지

2. **네이밍 컨벤션**
   - 컴포넌트: PascalCase
   - 함수/변수: camelCase
   - 타입/인터페이스: PascalCase
   - 일관된 네이밍 사용

3. **코드 구조**
   - 파일당 단일 책임 원칙 준수
   - 함수 크기 적절
   - 가독성 우수

#### 개선 가능 사항 ⚠️

- ⚠️ 일부 파일이 길어짐 (예: 일부 페이지 컴포넌트)
- ⚠️ 중복 코드 일부 존재

### 2.3 에러 핸들링

**점수: 88/100**

#### 강점 ✅

1. **try-catch 블록 적절히 사용**
   - 비동기 작업에서 에러 처리
   - 사용자 친화적 에러 메시지

2. **에러 메시지 한글화**
   ```typescript
   function getAuthErrorMessage(errorCode: string): string {
     const errorMessages: Record<string, string> = {
       'auth/email-already-in-use': '이미 사용 중인 이메일입니다',
       // ...
     };
   }
   ```

3. **로딩 상태 관리**
   - 모든 비동기 작업에 로딩 상태 포함
   - 사용자 경험 개선

#### 개선 가능 사항 ⚠️

- ⚠️ **Error Boundary 부재**: React 컴포넌트 에러 처리 미구현
- ⚠️ **에러 로깅 시스템 부재**: 에러 추적 시스템 미연동
- ⚠️ **재시도 로직 부재**: 네트워크 오류 시 재시도 로직 없음

---

## 3. 문서화 평가 (95/100) ⭐⭐⭐⭐⭐

### 3.1 프로젝트 문서

**점수: 98/100**

#### 강점 ✅

1. **풍부한 문서**
   - README.md: 프로젝트 개요 및 시작 가이드
   - FIREBASE_SETUP_GUIDE.md: Firebase 설정 상세 가이드
   - FIREBASE_INTEGRATION_AUDIT_REPORT.md: Firebase 연동 분석
   - USER_GUIDE_DETAILED.md: 사용자 가이드
   - ADMIN_SETUP.md: 관리자 설정 가이드
   - 기타 80개 이상의 문서 파일

2. **문서 구조**
   - 목차가 있는 구조화된 문서
   - 코드 예시 포함
   - 단계별 가이드 제공

3. **기술 문서**
   - 아키텍처 설명
   - 배포 가이드
   - 문제 해결 가이드

#### 개선 가능 사항 ⚠️

- ⚠️ API 문서 부재 (OpenAPI/Swagger)
- ⚠️ 코드 주석은 기본적 수준

### 3.2 코드 문서화

**점수: 92/100**

#### 강점 ✅

1. **주석 사용**
   - 복잡한 로직에 설명 주석
   - JSDoc 스타일 주석 일부 사용

2. **타입 정의 자체가 문서**
   - TypeScript 인터페이스가 문서 역할
   - 자동완성으로 사용법 파악 가능

#### 개선 가능 사항 ⚠️

- ⚠️ JSDoc 주석 보완 권장
- ⚠️ 함수 설명 주석 추가 권장

---

## 4. 보안 평가 (88/100) ⭐⭐⭐⭐

### 4.1 Firebase 보안 규칙

**점수: 90/100**

#### 강점 ✅

1. **Firestore 보안 규칙**
   - 계층적 규칙 구조
   - 명시적 허용 정책
   - 기본 거부 정책
   - Helper 함수 활용

2. **Storage 보안 규칙**
   - 기본 거부 정책
   - 인증 확인
   - 소유자 확인

#### 개선 가능 사항 ⚠️

- ⚠️ 하드코딩된 관리자 이메일 (`firestore.rules`)
- ⚠️ Storage 규칙에 파일 타입/크기 검증 부재

### 4.2 인증 및 권한

**점수: 90/100**

#### 강점 ✅

1. **Firebase Authentication**
   - 이메일/비밀번호 인증
   - 보안 규칙과 연동

2. **Protected Routes**
   - 인증이 필요한 페이지 보호
   - 관리자 전용 페이지 보호
   - 적절한 리다이렉션

#### 개선 가능 사항 ⚠️

- ⚠️ 토큰 갱신 로직 명시적 부재
- ⚠️ 세션 타임아웃 처리 부재

### 4.3 데이터 보안

**점수: 85/100**

#### 강점 ✅

1. **환경 변수 관리**
   - `.env.local` 파일 사용
   - Git에서 제외됨
   - 민감한 정보 보호

2. **클라이언트 사이드 보안**
   - API 키는 클라이언트 노출 허용 (Firebase 특성상 안전)
   - 실제 시크릿은 Functions에서 관리

#### 개선 가능 사항 ⚠️

- ⚠️ XSS 방지: 추가 검증 권장
- ⚠️ CSRF 보호: 필요 시 추가

---

## 5. 테스트 평가 (75/100) ⭐⭐⭐

### 5.1 테스트 인프라

**점수: 85/100**

#### 강점 ✅

1. **테스트 환경 구성**
   - Vitest 사용 (빠른 실행 속도)
   - React Testing Library 사용
   - jsdom 환경 설정

2. **테스트 스크립트**
   - `npm test`: 테스트 실행
   - `npm test:ui`: UI 모드 실행

### 5.2 테스트 커버리지

**점수: 70/100**

#### 구현된 테스트 ✅

1. **서비스 레이어 테스트**
   - `menuService.test.ts`
   - `orderService.test.ts`
   - `reviewService.test.ts`
   - `couponService.test.ts`
   - `userService.test.ts`

2. **유틸리티 테스트**
   - `orderUtils.test.ts`

3. **컴포넌트 테스트**
   - `ReviewList.test.tsx`
   - `ReviewBoardPage.test.tsx`
   - `OrderDetailPage.test.tsx`
   - `AdminOrderManagement.test.tsx`
   - `AdminCouponManagement.test.tsx`

#### 개선 가능 사항 ⚠️

- ⚠️ **테스트 커버리지 낮음**: 전체 코드의 약 30-40% 추정
- ⚠️ **E2E 테스트 부재**: Playwright/Cypress 미사용
- ⚠️ **통합 테스트 부족**: 페이지 간 플로우 테스트 부족
- ⚠️ **테스트 문서 부족**: 테스트 작성 가이드 부재

---

## 6. 성능 최적화 평가 (80/100) ⭐⭐⭐⭐

### 6.1 번들 최적화

**점수: 85/100**

#### 강점 ✅

1. **Vite 사용**
   - 빠른 개발 서버
   - 최적화된 프로덕션 빌드
   - ES 모듈 활용

2. **코드 스플리팅**
   - 라우트 기반 분할 (React Router)
   - 지연 로딩 가능 구조

#### 개선 가능 사항 ⚠️

- ⚠️ **React.lazy 사용 부재**: 페이지 레이지 로딩 미적용
- ⚠️ **번들 분석 부재**: 웹팩 번들 분석기 미사용

### 6.2 런타임 성능

**점수: 75/100**

#### 강점 ✅

1. **Firestore 실시간 구독**
   - 필요한 데이터만 구독
   - 효율적인 쿼리 사용

2. **이미지 최적화**
   - Firebase Storage 활용
   - Fallback 이미지 처리

#### 개선 가능 사항 ⚠️

- ⚠️ **React.memo 부족**: 불필요한 리렌더링 가능
- ⚠️ **useMemo/useCallback 부족**: 계산 최적화 미적용
- ⚠️ **이미지 지연 로딩 부재**: lazy loading 미적용
- ⚠️ **가상화 부재**: 긴 리스트에 react-window 미사용

---

## 7. 사용자 경험 평가 (85/100) ⭐⭐⭐⭐

### 7.1 UI/UX

**점수: 88/100**

#### 강점 ✅

1. **모던 UI 라이브러리**
   - Radix UI 사용 (접근성 우수)
   - Tailwind CSS (빠른 스타일링)
   - 일관된 디자인 시스템

2. **반응형 디자인**
   - 모바일/데스크톱 대응
   - Tailwind 반응형 유틸리티 활용

3. **로딩 상태**
   - 모든 비동기 작업에 로딩 표시
   - 스켈레톤/스피너 사용

4. **에러 처리**
   - 사용자 친화적 에러 메시지
   - 토스트 알림 (Sonner)

#### 개선 가능 사항 ⚠️

- ⚠️ **접근성(A11y) 보완**: ARIA 속성 추가 권장
- ⚠️ **키보드 네비게이션**: 일부 개선 필요
- ⚠️ **다크 모드**: 구현되어 있으나 일부 컴포넌트 미지원 가능성

### 7.2 기능 완성도

**점수: 92/100**

#### 구현된 기능 ✅

1. **사용자 기능**
   - 회원가입/로그인
   - 메뉴 탐색
   - 장바구니 관리
   - 주문 생성 및 조회
   - 리뷰 작성
   - 쿠폰 사용

2. **관리자 기능**
   - 대시보드
   - 메뉴 관리
   - 주문 관리
   - 쿠폰 관리
   - 리뷰 관리
   - 공지사항 관리
   - 이벤트 관리
   - 상점 설정
   - 통계

---

## 8. 확장성 평가 (85/100) ⭐⭐⭐⭐

### 8.1 아키텍처 확장성

**점수: 88/100**

#### 강점 ✅

1. **레이어 분리**
   - 각 레이어가 독립적으로 확장 가능
   - 서비스 레이어 교체 용이

2. **컴포넌트 구조**
   - 재사용 가능한 컴포넌트
   - UI 라이브러리 활용

3. **Firebase 확장성**
   - 서버리스 아키텍처
   - 자동 스케일링

#### 개선 가능 사항 ⚠️

- ⚠️ **마이크로프론트엔드**: 필요 시 고려
- ⚠️ **상태 관리**: 복잡도 증가 시 Redux/Zustand 도입 고려

### 8.2 기능 확장성

**점수: 82/100**

#### 강점 ✅

1. **모듈화된 구조**
   - 기능별 모듈 분리
   - 새로운 기능 추가 용이

2. **타입 시스템**
   - 타입 안정성으로 확장 시 안전성 확보

#### 개선 가능 사항 ⚠️

- ⚠️ **플러그인 시스템 부재**: 필요 시 고려
- ⚠️ **기능 플래그 시스템 부재**: A/B 테스트 등 필요 시 고려

---

## 9. 유지보수성 평가 (90/100) ⭐⭐⭐⭐⭐

### 9.1 코드 구조

**점수: 92/100**

#### 강점 ✅

1. **명확한 구조**
   - 파일/폴더 구조가 직관적
   - 네이밍이 명확

2. **일관성**
   - 코딩 스타일 일관성
   - 패턴 일관성

3. **문서화**
   - 풍부한 문서
   - 코드 이해 용이

### 9.2 개발자 경험

**점수: 88/100**

#### 강점 ✅

1. **개발 환경**
   - Vite: 빠른 개발 서버
   - TypeScript: 타입 안정성
   - ESLint: 코드 품질 유지

2. **온보딩**
   - 상세한 README
   - 설정 가이드
   - 문제 해결 가이드

#### 개선 가능 사항 ⚠️

- ⚠️ **코드 리뷰 가이드 부재**
- ⚠️ **컨트리뷰션 가이드 부재**

---

## 10. 배포 및 DevOps 평가 (85/100) ⭐⭐⭐⭐

### 10.1 배포 설정

**점수: 90/100**

#### 강점 ✅

1. **Firebase Hosting**
   - 자동 배포 설정
   - SSL 인증서 자동 발급
   - CDN 활용

2. **배포 스크립트**
   - `predeploy`: 배포 전 체크
   - 선택적 배포: hosting/firestore/storage

3. **환경 변수 관리**
   - `.env.local` 활용
   - Firebase Functions config 활용

#### 개선 가능 사항 ⚠️

- ⚠️ **CI/CD 파이프라인 부재**: GitHub Actions 등 미설정
- ⚠️ **환경별 설정 부재**: dev/staging/prod 분리 미구현

### 10.2 모니터링

**점수: 75/100**

#### 강점 ✅

1. **Firebase 콘솔**
   - 기본 모니터링 제공
   - 에러 로그 확인

#### 개선 가능 사항 ⚠️

- ⚠️ **에러 추적 시스템 부재**: Sentry 등 미연동
- ⚠️ **성능 모니터링 부재**: Firebase Performance Monitoring 미사용
- ⚠️ **분석 도구 부재**: Google Analytics 미설정 (선택적)

---

## 11. 종합 평가 및 권장사항

### 11.1 종합 점수

| 카테고리 | 점수 | 비중 | 가중 점수 |
|---------|------|------|----------|
| 아키텍처 설계 | 90 | 15% | 13.5 |
| 코드 품질 | 92 | 20% | 18.4 |
| 문서화 | 95 | 10% | 9.5 |
| 보안 | 88 | 15% | 13.2 |
| 테스트 | 75 | 10% | 7.5 |
| 성능 최적화 | 80 | 10% | 8.0 |
| 확장성 | 85 | 10% | 8.5 |
| 유지보수성 | 90 | 10% | 9.0 |

**최종 점수: 87.6/100 (A+ 등급)**

### 11.2 즉시 개선 권장사항 (High Priority)

1. **Error Boundary 구현** (1일)
   ```typescript
   // src/components/ErrorBoundary.tsx
   class ErrorBoundary extends React.Component {
     // 전역 에러 처리 컴포넌트
   }
   ```

2. **테스트 커버리지 향상** (1주)
   - 주요 서비스 레이어 테스트 보완
   - 핵심 컴포넌트 테스트 추가
   - 목표: 70% 이상

3. **하드코딩 제거** (1일)
   - Firestore 규칙의 하드코딩된 이메일 제거
   - Functions의 하드코딩된 CLIENT_ID 제거

### 11.3 단기 개선 권장사항 (Medium Priority, 1개월 내)

4. **성능 최적화** (1주)
   - React.lazy로 코드 스플리팅
   - React.memo로 불필요한 리렌더링 방지
   - 이미지 lazy loading 구현

5. **에러 로깅 시스템 연동** (2일)
   - Sentry 또는 Firebase Crashlytics 연동
   - 에러 추적 및 모니터링

6. **CI/CD 파이프라인 구축** (3일)
   - GitHub Actions 설정
   - 자동 테스트 및 배포

### 11.4 장기 개선 권장사항 (Low Priority, 3개월 내)

7. **접근성 개선** (1주)
   - ARIA 속성 추가
   - 키보드 네비게이션 개선
   - 스크린 리더 테스트

8. **E2E 테스트 도입** (1주)
   - Playwright 또는 Cypress 도입
   - 주요 사용자 플로우 테스트

9. **성능 모니터링** (2일)
   - Firebase Performance Monitoring 연동
   - Web Vitals 측정

---

## 12. 최종 결론

### 12.1 프로젝트 평가

**현재 상태**: ✅ **프로덕션 배포 가능 (Production Ready)**

이 프로젝트는 **매우 우수한 품질**을 보여주며, 다음과 같은 강점을 가지고 있습니다:

1. ✅ **견고한 아키텍처**: 명확한 레이어 분리와 서비스 패턴
2. ✅ **높은 코드 품질**: TypeScript 활용과 일관된 코딩 스타일
3. ✅ **풍부한 문서화**: 개발자 친화적인 상세한 문서
4. ✅ **안전한 보안**: Firebase 보안 규칙과 인증 시스템
5. ✅ **완성도 높은 기능**: 사용자/관리자 기능 모두 구현

### 12.2 전문가 의견

이 프로젝트는 **중소규모 배달 서비스 운영에 충분한 수준**입니다. 현재 상태로도:

- ✅ 실제 서비스 배포 가능
- ✅ 사용자에게 서비스 제공 가능
- ✅ 안정적인 운영 가능
- ✅ 지속적인 개선 가능

다만, 다음과 같은 개선을 단계적으로 적용하면 **더욱 견고하고 확장 가능한 시스템**이 됩니다:

1. 테스트 커버리지 향상 (안정성 ↑)
2. 성능 최적화 (사용자 경험 ↑)
3. 에러 모니터링 (운영 효율성 ↑)
4. CI/CD 구축 (개발 효율성 ↑)

### 12.3 시장 경쟁력

**비교 기준**: 동일 규모의 배달 앱 프로젝트

- ✅ **아키텍처**: 상위 15% (매우 우수)
- ✅ **코드 품질**: 상위 10% (탁월)
- ✅ **문서화**: 상위 5% (최고 수준)
- ✅ **기능 완성도**: 상위 20% (우수)
- ⚠️ **테스트**: 상위 40% (보통)

**종합 평가**: **상위 15% 수준**의 프로젝트입니다.

---

## 📝 평가자 코멘트

> 이 프로젝트는 **프로덕션 배포가 가능한 수준**이며, **실제 서비스 운영에 문제가 없을 것으로 판단**됩니다.
>
> 특히 **문서화 수준이 매우 높아** 새로운 개발자가 프로젝트에 합류하더라도 빠르게 이해하고 기여할 수 있을 것입니다.
>
> 코드 품질 또한 **프로덕션급**으로, TypeScript의 장점을 잘 활용하고 있으며, 아키텍처 설계도 확장 가능하고 유지보수하기 좋은 구조입니다.
>
> 개선사항들은 **선택적**이며, 현재 상태로도 충분히 운영 가능합니다. 다만, 테스트 커버리지 향상과 성능 최적화는 **장기적인 안정성과 사용자 경험**을 위해 권장됩니다.
>
> **결론**: 이 프로젝트는 **훌륭한 결과물**이며, 실제 서비스에 배포하여 운영할 수 있는 수준입니다. 👏

---

**보고서 작성일**: 2024년  
**다음 재평가 권장 시기**: 주요 개선사항 적용 후 또는 3개월 후






```

---

## File: D:\projectsing\S-Delivery-AppV3\docs\CLONE_LAUNCH_PASS_CHECKLIST.md

```markdown
# S-Delivery v3.0 Clone & Launch PASS Checklist

이 문서는 S-Delivery v3.0 기반의 상점 앱을 복제(Clone)하고 런칭할 때 반드시 확인해야 할 **PASS / FAIL 기준**을 정의합니다.
이 과정에서 하나라도 FAIL이 발생하면 런칭할 수 없습니다.

## A. Repo Integrity (필수 파일 확인)
- [ ] `firebase.json` 존재 여부 (indexes 설정 포함 확인)
- [ ] `firestore.indexes.json` 존재 여부 (Upsell 복합 인덱스 포함 확인)
- [ ] `functions/src/scheduled/statsDailyV3.ts` 존재 여부 (v2 scheduler)
- [ ] `functions/package.json` 존재 여부

## B. .env / Firebase Config
- [ ] `.env` 파일이 생성되었는가? (템플릿 복사)
- [ ] `VITE_FIREBASE_API_KEY` 등 필수 키가 교체되었는가? **(Template 값 사용 금지)**
- [ ] `VITE_FCM_VAPID_KEY` 설정 확인

## C. Firestore Rules & Indexes
- [ ] **Firestore Rules 배포**
  ```bash
  firebase deploy --only firestore:rules
  ```
- [ ] **Firestore Indexes 배포 (Upsell 필수)**
  ```bash
  firebase deploy --only firestore:indexes
  ```
- [ ] **PASS 기준**: 배포 성공 메시지 확인. `Missing Index` 에러가 앱 구동 중 발생하지 않아야 함.

## D. Functions Deploy (Daily Reports)
- [ ] **Dependencies 설치**
  ```bash
  cd functions
  npm ci
  ```
- [ ] **Functions 배포**
  ```bash
  firebase deploy --only functions
  ```
- [ ] **PASS 기준**: `statsDailyV3` 함수가 에러 없이 배포되어야 함.
- [ ] **설정 확인**: Cloud Console에서 `statsDailyV3`가 `asia-northeast3`, `dailly 00:10 KST`로 설정되었는지 확인.

## E. Hosting Deploy
- [ ] **Build & Deploy**
  ```bash
  npm run build
  firebase deploy --only hosting
  ```
- [ ] **PASS 기준**: 배포된 URL 접속 시 404가 없고, 메인 페이지가 정상 로딩됨.

## F. Admin 초기 설정
- [ ] **최초 로그인**: 관리자 계정 생성 및 로그인
- [ ] **상점 설정**: `/store-setup` 또는 `/admin/store-settings` 진입
- [ ] **영업 시간 / 배달팁 설정**: 초기값 입력 확인
- [ ] **PASS 기준**: 상점이 생성되고 `stores/default` 문서가 Firestore에 존재함.

## G. 고객 플로우 QA
- [ ] **메뉴 조회**: 메뉴 리스트 정상 출력 (숨김 메뉴 제외 확인)
- [ ] **장바구니 담기**: 정상 동작
- [ ] **주문 접수**: 테스트 결제 및 주문 생성 확인
- [ ] **재주문 확인**: `내 주문` 목록 -> `같은 메뉴 담기` 클릭 -> 옵션 초기화된 상태로 장바구니 이동 확인
- [ ] **PASS 기준**: 전체 주문 사이클(접수~완료) 에러 없음.

## H. Upsell QA
- [ ] **장바구니 Upsell 노출**: 장바구니 페이지 하단 `함께 즐기면 좋은 메뉴` 섹션 노출
- [ ] **동작 확인**: 추천 메뉴 '담기' 클릭 시 장바구니 추가됨
- [ ] **PASS 기준**: 콘솔에 `index missing` 에러가 없어야 함.

## I. Daily Report QA
- [ ] **페이지 접속**: `/admin/daily-reports` 접속
- [ ] **데이터 확인**: "아직 집계된 데이터가 없습니다" (첫 런칭 직후 정상)
- [ ] **PASS 기준**: 페이지 로딩 시 타임존 에러나 권한 에러가 없어야 함.

## J. 운영 금지 규칙 (절대 위반 금지)
- [ ] **[FAIL]** 운영 DB 삭제 (Firestore 콘솔에서 전체 삭제 금지)
- [ ] **[FAIL]** `statsDailyV3` 함수 삭제 (리포트 중단됨)
- [ ] **[FAIL]** 고객 실결제 유도 (테스트 모드 PG 반드시 확인)

## K. 런칭 후 24h 모니터링 최소 체크
- [ ] 런칭 다음 날 오전 00:15 이후 `statsDailyV3` 실행 로그 확인 ("Completed" 메시지)
- [ ] Admin Daily Report 페이지에서 데이터 조회 되는지 확인

## L. RISK (Option A - Owner Accepted)
> **[RISK] statsDailyV3 Daily Full Scan**
> - **내용**: 일일 리포트 생성 시 `db.collection("stores").get()`으로 모든 상점을 스캔함.
> - **영향**: 상점 수가 1,000개 이상으로 늘어날 경우 Read 비용이 선형 증가.
> - **조치**: 현재 MVP 단계에서는 허용(Acceptable Risk). 향후 `updatedAt` 기반 스캔이나 Group Query로 고도화 필요.
> - **PASS 기준**: 위 비용 리스크를 인지하고 출시함.

```

---

## File: D:\projectsing\S-Delivery-AppV3\docs\firebase_provision_comparison.md

```markdown
# Firebase 제공 방식 비교 분석

## 📊 두 가지 방식 상세 비교

---

## 방식 A: 플랫폼 운영자(사용자)가 Firebase 제공

### 구조
```
사용자 (플랫폼 운영자)
└─ Firebase 계정 1개
   ├─ 프로젝트 A (대박마라탕)
   ├─ 프로젝트 B (김치찌개)
   ├─ 프로젝트 C (치킨하우스)
   └─ ... (상점 추가마다 프로젝트 생성)

도메인:
- daebak.myplatform.com
- kimchi.myplatform.com
- chicken.myplatform.com
```

### 💰 비용 구조

#### 플랫폼 운영자 부담
```
Firebase 비용 (상점 10개 기준):
- Firestore: 상점당 월 $10-20
- Hosting: 상점당 월 $5-10
- Functions: 상점당 월 $5-10
- Storage: 상점당 월 $2-5

총 비용: 월 $220-450 (10개 상점)
         월 $2,200-4,500 (100개 상점)

도메인: 연 $12

연간 총 비용:
- 10개 상점: $2,640-5,400
- 100개 상점: $26,400-54,000
```

#### 사장님 부담
```
월 사용료: $30-100 (플랫폼 운영자가 결정)
또는
주문당 수수료: 주문 1건당 $1-2
```

### ✅ 장점

#### 1. 사장님 입장
- ✅ **기술 지식 불필요**: Firebase가 뭔지 몰라도 됨
- ✅ **즉시 시작**: 회원가입만 하면 바로 사용
- ✅ **관리 부담 없음**: 서버, 데이터베이스 신경 안 써도 됨
- ✅ **비용 예측 가능**: 월 정액제 또는 수수료제
- ✅ **기술 지원**: 플랫폼 운영자가 모든 문제 해결

#### 2. 플랫폼 운영자 입장
- ✅ **중앙 관리**: 모든 상점 한 곳에서 관리
- ✅ **일괄 업데이트**: 버그 수정 시 한 번에 모든 상점 적용
- ✅ **통합 모니터링**: 모든 상점 상태 실시간 확인
- ✅ **데이터 분석**: 전체 상점 통계 분석 가능
- ✅ **수익 모델 명확**: 월 사용료 또는 수수료로 수익

#### 3. 기술적 장점
- ✅ **자동화 가능**: 스크립트로 상점 생성 자동화
- ✅ **백업 통합**: 모든 상점 데이터 중앙 백업
- ✅ **보안 관리**: 통합 보안 정책 적용
- ✅ **성능 최적화**: 리소스 효율적 분배

### ❌ 단점

#### 1. 비용 부담
- ❌ **초기 비용 높음**: 상점 없어도 인프라 유지 비용
- ❌ **확장 비용**: 상점 증가 시 비용 급증
- ❌ **예상 불가**: 특정 상점 폭발적 성장 시 비용 폭등

#### 2. 법적 책임
- ❌ **데이터 책임**: 모든 고객 데이터 관리 책임
- ❌ **개인정보보호법**: GDPR, 개인정보보호법 준수 의무
- ❌ **장애 책임**: 서비스 중단 시 모든 상점에 영향
- ❌ **보안 사고**: 해킹 시 모든 상점 데이터 유출 위험

#### 3. 운영 부담
- ❌ **24/7 모니터링**: 항상 시스템 감시 필요
- ❌ **기술 지원**: 모든 사장님 문의 대응
- ❌ **긴급 대응**: 밤낮없이 장애 대응
- ❌ **인력 필요**: 개발자, 운영자 고용 필요

#### 4. 비즈니스 리스크
- ❌ **선투자 필요**: 수익 전에 큰 비용 발생
- ❌ **수익 불확실**: 사장님들이 사용료 안 낼 수도
- ❌ **경쟁 심화**: 다른 플랫폼과 가격 경쟁

---

## 방식 B: 사장님이 각자 Firebase 제공

### 구조
```
사장님 A
└─ 자신의 Firebase 계정
   └─ 프로젝트 A (대박마라탕)

사장님 B
└─ 자신의 Firebase 계정
   └─ 프로젝트 B (김치찌개)

사장님 C
└─ 자신의 Firebase 계정
   └─ 프로젝트 C (치킨하우스)

플랫폼 운영자 (사용자)
└─ 도메인만 제공
   ├─ daebak.myplatform.com
   ├─ kimchi.myplatform.com
   └─ chicken.myplatform.com
```

### 💰 비용 구조

#### 플랫폼 운영자 부담
```
도메인: 연 $12
간단한 웹사이트 호스팅: 월 $5-10 (선택)

연간 총 비용: $12-132
```

#### 사장님 부담 (각자)
```
Firebase 비용: 월 $25-50 (사용량에 따라)
도메인: $0 (플랫폼 운영자 제공)

연간 총 비용: $300-600
```

### ✅ 장점

#### 1. 플랫폼 운영자 입장
- ✅ **최소 비용**: 도메인 비용만 (연 $12)
- ✅ **확장 무제한**: 상점 1,000개여도 비용 동일
- ✅ **법적 책임 최소**: 데이터는 각 사장님 책임
- ✅ **운영 부담 없음**: Firebase 관리 안 해도 됨
- ✅ **빠른 시작**: 복잡한 인프라 구축 불필요

#### 2. 사장님 입장
- ✅ **완전한 통제**: 자신의 데이터 완전 소유
- ✅ **독립성**: 플랫폼 종료되어도 앱 계속 운영
- ✅ **투명한 비용**: Firebase 청구서 직접 확인
- ✅ **커스터마이징**: 원하면 코드 수정 가능
- ✅ **데이터 소유**: 언제든 데이터 추출 가능

#### 3. 비즈니스 장점
- ✅ **리스크 분산**: 한 상점 문제가 다른 상점에 영향 없음
- ✅ **빠른 확장**: 기술 투자 없이 바로 확장
- ✅ **유연한 가격**: 도메인 사용료만 받거나 무료 제공

### ❌ 단점

#### 1. 사장님 입장
- ❌ **기술 장벽**: Firebase 계정 생성, 설정 필요
- ❌ **초기 설정 복잡**: 가이드 따라 여러 단계 진행
- ❌ **비용 부담**: 직접 Firebase 비용 지불
- ❌ **문제 해결**: 기술 문제 발생 시 스스로 해결

#### 2. 플랫폼 운영자 입장
- ❌ **통합 관리 불가**: 각 상점 상태 모니터링 어려움
- ❌ **일괄 업데이트 불가**: 각 사장님이 직접 업데이트
- ❌ **통계 수집 어려움**: 전체 데이터 분석 불가
- ❌ **수익 모델 제한**: 도메인 사용료 외 수익 어려움

#### 3. 기술적 단점
- ❌ **자동화 어려움**: 각 사장님이 수동 작업
- ❌ **일관성 부족**: 각자 다른 버전 사용 가능
- ❌ **지원 어려움**: 각 사장님 환경이 달라 문제 해결 복잡

---

## 📊 상세 비교표

| 항목 | 방식 A (플랫폼 제공) | 방식 B (사장님 제공) |
|------|-------------------|-------------------|
| **초기 비용** | 높음 ($1,000+) | 낮음 ($12) |
| **월 운영 비용** | 높음 ($200-500/10개 상점) | 낮음 ($0-10) |
| **확장 비용** | 선형 증가 | 고정 |
| **사장님 비용** | 낮음 ($30-100/월) | 높음 ($25-50/월) |
| **기술 난이도** | 높음 | 중간 |
| **법적 책임** | 높음 | 낮음 |
| **운영 부담** | 높음 | 낮음 |
| **수익 가능성** | 높음 | 낮음 |
| **사장님 진입장벽** | 낮음 | 높음 |
| **독립성** | 낮음 | 높음 |

---

## 💼 비즈니스 모델 비교

### 방식 A: SaaS 플랫폼 모델

#### 수익 구조
```
월 사용료: 상점당 $50
상점 100개 = 월 $5,000 수익

비용: 월 $2,200-4,500
순이익: 월 $500-2,800

또는

수수료: 주문당 $1
월 1,000건 주문 × 100개 상점 = 월 $100,000 수익
비용: 월 $2,200-4,500
순이익: 월 $95,600-97,800 (대박!)
```

#### 성장 전략
- 초기: 무료 또는 저가로 사장님 유치
- 성장: 기능 추가하며 가격 인상
- 성숙: 프리미엄 플랜 출시

### 방식 B: 도메인 제공 모델

#### 수익 구조
```
도메인 사용료: 상점당 월 $10
상점 100개 = 월 $1,000 수익

비용: 월 $5-10
순이익: 월 $990-995

또는

무료 제공 + 광고 수익
또는
무료 제공 + 프리미엄 기능 판매
```

#### 성장 전략
- 초기: 무료로 빠르게 확산
- 성장: 프리미엄 기능 판매
- 성숙: 컨설팅, 커스터마이징 서비스

---

## 🎯 시나리오별 추천

### 시나리오 1: 기술 자신 있고, 큰 수익 원함
→ **방식 A 추천**
- 개발자 고용 가능
- 24/7 운영 가능
- 초기 투자 가능 ($10,000+)
- 수수료 모델로 큰 수익 기대

### 시나리오 2: 최소 비용으로 시작, 리스크 회피
→ **방식 B 추천**
- 혼자 운영
- 부업으로 시작
- 초기 투자 최소화
- 법적 책임 최소화

### 시나리오 3: 중간 (하이브리드)
→ **방식 A + B 혼합**
- 기본: 방식 B (사장님 Firebase)
- 프리미엄: 방식 A (플랫폼 Firebase)
- 사장님이 선택

---

## 🔍 실제 사례

### 방식 A 사례: Shopify
```
- 플랫폼이 모든 인프라 제공
- 월 $29-299 사용료
- 수수료: 거래액의 0.5-2%
- 연 매출: $5.6B (2022)
```

### 방식 B 사례: WordPress
```
- 사용자가 자신의 호스팅 사용
- WordPress.org는 소프트웨어만 제공
- 무료 또는 프리미엄 테마/플러그인 판매
- 생태계 전체 가치: $600B+
```

---

## 📋 의사결정 체크리스트

### 방식 A를 선택하세요 (다음 중 3개 이상 해당 시)
- [ ] 개발 경험 풍부
- [ ] 초기 투자 가능 ($10,000+)
- [ ] 24/7 운영 가능
- [ ] 큰 수익 목표 (월 $10,000+)
- [ ] 법적 리스크 감수 가능
- [ ] 팀 구성 가능 (개발자, 운영자)

### 방식 B를 선택하세요 (다음 중 3개 이상 해당 시)
- [ ] 최소 비용으로 시작
- [ ] 혼자 운영
- [ ] 부업 또는 실험
- [ ] 리스크 최소화
- [ ] 빠른 시작 원함
- [ ] 법적 책임 회피

---

## 💡 최종 추천

### 초보자 또는 테스트 단계
→ **방식 B (사장님 Firebase)**
- 연 $12로 시작
- 리스크 없이 시장 검증
- 성공하면 방식 A로 전환

### 경험자 또는 본격 사업
→ **방식 A (플랫폼 Firebase)**
- 초기 투자하고 큰 수익 추구
- 전문 팀 구성
- SaaS 플랫폼 구축

---

**어떤 방식을 선택하시겠습니까?**

1. **방식 A**: 플랫폼이 Firebase 제공 (높은 수익, 높은 리스크)
2. **방식 B**: 사장님이 Firebase 제공 (낮은 비용, 낮은 리스크)
3. **하이브리드**: 두 가지 옵션 모두 제공

선택하시면 해당 방식에 맞는 프롬프트를 최종 확정하겠습니다!

```

---

## File: D:\projectsing\S-Delivery-AppV3\docs\multi_tenant_guide.md

```markdown
# My-Pho-App 멀티 테넌트 변환 가이드

## 📌 개요

기존 my-pho-app을 **멀티 테넌트 SaaS**로 변환하여 여러 상점이 독립적으로 사용할 수 있게 만드는 가이드입니다.

### 핵심 개념
- **1개의 앱** = 여러 상점이 공유
- **각 상점**은 독립적인 데이터와 설정 보유
- **초기 설정 마법사**로 쉬운 온보딩
- **Firebase 프로젝트 공유** (비용 절감)

---

## 🏗 아키텍처 변경

### Before (단일 상점)
```
users/
menus/
orders/
notices/
```

### After (멀티 테넌트)
```
stores/                    # 상점 정보
  {storeId}/
    - info                 # 가게 정보
    - settings             # 설정
    
stores/{storeId}/menus/    # 상점별 메뉴
stores/{storeId}/orders/   # 상점별 주문
stores/{storeId}/notices/  # 상점별 공지
stores/{storeId}/reviews/  # 상점별 리뷰
stores/{storeId}/coupons/  # 상점별 쿠폰

users/                     # 전역 사용자
storeAdmins/              # 상점 관리자 매핑
  {userId}/
    - storeId
    - role
```

---

## 🎯 Phase 0: 멀티 테넌트 초기 설정

### Prompt 0-1: 상점 정보 스키마 설계
```
Firestore에 stores 컬렉션을 설계해줘:

문서 구조 (stores/{storeId}):
{
  // 기본 정보
  storeName: string,           // 가게명
  businessNumber: string,      // 사업자번호
  ownerName: string,           // 대표자명
  phone: string,               // 대표 전화번호
  
  // 주소 정보
  address: string,             // 기본 주소
  detailAddress: string,       // 상세 주소
  zipCode: string,             // 우편번호
  location: {                  // 지도 좌표
    lat: number,
    lng: number
  },
  
  // 운영 정보
  businessHours: {
    monday: {open: string, close: string, closed: boolean},
    tuesday: {...},
    // ... 요일별
  },
  deliveryFee: number,         // 배달비
  minOrderAmount: number,      // 최소 주문 금액
  deliveryRadius: number,      // 배달 반경 (km)
  
  // 디자인/브랜딩
  logo: string,                // 로고 URL
  primaryColor: string,        // 메인 색상
  description: string,         // 가게 소개
  
  // API 키 (암호화 권장)
  googleMapsApiKey: string,    // Google Maps API
  
  // 상태
  active: boolean,             // 활성화 여부
  setupCompleted: boolean,     // 초기 설정 완료
  
  // 메타
  createdAt: timestamp,
  updatedAt: timestamp,
  ownerId: string              // 생성자 UID
}

보안 규칙:
- 읽기: 해당 상점 관리자만
- 쓰기: 해당 상점 관리자만
```

### Prompt 0-2: 상점 관리자 매핑 스키마
```
storeAdmins 컬렉션을 설계해줘:

문서 구조 (storeAdmins/{userId}):
{
  storeId: string,             // 관리하는 상점 ID
  role: string,                // 'owner' | 'manager' | 'staff'
  permissions: string[],       // 권한 목록
  createdAt: timestamp
}

보안 규칙:
- 읽기: 본인만
- 쓰기: 시스템만 (Cloud Functions)
```

### Prompt 0-3: 초기 설정 마법사 UI
```
src/components/setup/SetupWizard.js 파일을 생성해줘:

단계별 폼:

1단계: 기본 정보
- 가게명 (필수)
- 사업자번호 (필수)
- 대표자명 (필수)
- 대표 전화번호 (필수)

2단계: 주소 정보
- 주소 검색 (Daum Postcode API)
- 상세 주소
- 지도에서 위치 확인 (Google Maps)

3단계: 운영 정보
- 영업시간 (요일별)
- 배달비
- 최소 주문 금액
- 배달 반경

4단계: 디자인 설정
- 로고 업로드 (선택)
- 메인 색상 선택
- 가게 소개

5단계: API 설정
- Google Maps API 키 입력
- (선택) 결제 PG API 키

UI 구성:
- 진행 표시 바 (1/5, 2/5, ...)
- 이전/다음 버튼
- 각 단계별 유효성 검사
- 완료 시 stores 컬렉션에 저장

완료 후:
- setupCompleted: true
- 메인 페이지로 리다이렉트
```

### Prompt 0-4: 상점 컨텍스트 생성
```
src/contexts/StoreContext.js 파일을 생성해줘:

Context 제공 기능:
- currentStore: 현재 상점 정보
- storeId: 현재 상점 ID
- isStoreAdmin: 상점 관리자 여부
- updateStore(data): 상점 정보 업데이트
- loading: 로딩 상태

구현:
1. 로그인 시 storeAdmins/{uid}에서 storeId 조회
2. stores/{storeId} 실시간 구독
3. 전역으로 상점 정보 제공

App.js에 적용:
- StoreProvider로 앱 전체 래핑
- 로그인 후 상점 정보 로드
- setupCompleted === false면 SetupWizard로 리다이렉트
```

### Prompt 0-5: 상점별 데이터 격리
```
모든 Firestore 쿼리를 상점별로 격리하도록 수정해줘:

변경 전:
collection(db, 'menus')

변경 후:
collection(db, `stores/${storeId}/menus`)

적용 대상:
- menus
- orders
- reviews
- notices
- coupons
- events

구현 방법:
1. useStore 훅 생성:
   const { storeId } = useStore();
   
2. 헬퍼 함수 생성:
   const getStoreCollection = (collectionName) => {
     return collection(db, `stores/${storeId}/${collectionName}`);
   }

3. 모든 컴포넌트에서 사용:
   const menusRef = getStoreCollection('menus');
```

---

## 🔐 보안 규칙 업데이트

### Prompt 0-6: Firestore 보안 규칙 수정
```
firestore.rules를 멀티 테넌트에 맞게 수정해줘:

rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    
    // 헬퍼 함수
    function isSignedIn() { 
      return request.auth != null; 
    }
    
    function isStoreAdmin(storeId) {
      return exists(/databases/$(db)/documents/storeAdmins/$(request.auth.uid))
        && get(/databases/$(db)/documents/storeAdmins/$(request.auth.uid)).data.storeId == storeId;
    }
    
    // 상점 정보
    match /stores/{storeId} {
      allow read: if isSignedIn() && isStoreAdmin(storeId);
      allow write: if isSignedIn() && isStoreAdmin(storeId);
    }
    
    // 상점별 메뉴
    match /stores/{storeId}/menus/{menuId} {
      allow read: if true;  // 공개
      allow write: if isStoreAdmin(storeId);
    }
    
    // 상점별 주문
    match /stores/{storeId}/orders/{orderId} {
      allow read: if isStoreAdmin(storeId) 
        || (isSignedIn() && resource.data.userId == request.auth.uid);
      allow create: if isSignedIn();
      allow update, delete: if isStoreAdmin(storeId);
    }
    
    // 상점별 리뷰
    match /stores/{storeId}/reviews/{reviewId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() 
        && resource.data.userId == request.auth.uid;
    }
    
    // 상점 관리자 매핑
    match /storeAdmins/{userId} {
      allow read: if isSignedIn() && request.auth.uid == userId;
      allow write: if false;  // Cloud Functions만
    }
    
    // 전역 사용자
    match /users/{userId} {
      allow read, write: if isSignedIn() && request.auth.uid == userId;
    }
  }
}
```

---

## 🎨 UI/UX 변경

### Prompt 0-7: 상점 선택/전환 기능
```
src/components/common/StoreSelector.js 파일을 생성해줘:

기능:
- 사용자가 관리하는 상점 목록 표시
- 상점 전환 (여러 상점 관리 시)
- 새 상점 추가 버튼

UI:
- 드롭다운 형태
- 현재 상점명 표시
- 상점 로고 아이콘

구현:
1. storeAdmins에서 userId로 조회
2. 여러 상점 관리 시 목록 표시
3. 선택 시 StoreContext 업데이트
4. localStorage에 마지막 선택 저장
```

### Prompt 0-8: 상점 설정 페이지
```
src/components/admin/StoreSettings.js 파일을 생성해줘:

기능:
- 상점 정보 조회 및 수정
- SetupWizard와 동일한 폼
- 실시간 미리보기

탭 구성:
1. 기본 정보
2. 운영 정보
3. 디자인 설정
4. API 설정
5. 고급 설정

저장:
- updateDoc으로 stores/{storeId} 업데이트
- 성공 토스트
```

---

## 🚀 배포 및 온보딩

### Prompt 0-9: 회원가입 시 상점 생성
```
회원가입 프로세스를 수정해줘:

기존:
1. 회원가입
2. 로그인
3. 앱 사용

변경:
1. 회원가입
2. 로그인
3. 초기 설정 마법사 (SetupWizard)
4. 상점 생성 및 storeAdmins 매핑
5. 앱 사용

구현:
- Signup.js에서 회원가입 성공 시
- /setup으로 리다이렉트
- SetupWizard 완료 시:
  * stores 컬렉션에 문서 생성
  * storeAdmins/{uid}에 매핑 생성
  * setupCompleted: true
```

### Prompt 0-10: 랜딩 페이지 추가
```
src/components/landing/LandingPage.js 파일을 생성해줘:

내용:
- 서비스 소개
- 주요 기능 설명
- 가격 정보 (선택)
- 시작하기 버튼 → 회원가입

구성:
- 히어로 섹션
- 기능 소개 (카드 형태)
- 고객 후기 (선택)
- FAQ
- CTA (Call to Action)

라우팅:
- / : LandingPage (로그아웃 상태)
- /app : WelcomePage (로그인 상태)
```

---

## 🔧 추가 기능

### Prompt 0-11: 상점별 도메인/서브도메인
```
(선택) 각 상점에 고유 URL을 제공하려면:

방법 1: 서브도메인
- store1.myapp.com
- store2.myapp.com

방법 2: 경로 기반
- myapp.com/store1
- myapp.com/store2

구현:
1. stores 컬렉션에 subdomain 필드 추가
2. Firebase Hosting rewrites 설정
3. 도메인에서 storeId 추출
4. StoreContext에 자동 설정

예시 (경로 기반):
- URL: myapp.com/store1
- storeId 추출: 'store1'
- 해당 상점 데이터 로드
```

### Prompt 0-12: 상점 통계 대시보드
```
src/components/admin/StoreDashboard.js 수정:

추가 지표:
- 전체 상점 수 (슈퍼 관리자만)
- 이번 달 신규 상점
- 활성 상점 비율

상점별 지표:
- 매출 (기존)
- 주문 수 (기존)
- 고객 수
- 리뷰 평점
- 인기 메뉴 Top 5
```

### Prompt 0-13: 구독/결제 시스템 (선택)
```
(선택) SaaS 수익화를 위한 구독 시스템:

Firestore 스키마 (subscriptions/{storeId}):
{
  plan: 'free' | 'basic' | 'pro',
  status: 'active' | 'canceled' | 'expired',
  startDate: timestamp,
  endDate: timestamp,
  features: {
    maxMenus: number,
    maxOrders: number,
    pushNotifications: boolean,
    customDomain: boolean
  }
}

기능:
- 플랜별 제한 확인
- 업그레이드 UI
- 결제 연동 (Stripe, Toss Payments)
```

---

## 📝 마이그레이션 가이드

### 기존 단일 상점 → 멀티 테넌트

```
1. 백업:
   - Firestore 데이터 export
   
2. 데이터 마이그레이션:
   - 기존 menus → stores/{defaultStoreId}/menus
   - 기존 orders → stores/{defaultStoreId}/orders
   - 기존 reviews → stores/{defaultStoreId}/reviews
   
3. 상점 정보 생성:
   - stores/{defaultStoreId} 문서 생성
   - 기존 관리자 → storeAdmins 매핑
   
4. 코드 업데이트:
   - 모든 쿼리를 상점별로 수정
   - StoreContext 적용
   
5. 테스트:
   - 기존 데이터 접근 확인
   - 새 상점 생성 테스트
```

---

## ✅ 체크리스트

### 멀티 테넌트 변환 완료 확인

- [ ] stores 컬렉션 생성
- [ ] storeAdmins 컬렉션 생성
- [ ] SetupWizard 구현
- [ ] StoreContext 적용
- [ ] 모든 쿼리 상점별 격리
- [ ] 보안 규칙 업데이트
- [ ] 상점 설정 페이지
- [ ] 랜딩 페이지 (선택)
- [ ] 데이터 마이그레이션 (기존 앱)
- [ ] 테스트 완료

---

## 🎯 사용 시나리오

### 상점 관리자 A
```
1. 회원가입
2. 초기 설정 마법사
   - 가게명: "라이옥"
   - 사업자번호: 123-45-67890
   - 주소, 영업시간 등 입력
3. 메뉴 등록
4. 주문 관리
```

### 상점 관리자 B
```
1. 회원가입
2. 초기 설정 마법사
   - 가게명: "김밥천국"
   - 사업자번호: 098-76-54321
   - 주소, 영업시간 등 입력
3. 메뉴 등록
4. 주문 관리
```

### 데이터 격리
```
stores/
  store_a/
    menus/     ← 라이옥 메뉴만
    orders/    ← 라이옥 주문만
    
  store_b/
    menus/     ← 김밥천국 메뉴만
    orders/    ← 김밥천국 주문만
```

---

## 💰 비용 절감 효과

### 단일 테넌트 (상점마다 별도 Firebase)
- Firebase 프로젝트 × N개
- Hosting × N개
- Functions × N개
- **비용: N배**

### 멀티 테넌트 (1개 Firebase 공유)
- Firebase 프로젝트 × 1개
- Hosting × 1개
- Functions × 1개
- **비용: 1배 (대폭 절감)**

---

## 🚀 다음 단계

1. **Phase 0 프롬프트 실행** (이 문서)
2. **기존 Phase 1-12 실행** (prompts_part1.md, part2.md)
3. **테스트 및 배포**
4. **상점 온보딩**

---

**작성일**: 2025-12-04  
**버전**: 1.0

```

---

## File: D:\projectsing\S-Delivery-AppV3\docs\prompts_part1.md

```markdown
# My-Pho-App 개발 프롬프트 가이드 (Part 1/3)

## 📌 개요

이 문서는 my-pho-app을 처음부터 현재 상태까지 개발하기 위한 **원자 단위의 상세한 프롬프트**를 단계별로 제공합니다.

**전제 조건:**
- 디자인은 제외 (기능 구현에만 집중)
- React + Firebase 기반
- 각 프롬프트는 독립적으로 실행 가능
- 순서대로 진행 권장

---

## 🚀 Phase 1: 프로젝트 초기 설정

### Prompt 1-1: React 프로젝트 생성
```
Create React App을 사용하여 새로운 React 프로젝트를 생성해줘.

요구사항:
- 프로젝트명: my-pho-app
- 현재 디렉토리에 생성
- 생성 후 package.json 확인

실행 명령:
npx create-react-app my-pho-app
cd my-pho-app
```

### Prompt 1-2: 필수 의존성 설치
```
다음 라이브러리들을 설치해줘:

1. Firebase SDK (인증, Firestore, Cloud Messaging)
2. React Router (라우팅)
3. React Toastify (알림 메시지)
4. React Icons (아이콘)
5. Google Maps API (지도)
6. File Saver (파일 다운로드)
7. XLSX (엑셀 처리)

실행 명령:
npm install firebase react-router-dom react-toastify react-icons @react-google-maps/api file-saver xlsx
```

### Prompt 1-3: Firebase 프로젝트 설정
```
Firebase 콘솔에서 새 프로젝트를 생성하고, 다음 서비스를 활성화한 후 설정 파일을 생성해줘:

활성화할 서비스:
1. Authentication (이메일/비밀번호 로그인)
2. Firestore Database
3. Cloud Functions
4. Cloud Messaging
5. Hosting

생성할 파일:
- src/firebase.js: Firebase 초기화 설정
- .env: 환경변수 (API 키 등)

firebase.js 내용:
- Firebase SDK import
- 환경변수에서 설정 읽기
- Firebase 앱 초기화
- auth, db export
```

### Prompt 1-4: 기본 폴더 구조 생성
```
다음 폴더 구조를 생성해줘:

src/
├── components/
│   ├── admin/
│   ├── common/
│   ├── menu/
│   ├── order/
│   ├── payment/
│   ├── review/
│   ├── notice/
│   ├── event/
│   └── user/
├── pages/
│   ├── admin/
│   └── debug/
├── hooks/
├── contexts/
├── utils/
├── lib/
├── styles/
├── api/
├── routes/
└── devtools/

각 폴더에 .gitkeep 파일 생성
```

### Prompt 1-5: 기본 라우팅 설정
```
React Router를 사용하여 기본 라우팅 구조를 App.js에 구현해줘:

필요한 라우트:
- / : 홈/웰컴 페이지
- /login : 로그인
- /signup : 회원가입
- /menu : 메뉴 목록
- /cart : 장바구니
- /orders : 내 주문 목록
- /admin/* : 관리자 페이지 (권한 필요)

구현 사항:
- BrowserRouter 사용
- Routes와 Route 컴포넌트 설정
- 미래 호환성 플래그 설정 (v7_startTransition, v7_relativeSplatPath)
```

---

## 🔐 Phase 2: 사용자 인증 시스템

### Prompt 2-1: Firebase Authentication 설정
```
Firebase Authentication을 사용한 이메일/비밀번호 로그인 시스템을 구현해줘:

구현할 기능:
1. 로그인 (signInWithEmailAndPassword)
2. 회원가입 (createUserWithEmailAndPassword)
3. 로그아웃 (signOut)
4. 인증 상태 감지 (onAuthStateChanged)

App.js에 추가:
- useState로 user 상태 관리
- useEffect로 인증 상태 구독
- 로그인 전까지 로딩 표시
```

### Prompt 2-2: 로그인 컴포넌트 생성
```
src/components/user/Auth.js 파일을 생성하고 로그인 폼을 구현해줘:

UI 요소:
- 이메일 입력 필드
- 비밀번호 입력 필드
- 로그인 버튼
- 회원가입 링크

기능:
- 폼 제출 시 Firebase signInWithEmailAndPassword 호출
- 성공 시 메인 페이지로 이동
- 실패 시 에러 메시지 표시 (react-toastify)
- onAuthSuccess prop으로 부모에게 알림
```

### Prompt 2-3: 회원가입 컴포넌트 생성
```
src/components/user/Signup.js 파일을 생성하고 회원가입 폼을 구현해줘:

UI 요소:
- 이메일 입력 필드
- 비밀번호 입력 필드
- 비밀번호 확인 필드
- 회원가입 버튼

유효성 검사:
- 이메일 형식 확인
- 비밀번호 최소 6자
- 비밀번호 일치 확인

기능:
- Firebase createUserWithEmailAndPassword 호출
- 성공 시 로그인 페이지로 이동
- 에러 처리
```

### Prompt 2-4: 사용자 문서 자동 생성 훅
```
src/hooks/useEnsureUserDoc.js 파일을 생성해줘:

기능:
- 로그인 시 Firestore users/{uid} 문서 확인
- 문서가 없으면 자동 생성
- 생성할 필드: email, displayName, createdAt

구현:
- useEffect 사용
- auth.currentUser 확인
- getDoc으로 문서 존재 확인
- setDoc으로 문서 생성 (merge: true)
```

### Prompt 2-5: 관리자 권한 시스템
```
관리자 권한 확인 시스템을 구현해줘:

1. src/hooks/useIsAdminState.js 생성:
   - Firestore admins/{uid} 문서 확인
   - isAdmin, adminLoading 상태 반환
   - onSnapshot으로 실시간 감지

2. src/routes/RequireAuth.js 생성:
   - 로그인 필수 라우트 보호
   - requireAdmin prop으로 관리자 전용 설정
   - 권한 없으면 리다이렉트

3. App.js에 적용:
   - 관리자 라우트에 RequireAuth 래핑
```

---

## 🍜 Phase 3: 메뉴 관리 시스템

### Prompt 3-1: Firestore 메뉴 스키마 설계
```
Firestore에 menus 컬렉션을 설계하고 보안 규칙을 설정해줘:

문서 구조 (menus/{menuId}):
{
  name: string,           // 메뉴명
  price: number,          // 가격
  category: string[],     // 카테고리 (배열)
  description: string,    // 설명
  imageUrl: string,       // 이미지 URL
  options: array,         // 옵션 [{name, price}]
  soldout: boolean,       // 품절 여부
  createdAt: timestamp    // 생성일
}

보안 규칙 (firestore.rules):
- 모든 사용자: 읽기 허용
- 쓰기: 금지 (관리자는 SDK로 직접 작성)
```

### Prompt 3-2: 카테고리 바 컴포넌트
```
src/components/menu/CategoryBar.js 파일을 생성해줘:

카테고리 목록:
['인기메뉴', '추천메뉴', '기본메뉴', '사이드메뉴', '음료', '주류']

UI:
- 가로 스크롤 가능한 버튼 리스트
- 선택된 카테고리 강조 표시
- 클릭 시 onSelect 콜백 호출

Props:
- selected: 현재 선택된 카테고리
- onSelect: 카테고리 선택 핸들러
```

### Prompt 3-3: 메뉴 카드 컴포넌트
```
src/components/menu/MenuCard.js 파일을 생성해줘:

표시 정보:
- 메뉴 이미지
- 메뉴명
- 가격
- 옵션 선택 (있는 경우)
- 수량 선택
- 장바구니 담기 버튼
- 품절 표시

관리자 전용 버튼 (isAdmin prop):
- 수정 버튼
- 삭제 버튼
- 품절 처리 버튼

Props:
- menu: 메뉴 객체
- isAdmin: 관리자 여부
- quantity: 수량
- selectedOption: 선택된 옵션 인덱스
- onQuantityChange: 수량 변경 핸들러
- onAddToCart: 장바구니 추가 핸들러
- onSoldout: 품절 처리 핸들러
- onDelete: 삭제 핸들러
- onEdit: 수정 핸들러
- onOptionChange: 옵션 변경 핸들러
```

### Prompt 3-4: 메뉴 목록 컴포넌트
```
src/components/menu/MenuList.js 파일을 생성해줘:

기능:
1. Firestore menus 컬렉션 실시간 구독 (onSnapshot)
2. 카테고리별 필터링
3. 메뉴 카드 렌더링
4. 수량 및 옵션 상태 관리
5. 장바구니 추가 기능
6. 관리자 기능 (품절, 삭제)

상태:
- menus: 전체 메뉴 목록
- selectedCat: 선택된 카테고리
- quantities: 각 메뉴의 수량 {menuId: qty}
- selectedOptions: 각 메뉴의 선택 옵션 {menuId: idx}
- editingMenu: 수정 중인 메뉴

구현:
- CategoryBar로 카테고리 선택
- filteredMenus로 카테고리별 필터링
- MenuCard 컴포넌트 매핑
```

### Prompt 3-5: 메뉴 등록/수정 폼
```
src/components/menu/MenuForm.js 파일을 생성해줘:

모드:
- create: 새 메뉴 등록
- edit: 기존 메뉴 수정

입력 필드:
- 메뉴명 (필수)
- 가격 (필수, 숫자)
- 카테고리 (다중 선택, 체크박스)
- 설명
- 이미지 URL
- 옵션 (동적 추가/삭제)

기능:
- addDoc (create) 또는 updateDoc (edit)
- 유효성 검사
- 성공/실패 토스트
- onSuccess, onCancel 콜백

Props:
- mode: 'create' | 'edit'
- menu: 수정할 메뉴 (edit 모드)
- onSuccess: 성공 콜백
- onCancel: 취소 콜백
```

---

## 🛒 Phase 4: 장바구니 및 주문 시스템

### Prompt 4-1: 장바구니 Context 생성
```
src/contexts/CartContext.js 파일을 생성하고 장바구니 상태 관리를 구현해줘:

Context 제공 기능:
- cartItems: 장바구니 아이템 배열
- addToCart(item, qty): 아이템 추가
- removeFromCart(itemId): 아이템 제거
- updateQuantity(itemId, qty): 수량 변경
- clearCart(): 장바구니 비우기
- totalItems: 총 아이템 수
- totalPrice: 총 가격

아이템 구조:
{
  id: menuId,
  name: string,
  price: number,
  qty: number,
  selectedOption: {name, price} | null
}

구현:
- useState로 cartItems 관리
- localStorage에 저장 (새로고침 시 유지)
- useEffect로 localStorage 동기화
```

### Prompt 4-2: 장바구니 페이지
```
src/components/order/CartPage.js 파일을 생성해줘:

표시 내용:
- 장바구니 아이템 목록
- 각 아이템: 이름, 옵션, 가격, 수량, 소계
- 수량 변경 버튼 (+/-)
- 삭제 버튼
- 총 금액
- 주문하기 버튼

기능:
- CartContext 사용
- 수량 변경 시 updateQuantity 호출
- 삭제 시 removeFromCart 호출
- 주문하기 클릭 시 /checkout으로 이동
- 빈 장바구니 시 메시지 표시
```

### Prompt 4-3: 주문/결제 페이지
```
src/components/order/OrderPayment.js 파일을 생성해줘:

입력 필드:
- 주문자 이름 (필수)
- 전화번호 (필수)
- 배달/포장 선택 (라디오 버튼)
- 결제 방법 선택:
  * 배달: 앱결제, 만나서카드, 만나서현금
  * 포장: 앱결제, 방문시결제
- 배송 주소 (배달 선택 시):
  * 주소 검색 버튼 (Daum Postcode API)
  * 상세 주소
- 요청사항 (선택)

기능:
1. 폼 유효성 검사
2. Firestore orders 컬렉션에 주문 생성:
   - items: 장바구니 아이템
   - deliveryType: 'delivery' | 'pickup'
   - paymentType: 한글 결제 방법
   - paymentMethod: 표준 코드 (toPaymentMethodCode 함수)
   - customerAddress, customerName, customerPhone
   - request, total, status: '접수'
   - userId, createdAt
   - adminDeleted: false, userDeleted: false, reviewed: false
3. 주문 성공 시:
   - 장바구니 비우기
   - /orders로 이동
   - 성공 토스트
```

### Prompt 4-4: Firestore 주문 스키마
```
Firestore orders 컬렉션 스키마를 설계하고 보안 규칙을 설정해줘:

문서 구조 (orders/{orderId}):
{
  items: [{id, name, price, qty}],
  deliveryType: 'delivery' | 'pickup',
  paymentType: string,
  paymentMethod: string,
  customerAddress: string,
  customerName: string,
  customerPhone: string,
  request: string,
  total: number,
  status: string,  // '접수', '조리중', '배달중', '완료', '취소'
  userId: string,
  userDisplayName: string,
  createdAt: timestamp,
  adminDeleted: boolean,
  userDeleted: boolean,
  reviewed: boolean,
  updateType: string  // 알림용
}

보안 규칙:
- 읽기: 관리자만
- 생성: 로그인 사용자
- 수정/삭제: 관리자만

인덱스 생성:
- status + createdAt
- userId + createdAt
- adminDeleted + createdAt
```

### Prompt 4-5: 내 주문 목록
```
src/components/order/OrderList.js 파일을 생성해줘:

기능:
- 현재 사용자의 주문만 조회 (where userId == currentUser.uid)
- 최신순 정렬 (orderBy createdAt desc)
- 실시간 업데이트 (onSnapshot)

표시 내용:
- 주문 번호 (orderId)
- 주문 일시
- 주문 상태 (배지 색상 구분)
- 주문 아이템 목록
- 총 금액
- 배달/포장 구분
- 리뷰 작성 버튼 (완료 상태 + 미작성)

상태별 색상:
- 접수: 파란색
- 조리중: 주황색
- 배달중: 보라색
- 완료: 녹색
- 취소: 회색
```

---

## 👨‍💼 Phase 5: 관리자 기능

### Prompt 5-1: 관리자 대시보드
```
src/components/admin/Dashboard.js 파일을 생성해줘:

표시 지표:
1. 이번 달 총 매출 (adminDeleted !== true, status !== '취소')
2. 오늘 매출
3. 이번 달 총 주문 수
4. 리뷰 평균 평점

데이터 수집:
- orders 컬렉션 실시간 구독
- reviews 컬렉션 실시간 구독
- menus 컬렉션 실시간 구독

구현:
- onSnapshot으로 실시간 데이터
- 관리자 권한 확인 (useIsAdminState)
- 권한 없으면 접근 차단
- 카드 형태로 지표 표시
```

### Prompt 5-2: 주문 관리 페이지
```
src/components/admin/OrderManagement.js 파일을 생성해줘:

기능:
1. 전체 주문 목록 조회 (adminDeleted !== true)
2. 주문 상태 변경 (드롭다운)
3. 주문 삭제 (adminDeleted = true)
4. 엑셀 다운로드

필터:
- 상태별 필터 (전체, 접수, 조리중, 배달중, 완료, 취소)
- 날짜 범위 필터

표시 정보:
- 주문 번호, 일시, 고객명, 전화번호
- 주문 내역, 금액
- 배달/포장, 주소
- 요청사항
- 상태 변경 드롭다운
- 삭제 버튼

엑셀 다운로드:
- xlsx 라이브러리 사용
- 필터링된 주문만 다운로드
- 파일명: orders_YYYYMMDD.xlsx
```

### Prompt 5-3: 실시간 주문 알림
```
src/components/admin/AdminOrderAlert.js 파일을 생성해줘:

기능:
- orders 컬렉션 실시간 감지
- 새 주문 생성 시 알림 표시
- 주문 상태 변경 시 알림

구현:
1. onSnapshot으로 orders 구독
2. 이전 스냅샷과 비교하여 변경 감지
3. docChanges()로 추가/수정 구분
4. 새 주문: "새 주문이 접수되었습니다!" 토스트
5. 상태 변경: "주문 상태가 변경되었습니다" 토스트

조건:
- 관리자만 구독
- App.js에서 전역으로 렌더링
- key prop으로 재마운트 방지
```

### Prompt 5-4: 메뉴 관리 페이지
```
src/components/admin/MenuManagement.js 파일을 생성해줘:

기능:
1. 메뉴 목록 표시
2. 메뉴 추가 (MenuForm 모달)
3. 메뉴 수정
4. 메뉴 삭제
5. 품절 처리

UI:
- 상단: 메뉴 추가 버튼
- 메뉴 목록 테이블:
  * 이미지, 이름, 가격, 카테고리
  * 품절 여부
  * 수정/삭제 버튼

모달:
- MenuForm 컴포넌트 재사용
- 배경 클릭 시 닫기
```

### Prompt 5-5: 쿠폰 관리
```
src/components/admin/CouponManagement.js 파일을 생성해줘:

Firestore 스키마 (coupons/{couponId}):
{
  code: string,
  discount: number,  // 할인율 (%)
  expiry: timestamp,
  createdAt: timestamp
}

기능:
1. 쿠폰 목록 표시
2. 쿠폰 추가
3. 쿠폰 수정
4. 쿠폰 삭제

입력 필드:
- 쿠폰 코드
- 할인율 (1-100)
- 만료일 (날짜 선택)

유효성 검사:
- 코드 필수
- 할인율 1-100
- 만료일은 오늘 이후
```

```

---

## File: D:\projectsing\S-Delivery-AppV3\docs\USER_MANUAL_V3.md

```markdown
# 📘 S-Delivery V3 사용자 기능 상세 설명서 (User Functional Manual)

이 문서는 S-Delivery V3 애플리케이션의 **일반 사용자(고객)** 관점에서의 모든 기능을 초원자 단위(Atomic Level)로 상세하게 기술합니다.

---

## 1. 👋 시작하기 및 계정 관리

### 1.1 회원가입 (Sign Up)
- **기능**: 이메일과 비밀번호를 사용하여 새로운 계정을 생성합니다.
- **상세 동작**:
  1. `회원가입` 버튼 클릭 시 회원가입 폼으로 이동합니다.
  2. **이메일 입력**: 유효한 이메일 형식을 체크합니다.
  3. **비밀번호 입력**: 보안 요구사항(최소 길이 등)을 충족해야 합니다.
  4. **비밀번호 확인**: 입력한 비밀번호와 일치하는지 실시간으로 검증합니다.
  5. `가입 완료` 버튼 클릭 시 Firebase Auth에 계정이 생성되고 자동 로그인됩니다.

### 1.2 로그인 (Login)
- **기능**: 등록된 이메일/비밀번호로 서비스에 접속합니다.
- **상세 동작**:
  - 유효하지 않은 계정 정보 입력 시 에러 메시지("이메일 또는 비밀번호가 올바르지 않습니다")를 표시합니다.
  - 로그인 성공 시 메인 화면(카테고리 목록)으로 리다이렉트됩니다.

---

## 2. 🍽️ 메뉴 탐색 및 선택

### 2.1 카테고리별 메뉴 조회
- **기능**: 음식 종류별로 분류된 메뉴를 탐색합니다.
- **UI 요소**: 상단 가로 스크롤 가능한 탭 바 또는 아이콘 그리드.
- **동작**: '전체', '한식', '중식', '일식' 등 탭 클릭 시 해당 분류의 메뉴만 필터링되어 표시됩니다.

### 2.2 메뉴 검색 (Search)
- **기능**: 키워드로 원하는 메뉴를 빠르게 찾습니다.
- **상세 동작**:
  - 검색창에 텍스트 입력 시 실시간(또는 엔터키 입력 시)으로 검색 결과가 갱신됩니다.
  - **검색 범위**: 메뉴 이름 뿐만 아니라 메뉴 설명에 포함된 단어도 검색됩니다.
  - 검색 결과가 없을 경우 "검색 결과가 없습니다" 안내 문구를 표시합니다.

### 2.3 메뉴 상세 및 옵션 선택
- **기능**: 메뉴의 상세 정보를 확인하고 옵션을 선택하여 장바구니에 담습니다.
- **상세 정보**: 메뉴 이미지(고해상도), 이름, 가격, 상세 설명.
- **옵션 기능(Atomic Details)**:
  - **필수/선택 옵션**: 메뉴에 따라 필수 선택 옵션(예: 맵기 단계)과 추가 선택 옵션(예: 토핑 추가)이 구분됩니다.
  - **수량 조절**: 기본 1개부터 시작하며 `+`, `-` 버튼으로 수량을 조절합니다.
  - **가격 실시간 반영**: 선택한 옵션 가격이 기본 가격에 합산되어 '총 주문 금액'에 실시간으로 반영됩니다.
  - **품절 상태(Sold Out)**: 관리자가 품절 설정한 메뉴는 `[품절]` 뱃지가 표시되며 선택이 불가능합니다.

---

## 3. 🛒 장바구니 및 주문 (Ordering)

### 3.1 장바구니 관리
- **기능**: 담은 메뉴를 확인하고 수량을 변경하거나 삭제합니다.
- **상세 동작**:
  - **수량 변경**: 아이템별 `+`, `-` 버튼으로 수량을 변경합니다. 수량이 0이 되면 삭제 여부를 묻거나 자동 삭제됩니다.
  - **개별 삭제**: `휴지통` 아이콘 클릭 시 해당 메뉴만 삭제됩니다.
  - **전체 삭제**: `전체 삭제` 버튼 클릭 시 장바구니가 초기화됩니다.
  - **최소 주문 금액 체크**: 설정된 최소 주문 금액 미달 시 "주문하기" 버튼이 비활성화되거나 경고 메시지가 표시됩니다.

### 3.2 💎 장바구니 업셀링 (Upsell System) [V3 신규 기능]
- **기능**: 현재 장바구니에 담긴 메뉴를 분석하여 함께 먹기 좋은 메뉴를 추천합니다.
- **로직 상세**:
  - 장바구니에 '메인 요리'만 있을 경우 -> '사이드 메뉴' 또는 '음료'를 하단에 노출합니다.
  - **UI**: "이런 메뉴는 어떠세요?" 섹션이 장바구니 목록 하단에 카드 형태로 표시됩니다.
  - **간편 추가**: 추천 카드의 `+ 담기` 버튼 클릭 시 옵션 선택 없이(기본 옵션) 즉시 장바구니에 추가됩니다.

### 3.3 주문 및 결제 (Checkout)
- **기능**: 배송 정보를 입력하고 결제를 진행합니다.
- **입력 항목**:
  - **주소**: 도로명 주소 검색 API를 연동하여 정확한 위치를 입력합니다.
  - **상세 주소**: 동/호수 등 상세 정보를 직접 입력합니다.
  - **전화번호**: 연락 가능한 번호를 입력합니다.
  - **요청사항**: 사장님 또는 배달 기사님께 남길 메시지를 작성합니다.
- **결제 방식**: 신용카드, 카카오페이 등 PG사 연동 결제 또는 만나서 결제를 선택합니다.
- **주문 차단 로직(Smart Control)**: 관리자가 '매장 일시 정지' 상태로 설정한 경우, 결제 시도 시 "현재 주문을 받을 수 없습니다" 알림과 함께 주문이 차단됩니다.

---

## 4. 📦 주문 상태 및 내역 (Order Tracking)

### 4.1 실시간 주문 추적
- **기능**: 주문 후 배달 완료까지의 과정을 실시간으로 확인합니다.
- **상태 단계(Status Flow)**:
  1. **접수 대기**: 주문이 서버에 전송되었으나 관리자가 아직 확인하지 않은 상태.
  2. **접수 완료**: 관리자가 주문을 수락한 상태.
  3. **조리 중**: 주방에서 음식을 만들고 있는 상태.
  4. **배달 중**: 라이더가 음식을 픽업하여 이동 중인 상태.
  5. **배달 완료**: 음식이 고객에게 전달된 상태.
- **UI**: 각 단계별로 아이콘과 진행 막대(Process Bar)가 활성화되어 현재 상태를 직관적으로 보여줍니다.

### 4.2 주문 내역 및 상세 (History)
- **기능**: 과거 주문했던 모든 내역을 최신순으로 조회합니다.
- **정보**: 주문 일시, 매장명, 대표 메뉴명, 총 결제 금액, 주문 상태.
- **상세 보기**: 리스트 클릭 시 영수증 형태의 상세 페이지(주무 메뉴, 옵션 정보 포함)로 이동합니다.

### 4.3 💎 원클릭 재주문 (One-Click Reorder) [V3 신규 기능]
- **기능**: 과거에 주문했던 구성 그대로 단 한 번의 클릭으로 장바구니에 담습니다.
- **위치**: 주문 상세 페이지 하단 `재주문하기` 버튼.
- **로직 상세**:
  1. 버튼 클릭 시 해당 주문의 메뉴들이 현재 '품절' 상태인지 검사합니다.
  2. **전체 유효 시**: 기존 장바구니를 비우고(선택 사항) 해당 주문 메뉴들을 그대로 복원하여 장바구니 페이지로 이동합니다.
  3. **일부 품절 시**: "일부 메뉴가 품절되어 제외되었습니다" 경고 후 가능한 메뉴만 담습니다.

### 4.4 리뷰 작성
- **기능**: '배달 완료' 상태인 주문에 대해 별점과 후기를 남깁니다.
- **상세 동작**:
  - 1~5점 별점 선택.
  - 텍스트 리뷰 작성 및 사진 업로드(선택).
  - 작성된 리뷰는 매장 상세 페이지의 리뷰 탭에 공개됩니다.

---

> **참고**: 위 기능 중 `[V3 신규 기능]` 태그가 붙은 항목은 이번 버전 업데이트의 핵심 기능으로, 사용자 경험(UX)과 매출 증대를 위해 특별히 설계되었습니다.

```

---

## File: D:\projectsing\S-Delivery-AppV3\firebase.json

```json
{
    "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
    },
    "functions": [
        {
            "source": "functions",
            "codebase": "default",
            "ignore": [
                "node_modules",
                ".git",
                "firebase-debug.log",
                "firebase-debug.*.log"
            ],
            "predeploy": [
                "npm --prefix \"$RESOURCE_DIR\" run build"
            ]
        }
    ],
    "hosting": {
        "public": "build",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [
            {
                "source": "**",
                "destination": "/index.html"
            }
        ]
    },
    "storage": {
        "rules": "storage.rules"
    }
}
```

---

## File: D:\projectsing\S-Delivery-AppV3\FIREBASE_CONNECTION_COMPLETE.md

```markdown
# Firebase 연동 완료 보고서

## ✅ 완료된 작업

### 1. 환경 변수 설정
- `.env.local` 파일 생성 완료
- 새로운 Firebase 프로젝트 정보 설정 완료

### 2. Firebase 프로젝트 정보
- **프로젝트 ID**: `fir-delivery-app-4eede`
- **프로젝트 번호**: `353359170848`
- **앱 ID**: `1:353359170848:web:c12edca91eead851179b45`
- **호스팅 사이트**: `fir-delivery-app-4eede`

### 3. 설정된 환경 변수
```env
VITE_FIREBASE_API_KEY=AIzaSyDYfGo2V5WTup8wXPqbfxNaDoEv879QpvE
VITE_FIREBASE_AUTH_DOMAIN=fir-delivery-app-4eede.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fir-delivery-app-4eede
VITE_FIREBASE_STORAGE_BUCKET=fir-delivery-app-4eede.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=353359170848
VITE_FIREBASE_APP_ID=1:353359170848:web:c12edca91eead851179b45
VITE_FIREBASE_MEASUREMENT_ID=G-0800F21YH8
VITE_FIREBASE_VAPID_KEY=BNOSZvwW_NfGHrN_IXZkuLBvcChMcm2OmK2HE7-TLvpgBgbxXEQSfRsVGU5QWE2tzxqXf6WqJUXsP3PFJ5qIJ3U
```

### 4. 업데이트된 파일
- ✅ `src/lib/firebase.ts` - 환경 변수 기반 설정으로 변경
- ✅ `src/vite-env.d.ts` - 환경 변수 타입 정의 추가
- ✅ `.firebaserc` - 프로젝트 ID 업데이트
- ✅ `.env.local` - Firebase 설정 정보 입력

## 🔧 다음 단계

### 1. Firebase 서비스 활성화 확인

Firebase Console에서 다음 서비스들이 활성화되어 있는지 확인하세요:

#### Authentication (인증)
1. Firebase Console > Authentication
2. "시작하기" 클릭 (아직 안 했다면)
3. 사용할 로그인 방법 활성화:
   - 이메일/비밀번호
   - Google (선택사항)
   - 기타 필요한 인증 방법

#### Firestore Database (데이터베이스)
1. Firebase Console > Firestore Database
2. "데이터베이스 만들기" 클릭 (아직 안 했다면)
3. 프로덕션 모드 또는 테스트 모드 선택
4. 위치 선택: **asia-northeast3 (서울)** 권장

#### Storage (파일 저장소)
1. Firebase Console > Storage
2. "시작하기" 클릭 (아직 안 했다면)
3. 보안 규칙 설정

### 2. 개발 서버 실행 및 테스트

```bash
# 개발 서버 시작
npm run dev
```

브라우저 콘솔에서 다음을 확인:
- ✅ Firebase 환경 변수 오류가 없는지
- ✅ Firebase 초기화가 성공했는지
- ✅ Authentication, Firestore, Storage 서비스가 정상 작동하는지

### 3. Firebase CLI 로그인 확인 (배포 시 필요)

```bash
# Firebase CLI 로그인 상태 확인
firebase login:list

# 로그인되어 있지 않다면
firebase login
```

### 4. Firestore 규칙 및 인덱스 설정

프로젝트에 이미 다음 파일들이 있습니다:
- `firestore.rules` - Firestore 보안 규칙
- `src/firestore.indexes.json` - Firestore 인덱스 설정

필요시 Firebase Console에서 확인하고 업데이트하세요.

### 5. Storage 규칙 설정

프로젝트에 `storage.rules` 파일이 있습니다. 필요시 Firebase Console에서 확인하고 업데이트하세요.

## 🚀 배포 준비

배포 전에 확인사항:

1. **Firebase 프로젝트 연결 확인**
   ```bash
   firebase projects:list
   firebase use fir-delivery-app-4eede
   ```

2. **빌드 테스트**
   ```bash
   npm run build
   ```

3. **배포 (준비가 되면)**
   ```bash
   npm run firebase:deploy
   ```

## 📝 참고사항

- `.env.local` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함됨)
- 프로덕션 환경에서는 Firebase Console에서 도메인 제한을 설정하는 것을 권장합니다
- VAPID 키는 푸시 알림(FCM)에 사용됩니다

## 🆘 문제 해결

### 환경 변수가 읽히지 않는 경우
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 개발 서버를 재시작했는지 확인
3. 변수명이 `VITE_`로 시작하는지 확인

### Firebase 초기화 오류
1. 브라우저 콘솔의 오류 메시지 확인
2. Firebase Console에서 프로젝트가 활성화되어 있는지 확인
3. 모든 필수 환경 변수가 설정되었는지 확인

## ✅ 체크리스트

- [x] `.env.local` 파일 생성 및 Firebase 정보 입력
- [x] `src/lib/firebase.ts` 환경 변수 기반으로 수정
- [x] `.firebaserc` 프로젝트 ID 업데이트
- [x] 환경 변수 타입 정의 추가
- [ ] Firebase Console에서 Authentication 활성화
- [ ] Firebase Console에서 Firestore Database 생성
- [ ] Firebase Console에서 Storage 활성화
- [ ] 개발 서버 실행 및 연결 테스트
- [ ] Firestore 규칙 및 인덱스 확인
- [ ] Storage 규칙 확인


```

---

## File: D:\projectsing\S-Delivery-AppV3\FIREBASE_FINAL_VERIFICATION_REPORT.md

```markdown
# Firebase 연동 최종 검증 보고서

**검증 일자**: 2024년 12월  
**프로젝트**: simple-delivery-app-9d347  
**검증자**: AI Assistant

---

## ✅ 검증 결과 요약

**Firebase 연동 상태**: ✅ **완전히 준비됨 및 정상 작동 가능**

모든 필수 구성 요소가 올바르게 설정되어 있으며, 코드 레벨에서 Firebase와의 연동이 완료되었습니다.

---

## 📋 상세 검증 결과

### 1. 환경 변수 설정 ✅

#### 확인된 환경 변수 (실제 .env 파일 검증)

| 환경 변수 | 값 | 상태 | 검증 |
|-----------|-----|------|------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyCKS_ilGLymEaBjdF6oVKPKKkPc2dNCxQU` | ✅ | API Key 형식 정상 (`AIza`로 시작) |
| `VITE_FIREBASE_AUTH_DOMAIN` | `simple-delivery-app-9d347.firebaseapp.com` | ✅ | 도메인 형식 정상 |
| `VITE_FIREBASE_PROJECT_ID` | `simple-delivery-app-9d347` | ✅ | 프로젝트 ID 일치 |
| `VITE_FIREBASE_STORAGE_BUCKET` | `simple-delivery-app-9d347.firebasestorage.app` | ✅ | Storage 버킷 형식 정상 |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `665529206596` | ✅ | 숫자 형식 정상 |
| `VITE_FIREBASE_APP_ID` | `1:665529206596:web:6e5542c21b7fe765a0b911` | ✅ | App ID 형식 정상 |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-FZ74JXV42S` | ✅ | Google Analytics ID (선택) |
| `VITE_FIREBASE_VAPID_KEY` | `BHo92LzMekAkTjyIm7PiChVBw4pQ5dgBsqLtnl013LYGK6Pa14qmo3fHrmWiVFswiYaEdVT_qhjPWCIB2IYU_60` | ✅ | VAPID Key 형식 정상 (선택) |

**검증 결과**: ✅ **모든 필수 환경 변수가 올바르게 설정되어 있습니다.**

---

### 2. Firebase 초기화 코드 ✅

#### `src/lib/firebase.ts` 검증

```typescript
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**검증 항목**:
- ✅ 환경 변수 읽기 로직 정상 (`import.meta.env?.VITE_FIREBASE_*`)
- ✅ Vite 환경 변수 접근 방식 올바름
- ✅ 데모 모드 fallback 제공 (환경 변수 없을 때)
- ✅ 모든 필수 필드 포함
- ✅ 선택적 필드 (measurementId) 올바르게 처리
- ✅ Firebase 서비스 초기화 정상

**초기화된 서비스**:
- ✅ `auth` - Authentication 서비스
- ✅ `db` - Firestore Database 서비스
- ✅ `storage` - Storage 서비스
- ✅ `messaging` - Cloud Messaging 서비스 (선택적, 브라우저 지원 시)

---

### 3. 서비스 레이어 연동 ✅

#### 확인된 서비스 파일들 (8개)

| 서비스 | 파일 경로 | Firestore 경로 | 상태 |
|--------|----------|----------------|------|
| 주문 관리 | `src/services/orderService.ts` | `stores/{storeId}/orders` | ✅ 완료 |
| 메뉴 관리 | `src/services/menuService.ts` | `stores/{storeId}/menus` | ✅ 완료 |
| 쿠폰 관리 | `src/services/couponService.ts` | `stores/{storeId}/coupons` | ✅ 완료 |
| 이벤트 관리 | `src/services/eventService.ts` | `stores/{storeId}/events` | ✅ 완료 |
| 공지사항 | `src/services/noticeService.ts` | `stores/{storeId}/notices` | ✅ 완료 |
| 리뷰 관리 | `src/services/reviewService.ts` | `stores/{storeId}/reviews` | ✅ 완료 |
| 파일 저장소 | `src/services/storageService.ts` | Storage API | ✅ 완료 |
| 사용자 관리 | `src/services/userService.ts` | `users/{userId}` | ✅ 완료 |

**검증 결과**:
- ✅ 모든 서비스가 `storeId`를 매개변수로 받아 멀티 테넌트 지원
- ✅ `stores/{storeId}/` 하위 컬렉션 구조 일관성 있게 사용
- ✅ Query 헬퍼 함수들 (`getAllOrdersQuery`, `getAllMenusQuery` 등) 구현 완료
- ✅ CRUD 작업 모두 Firestore 연동 완료
- ✅ 에러 처리 로직 포함

---

### 4. 데이터 구조 검증 ✅

#### Firestore 경로 구조

```
stores/
  └── {storeId}/          # 현재는 'default' 사용
      ├── menus/          # 메뉴 컬렉션
      ├── orders/         # 주문 컬렉션
      ├── coupons/        # 쿠폰 컬렉션
      ├── couponUsages/   # 쿠폰 사용 내역
      ├── reviews/        # 리뷰 컬렉션
      ├── notices/        # 공지사항 컬렉션
      └── events/         # 이벤트 컬렉션

users/
  └── {userId}/           # 사용자 문서

admins/
  └── {userId}/           # 관리자 문서

adminStores/
  └── {adminStoreId}/     # 관리자-상점 매핑
```

**검증 결과**:
- ✅ 멀티 테넌트 구조 정상 구현
- ✅ 모든 서비스가 올바른 경로 사용
- ✅ 데이터 격리 구조 일관성 유지

---

### 5. 보안 규칙 검증 ✅

#### Firestore 보안 규칙

**파일**: `src/firestore.rules` (179줄)

**주요 기능**:
- ✅ 인증된 사용자만 접근 가능 (`isAuthenticated()`)
- ✅ 시스템 관리자 권한 체크 (`isSystemAdmin()` - `admins` 컬렉션)
- ✅ 상점 관리자 권한 체크 (`isStoreAdmin()`, `isStoreOwner()` - `adminStores` 컬렉션)
- ✅ 멀티 테넌트 데이터 격리 (상점별 접근 제어)
- ✅ 사용자별 데이터 소유권 확인
- ✅ 컬렉션별 세밀한 권한 제어 (읽기/쓰기/삭제)

**보호되는 컬렉션**: 11개 컬렉션에 대한 보안 규칙 정의

#### Storage 보안 규칙

**파일**: `storage.rules` (34줄)

**주요 기능**:
- ✅ 기본적으로 모든 접근 거부
- ✅ 인증된 사용자만 이미지 업로드 가능
- ✅ 프로필 이미지는 본인만 업로드 가능
- ✅ 상점/메뉴/이벤트 이미지는 인증된 사용자만 업로드

**⚠️ 주의**: 보안 규칙이 Firebase Console에 배포되어 있는지 확인 필요

---

### 6. 훅 및 유틸리티 검증 ✅

#### 확인된 훅들

| 훅 | 파일 경로 | 기능 | 상태 |
|----|----------|------|------|
| `useFirestoreCollection` | `src/hooks/useFirestoreCollection.ts` | 컬렉션 실시간 구독 | ✅ 완료 |
| `useFirestoreDocument` | `src/hooks/useFirestoreDocument.ts` | 문서 실시간 구독 | ✅ 완료 |
| `useFirebaseAuth` | `src/hooks/useFirebaseAuth.ts` | 인증 상태 관리 | ✅ 완료 |
| `useIsAdmin` | `src/hooks/useIsAdmin.ts` | 관리자 권한 확인 | ✅ 완료 |

**검증 결과**:
- ✅ 실시간 구독 (onSnapshot) 지원
- ✅ 로딩 상태 관리 (`loading` 상태)
- ✅ 에러 처리 (`error` 상태)
- ✅ 쿼리 최적화 (queryEqual로 중복 구독 방지)
- ✅ 타입 안정성 (TypeScript 제네릭 사용)

---

### 7. Vite 설정 검증 ✅

#### `vite.config.ts` 확인

- ✅ React 플러그인 설정 정상
- ✅ 경로 별칭 설정 정상
- ✅ 빌드 설정 정상
- ✅ 서버 설정 정상 (포트 3000)

**환경 변수 처리**:
- ✅ Vite는 자동으로 `VITE_` 접두사가 있는 환경 변수를 `import.meta.env`에 주입
- ✅ `.env` 파일이 프로젝트 루트에 존재
- ✅ 환경 변수 접근 방식 (`import.meta.env?.VITE_FIREBASE_*`) 올바름

---

## ⚠️ 발견된 사항 및 권장 조치

### 1. StoreContext의 하드코딩 (정보성)

**위치**: `src/contexts/StoreContext.tsx:32`

```typescript
const storeRef = doc(db, 'stores', 'default');
```

**상태**: ⚠️ 현재는 의도된 동작 (단일 상점 모드)

**설명**:
- 현재 프로젝트는 단일 상점 모드로 설계됨
- `'default'` 하드코딩은 의도된 동작
- 향후 다중 상점 지원 시 동적 storeId 선택 로직 추가 필요

**권장 조치**: 
- 현재는 유지 (단일 상점 모드)
- 향후 다중 상점 지원 시 수정

---

### 2. 보안 규칙 배포 확인 필요

**상태**: ⚠️ 확인 필요

**설명**:
- 보안 규칙 파일은 존재하지만 Firebase Console에 배포되었는지 확인 필요
- 배포되지 않은 경우 기본 규칙(모든 접근 거부 또는 테스트 모드)이 적용될 수 있음

**권장 조치**:
```bash
# Firebase CLI로 배포
firebase deploy --only firestore:rules,storage
```

또는 Firebase Console에서:
1. Firestore Database > 규칙 탭 > `src/firestore.rules` 내용 복사/붙여넣기 > 게시
2. Storage > 규칙 탭 > `storage.rules` 내용 복사/붙여넣기 > 게시

---

## 🧪 실제 연결 테스트 방법

### 방법 1: 개발 서버 실행 (권장)

```bash
npm run dev
```

**테스트 항목**:
1. 브라우저에서 `http://localhost:3000` 접속
2. 회원가입/로그인 테스트
3. Firebase Console > Authentication에서 사용자 확인
4. 관리자 페이지에서 메뉴 추가
5. Firestore Database에서 데이터 확인

### 방법 2: Firebase Console 확인

1. [Firebase Console](https://console.firebase.google.com) 접속
2. 프로젝트 `simple-delivery-app-9d347` 선택
3. 다음 항목 확인:
   - **Authentication** > 사용자 목록
   - **Firestore Database** > 데이터 탭
   - **Storage** > 파일 탭
   - **Firestore Database** > 규칙 탭 (보안 규칙 배포 확인)
   - **Storage** > 규칙 탭 (보안 규칙 배포 확인)

### 방법 3: 브라우저 개발자 도구 확인

개발 서버 실행 후 브라우저 콘솔에서:

```javascript
// Firebase 초기화 확인 (간접적)
// 실제 API 호출이 작동하는지 확인
// 네트워크 탭에서 Firebase API 호출 확인
```

---

## 📊 최종 검증 체크리스트

### 필수 항목

- [x] ✅ 환경 변수 설정 완료 (8개 모두 설정됨)
- [x] ✅ Firebase 초기화 코드 정상
- [x] ✅ 모든 Firebase 서비스 초기화 완료
- [x] ✅ 서비스 레이어 연동 완료 (8개 서비스)
- [x] ✅ 데이터 구조 정상 (멀티 테넌트)
- [x] ✅ 보안 규칙 파일 존재
- [x] ✅ 훅 및 유틸리티 구현 완료
- [ ] ⚠️ 보안 규칙 배포 확인 필요 (Firebase Console에서 확인)

### 선택 항목

- [x] ✅ Google Analytics 설정 (Measurement ID)
- [x] ✅ Cloud Messaging 설정 (VAPID Key)

---

## 🎯 결론

### Firebase 연동 상태: ✅ **완전히 준비됨**

**검증 결과**:
- ✅ 모든 필수 구성 요소가 올바르게 설정됨
- ✅ 코드 레벨에서 Firebase와의 연동 완료
- ✅ 환경 변수 모두 올바른 형식으로 설정됨
- ✅ 서비스 레이어 완전히 구현됨
- ✅ 보안 규칙 파일 준비 완료

**다음 단계**:
1. ✅ 개발 서버 실행: `npm run dev`
2. ⚠️ 보안 규칙 배포 확인 (Firebase Console)
3. ✅ 실제 기능 테스트 (회원가입, 로그인, 데이터 CRUD)
4. ✅ 관리자 계정 설정 (Firestore에 `admins` 문서 생성)

**예상 결과**: 
- 개발 서버 실행 시 Firebase에 정상적으로 연결됨
- 모든 기능이 실제 Firebase 데이터베이스와 연동되어 작동함

---

## 📝 추가 정보

### 프로젝트 정보

- **프로젝트 ID**: `simple-delivery-app-9d347`
- **프로젝트 번호**: `665529206596`
- **앱 ID**: `1:665529206596:web:6e5542c21b7fe765a0b911`
- **호스팅 사이트**: `simple-delivery-app-9d347`

### 참고 문서

- `FIREBASE_SETUP_GUIDE.md` - 상세 설정 가이드
- `FIREBASE_CHECKLIST.md` - 단계별 체크리스트
- `FIREBASE_CONFIG.md` - 설정 정보
- `FIREBASE_CONNECTION_STATUS_REPORT.md` - 이전 검증 보고서

---

**검증 완료일**: 2024년 12월  
**검증 상태**: ✅ **통과**  
**다음 단계**: 개발 서버 실행 및 실제 기능 테스트


```

---

## File: D:\projectsing\S-Delivery-AppV3\firestore.rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check admin privileges
    function isAuthorizedAdmin() {
      return request.auth != null && (
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) || 
        exists(/databases/$(database)/documents/adminStores/$(request.auth.uid + '_default')) ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
    }

    // =========================================================================
    // 1. PUBLIC DATA (공개 데이터)
    // =========================================================================
    
    // 상점 정보
    match /stores/{storeId} {
      allow read: if true;
      allow write: if isAuthorizedAdmin();
      
      // 메뉴
      match /menus/{menuId} {
        allow read: if true;
        allow write: if isAuthorizedAdmin();
      }
      
      // 공지사항
      match /notices/{noticeId} {
        allow read: if true;
        allow write: if isAuthorizedAdmin();
      }
      
      // 이벤트
      match /events/{eventId} {
        allow read: if true;
        allow write: if isAuthorizedAdmin();
      }
      
      match /reviews/{reviewId} {
        allow read: if true;
        allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
        allow update, delete: if isAuthorizedAdmin() || (request.auth != null && resource.data.userId == request.auth.uid);
      }
      
      // 주문 (본인만)
      match /orders/{orderId} {
         allow read: if request.auth != null && (resource.data.userId == request.auth.uid || isAuthorizedAdmin());
         allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
         allow update: if isAuthorizedAdmin() || (
           request.auth != null && 
           resource.data.userId == request.auth.uid && 
           request.resource.data.diff(resource.data).affectedKeys().hasOnly(['reviewed', 'reviewText', 'reviewRating', 'reviewedAt', 'updatedAt'])
         );
         allow delete: if isAuthorizedAdmin(); // 삭제 기능 추가
      }
      
      // 쿠폰 (읽기는 공개, 생성/삭제는 관리자, 수정은 사용 처리 위해 로그인 유저 허용)
      match /coupons/{couponId} {
        allow read: if true;
        allow create, delete: if isAuthorizedAdmin();
        allow update: if isAuthorizedAdmin() || request.auth != null;
      }
    }

    // =========================================================================
    // 2. USER DATA (사용자 데이터)
    // =========================================================================
    
    // 사용자 프로필
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || isAuthorizedAdmin());
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 시스템 관리자 목록
    match /admins/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }
    
    // 관리자-상점 매핑
    match /adminStores/{docId} {
      allow read: if request.auth != null && docId.matches('^' + request.auth.uid + '_.*');
      allow write: if false;
    }

    // =========================================================================
    // 3. SYSTEM ADMIN (시스템 관리자)
    // =========================================================================
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\functions\package.json

```json
{
    "name": "functions",
    "scripts": {
        "build": "tsc",
        "serve": "firebase emulators:start --only functions",
        "shell": "firebase functions:shell",
        "start": "npm run shell",
        "deploy": "firebase deploy --only functions",
        "logs": "firebase functions:log"
    },
    "engines": {
        "node": "22"
    },
    "main": "lib/index.js",
    "dependencies": {
        "firebase-admin": "^11.8.0",
        "firebase-functions": "^4.4.1"
    },
    "devDependencies": {
        "typescript": "^4.9.0"
    },
    "private": true
}
```

---

## File: D:\projectsing\S-Delivery-AppV3\functions\src\scheduled\statsDailyV3.ts

```typescript
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { getYesterdayKSTRange } from "../utils/dateKST";

// types (simplified)
interface OrderItem {
    menuId: string;
    name: string;
    price: number;
    quantity: number;
    options?: { price: number; quantity?: number }[];
}
interface Order {
    id: string;
    status: string;
    totalPrice: number;
    items: OrderItem[];
    createdAt: admin.firestore.Timestamp;
}

export const statsDailyV3 = onSchedule({
    schedule: "10 0 * * *", // Every day at 00:10 (Default timezone is often UTC, but usually configured to project region. We'll assume UTC if not specified, 00:10 UTC is 09:10 KST. Wait, user said 00:10 KST. If region is not set, crontab might be UTC. 
    // Better: "every day 00:10" and set region or use explicit timezone if supported by v2.
    // V2 supports timeZone.
    timeZone: "Asia/Seoul",
    region: "asia-northeast3", // Seoul region
}, async (event) => {
    const db = admin.firestore();
    const { startKST, endKST, dateKey } = getYesterdayKSTRange();

    console.log(`[statsDailyV3] Starting aggregation for ${dateKey} (KST)`);

    try {
        const storesSnap = await db.collection("stores").get();
        const batchHandler = new BatchHandler(db);

        for (const storeDoc of storesSnap.docs) {
            const storeId = storeDoc.id;

            // Query Orders
            const ordersRef = db.collection("stores").doc(storeId).collection("orders");
            const ordersSnap = await ordersRef
                .where("createdAt", ">=", startKST)
                .where("createdAt", "<=", endKST)
                .get();

            if (ordersSnap.empty) {
                console.log(`[${storeId}] No orders for ${dateKey}`);
                continue;
            }

            // Aggregation Logic
            let ordersTotal = 0;
            let ordersPaid = 0;
            let ordersCanceled = 0;
            let grossSales = 0;
            const menuStatsMap = new Map<string, { name: string; qty: number; sales: number }>();

            for (const doc of ordersSnap.docs) {
                const order = doc.data() as Order;

                if (order.status === '결제대기') continue; // exclude pending

                ordersTotal++;

                if (order.status === '취소') {
                    ordersCanceled++;
                } else {
                    // Paid/Valid (접수, 배달중, 완료 etc)
                    ordersPaid++;
                    grossSales += (order.totalPrice || 0);

                    // Menu Stats
                    if (order.items) {
                        order.items.forEach(item => {
                            const itemTotalFn = (item.price + (item.options?.reduce((s, o) => s + (o.price * (o.quantity || 1)), 0) || 0)) * item.quantity;
                            const current = menuStatsMap.get(item.menuId) || { name: item.name, qty: 0, sales: 0 };
                            current.qty += item.quantity;
                            current.sales += itemTotalFn;
                            menuStatsMap.set(item.menuId, current);
                        });
                    }
                }
            }

            const avgOrderValue = ordersPaid > 0 ? Math.round(grossSales / ordersPaid) : 0;
            const cancelRate = (ordersPaid + ordersCanceled) > 0
                ? parseFloat((ordersCanceled / (ordersPaid + ordersCanceled)).toFixed(4))
                : 0;

            // Top Menus
            const topMenus = Array.from(menuStatsMap.entries())
                .map(([menuId, stats]) => ({ menuId, ...stats }))
                .sort((a, b) => b.qty - a.qty) // Sort by Quantity
                .slice(0, 5);

            const statsDoc = {
                dateKey,
                ordersTotal,
                ordersPaid,
                ordersCanceled,
                grossSales,
                avgOrderValue,
                cancelRate,
                topMenus,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            // Save to subcollection
            const statsRef = db.collection("stores").doc(storeId).collection("stats_daily").doc(dateKey);
            await batchHandler.set(statsRef, statsDoc);

            console.log(`[${storeId}] Stats computed: Paid=${ordersPaid}, Sales=${grossSales}`);
        }

        await batchHandler.commit(); // Final commit
        console.log(`[statsDailyV3] Completed for ${dateKey}`);

    } catch (error) {
        console.error("[statsDailyV3] Error:", error);
    }
});

// Simple Helper for Batches (Firestore limit 500)
class BatchHandler {
    private batch: admin.firestore.WriteBatch;
    private count = 0;
    private db: admin.firestore.Firestore;

    constructor(db: admin.firestore.Firestore) {
        this.db = db;
        this.batch = db.batch();
    }

    async set(ref: admin.firestore.DocumentReference, data: any) {
        this.batch.set(ref, data, { merge: true });
        this.count++;
        if (this.count >= 490) {
            await this.commit();
        }
    }

    async commit() {
        if (this.count > 0) {
            await this.batch.commit();
            this.batch = this.db.batch();
            this.count = 0;
        }
    }
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\generated-code-complete\07-Components-Common-UI.md

```markdown
# 07-Components-Common-UI

Files: 57

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\AddressSearchInput.tsx

Size: 2.16 KB

```
import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import AddressSearchModal from './AddressSearchModal';

interface AddressSearchInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string; // Wrapper className
    inputClassName?: string;
}

export default function AddressSearchInput({
    label,
    value,
    onChange,
    placeholder = '주소를 검색해주세요',
    required,
    className,
    inputClassName
}: AddressSearchInputProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className={`relative ${className || ''}`}>
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <Input
                        label={label}
                        value={value}
                        readOnly
                        onClick={() => setIsSearchOpen(true)}
                        placeholder={placeholder}
                        required={required}
                        className={`cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${inputClassName || ''}`}
                    />
                </div>
                <div className={label ? 'mb-[2px]' : ''}> {/* Align with input box if label exists */}
                    <Button
                        type="button"
                        onClick={() => setIsSearchOpen(true)}
                        variant="outline"
                        className="whitespace-nowrap h-[42px]"
                    >
                        <Search className="w-4 h-4 mr-1" />
                        검색
                    </Button>
                </div>
            </div>

            {isSearchOpen && (
                <AddressSearchModal
                    onClose={() => setIsSearchOpen(false)}
                    onComplete={(address) => {
                        onChange(address);
                    }}
                />
            )}
        </div>
    );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\AddressSearchModal.tsx

Size: 2.15 KB

```
import DaumPostcodeEmbed from 'react-daum-postcode';
import { X } from 'lucide-react';

interface AddressSearchModalProps {
    onComplete: (address: string) => void;
    onClose: () => void;
}

export default function AddressSearchModal({ onComplete, onClose }: AddressSearchModalProps) {
    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        onComplete(fullAddress);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
                style={{ height: '550px', display: 'flex', flexDirection: 'column' }}
            >
                <div className="flex justify-between items-center p-4 border-b bg-gray-50 flex-shrink-0">
                    <h3 className="text-lg font-bold text-gray-900">주소 검색</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="flex-1 w-full relative">
                    <DaumPostcodeEmbed
                        onComplete={handleComplete}
                        style={{ width: '100%', height: '100%' }}
                        autoClose={false}
                    />
                </div>
            </div>
        </div>
    );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\Badge.tsx

Size: 1.06 KB

```
import { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export default function Badge({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-orange-100 text-orange-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\Button.tsx

Size: 1.76 KB

```
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'gradient-primary text-white hover:shadow-lg hover:scale-[1.02] focus:ring-primary-500',
    secondary: 'gradient-secondary text-white hover:shadow-lg hover:scale-[1.02] focus:ring-orange-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          처리중...
        </>
      ) : (
        children
      )}
    </button>
  );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\Card.tsx

Size: 0.67 KB

```
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export default function Card({
  hover = false,
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\ImageUpload.tsx

Size: 5 KB

```
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadMenuImage, validateImageFile } from '../../services/storageService';
import { toast } from 'sonner';

interface ImageUploadProps {
  label?: string;
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  // Optional specific props
  menuId?: string;
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<string>;
  aspectRatio?: 'square' | 'wide' | 'standard'; // square=1:1, wide=16:9, standard=4:3
  circle?: boolean; // For profile/logo images
  defaultImage?: string; // Fallback or initial image
}

export default function ImageUpload({
  label = '이미지',
  currentImageUrl,
  onImageUploaded,
  menuId,
  onUpload,
  aspectRatio = 'standard',
  circle = false,
  defaultImage
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl || defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAspectRatioClass = () => {
    if (circle) return 'aspect-square rounded-full';
    switch (aspectRatio) {
      case 'square': return 'aspect-square rounded-lg';
      case 'wide': return 'aspect-[16/9] rounded-lg';
      case 'standard': default: return 'aspect-[4/3] rounded-lg';
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 업로드 실행
    setUploading(true);
    try {
      let downloadURL = '';

      if (onUpload) {
        // 커스텀 업로드 함수 사용
        downloadURL = await onUpload(file, (p) => setProgress(p));
      } else if (menuId) {
        // 기존 메뉴 이미지 업로드 (하위 호환)
        downloadURL = await uploadMenuImage(file, menuId, (p) => setProgress(p));
      } else {
        throw new Error('Upload handler is missing');
      }

      onImageUploaded(downloadURL);
      toast.success('이미지가 업로드되었습니다');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      toast.error('이미지 업로드에 실패했습니다');
      setPreviewUrl(currentImageUrl || defaultImage);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(undefined);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative w-full">
        {previewUrl ? (
          <div className={`relative overflow-hidden bg-gray-100 border-2 border-gray-200 ${getAspectRatioClass()}`}>
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-full h-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p>{Math.round(progress)}%</p>
                </div>
              </div>
            )}
            {!uploading && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md transform hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`w-full border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 ${getAspectRatioClass()}`}
          >
            <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm font-medium">이미지 업로드</p>
            <p className="text-xs mt-1 text-gray-400">JPG, PNG, WebP (최대 5MB)</p>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\Input.tsx

Size: 1.45 KB

```
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 
              ${icon ? 'pl-10' : ''} 
              text-gray-900 bg-white 
              border rounded-lg 
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} 
              focus:ring-2 focus:border-transparent 
              transition-all duration-200 
              placeholder:text-gray-400
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\NotificationGuide.tsx

Size: 2.8 KB

```
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import Button from './Button';

const STORAGE_KEY = 'notification_guide_dismissed';

export default function NotificationGuide() {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // 브라우저가 알림을 지원하지 않으면 표시하지 않음
    if (!('Notification' in window)) {
      return;
    }

    // 이미 dismiss 했으면 표시하지 않음
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed === 'true') {
      return;
    }

    // 현재 권한 상태 확인
    setPermission(Notification.permission);

    // 권한이 default일 때만 배너 표시
    if (Notification.permission === 'default') {
      setShow(true);
    }
  }, []);

  const handleRequestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        setShow(false);
        localStorage.setItem(STORAGE_KEY, 'true');
      } else if (result === 'denied') {
        setShow(false);
        localStorage.setItem(STORAGE_KEY, 'true');
      }
    } catch (error) {
      console.error('알림 권한 요청 실패:', error);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg animate-slide-down">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">주문 알림을 받으시겠습니까?</p>
              <p className="text-sm text-blue-100">주문 상태가 변경되면 실시간으로 알려드립니다</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRequestPermission}
              variant="outline"
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-50 border-0"
            >
              허용
            </Button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\common\TopBar.tsx

Size: 6.57 KB

```
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Store, Menu, X, Bell, Gift, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';

export default function TopBar() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { store } = useStore();
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackLogo = '/assets/brands/onjok/logo.png';
  const logoSrc = store?.logoUrl || fallbackLogo;

  const cartItemsCount = getTotalItems();

  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃되었습니다');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            {!imgError && logoSrc ? (
              <img
                src={logoSrc}
                alt={store?.name || '온족'}
                onError={() => setImgError(true)}
                className="w-10 h-10 rounded-xl object-cover border border-gray-100 shadow-sm transform group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white text-xl">🍜</span>
              </div>
            )}
            <span className="text-lg font-bold text-primary-600 max-w-[160px] leading-tight text-left line-clamp-2">
              {store?.name || '배달앱'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/menu" icon={null}>메뉴</NavLink>
            <NavLink to="/events" icon={<Gift className="w-4 h-4" />}>이벤트</NavLink>
            <NavLink to="/reviews" icon={<MessageSquare className="w-4 h-4" />}>리뷰 게시판</NavLink>
            <NavLink to="/notices" icon={<Bell className="w-4 h-4" />}>공지사항</NavLink>
            <NavLink to="/orders" icon={null}>내 주문</NavLink>
            <NavLink to="/cart" icon={<ShoppingCart className="w-4 h-4" />} badge={cartItemsCount}>
              장바구니
            </NavLink>
            <NavLink to="/mypage" icon={<User className="w-4 h-4" />}>마이페이지</NavLink>
            {isAdmin && (
              <NavLink to="/admin" icon={<Store className="w-4 h-4" />}>
                관리자
              </NavLink>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-full">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{user?.displayName || user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">로그아웃</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 animate-slide-up">
            <MobileNavLink to="/menu" onClick={() => setMobileMenuOpen(false)}>
              메뉴
            </MobileNavLink>
            <MobileNavLink to="/events" onClick={() => setMobileMenuOpen(false)}>
              이벤트
            </MobileNavLink>
            <MobileNavLink to="/reviews" onClick={() => setMobileMenuOpen(false)}>
              리뷰 게시판
            </MobileNavLink>
            <MobileNavLink to="/notices" onClick={() => setMobileMenuOpen(false)}>
              공지사항
            </MobileNavLink>
            <MobileNavLink to="/orders" onClick={() => setMobileMenuOpen(false)}>
              내 주문
            </MobileNavLink>
            <MobileNavLink to="/cart" onClick={() => setMobileMenuOpen(false)} badge={cartItemsCount}>
              장바구니
            </MobileNavLink>
            <MobileNavLink to="/mypage" onClick={() => setMobileMenuOpen(false)}>
              마이페이지
            </MobileNavLink>
            {isAdmin && (
              <MobileNavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                관리자
              </MobileNavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, icon, badge, children }: { to: string; icon?: React.ReactNode; badge?: number; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
    >
      {icon}
      <span>{children}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] text-white gradient-primary rounded-full">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
}

function MobileNavLink({ to, badge, onClick, children }: { to: string; badge?: number; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <span>{children}</span>
      {badge !== undefined && badge > 0 && (
        <span className="flex items-center justify-center min-w-[24px] h-6 px-2 text-xs text-white gradient-primary rounded-full">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
}
```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\accordion.tsx

Size: 2.03 KB

```
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\alert.tsx

Size: 1.59 KB

```
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\alert-dialog.tsx

Size: 3.78 KB

```
"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog@1.1.6";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\aspect-ratio.tsx

Size: 0.28 KB

```
"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\avatar.tsx

Size: 1.08 KB

```
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";

import { cn } from "./utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\badge.tsx

Size: 1.61 KB

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\breadcrumb.tsx

Size: 2.33 KB

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { ChevronRight, MoreHorizontal } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\button.tsx

Size: 2.07 KB

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\calendar.tsx

Size: 2.86 KB

```
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\card.tsx

Size: 1.94 KB

```
import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\carousel.tsx

Size: 5.49 KB

```
"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react@8.6.0";
import { ArrowLeft, ArrowRight } from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\chart.tsx

Size: 9.63 KB

```
"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts@2.15.2";

import { cn } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\checkbox.tsx

Size: 1.23 KB

```
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\collapsible.tsx

Size: 0.79 KB

```
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\command.tsx

Size: 4.57 KB

```
"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk@1.1.1";
import { SearchIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\context-menu.tsx

Size: 8.07 KB

```
"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu@2.2.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\dialog.tsx

Size: 3.75 KB

```
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\drawer.tsx

Size: 4 KB

```
"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul@1.1.2";

import { cn } from "./utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\dropdown-menu.tsx

Size: 8.13 KB

```
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu@2.1.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\form.tsx

Size: 3.71 KB

```
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form@7.55.0";

import { cn } from "./utils";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\hover-card.tsx

Size: 1.51 KB

```
"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card@1.1.6";

import { cn } from "./utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\input.tsx

Size: 0.94 KB

```
import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\input-otp.tsx

Size: 2.24 KB

```
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp@1.4.2";
import { MinusIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\label.tsx

Size: 0.61 KB

```
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\menubar.tsx

Size: 8.24 KB

```
"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar@1.1.6";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\navigation-menu.tsx

Size: 6.55 KB

```
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu@1.2.5";
import { cva } from "class-variance-authority@0.7.1";
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\pagination.tsx

Size: 2.65 KB

```
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\popover.tsx

Size: 1.61 KB

```
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover@1.1.6";

import { cn } from "./utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\progress.tsx

Size: 0.73 KB

```
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\radio-group.tsx

Size: 1.45 KB

```
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group@1.2.3";
import { CircleIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\resizable.tsx

Size: 2 KB

```
"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react@0.487.0";
import * as ResizablePrimitive from "react-resizable-panels@2.1.7";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\scroll-area.tsx

Size: 1.62 KB

```
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area@1.2.3";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\select.tsx

Size: 6.14 KB

```
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select@2.1.6";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\separator.tsx

Size: 0.7 KB

```
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator@1.1.2";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\sheet.tsx

Size: 4.02 KB

```
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\sidebar.tsx

Size: 21.17 KB

```
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { VariantProps, cva } from "class-variance-authority@0.7.1";
import { PanelLeftIcon } from "lucide-react@0.487.0";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\skeleton.tsx

Size: 0.27 KB

```
import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\slider.tsx

Size: 1.96 KB

```
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider@1.2.3";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\sonner.tsx

Size: 0.57 KB

```
"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\switch.tsx

Size: 1.16 KB

```
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\table.tsx

Size: 2.4 KB

```
"use client";

import * as React from "react";

import { cn } from "./utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\tabs.tsx

Size: 1.91 KB

```
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\textarea.tsx

Size: 0.75 KB

```
import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\toggle.tsx

Size: 1.54 KB

```
"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\toggle-group.tsx

Size: 1.89 KB

```
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group@1.1.2";
import { type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\tooltip.tsx

Size: 1.86 KB

```
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip@1.1.8";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\use-mobile.ts

Size: 0.57 KB

```
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\components\ui\utils.ts

Size: 0.17 KB

```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---


```

---

## File: D:\projectsing\S-Delivery-AppV3\generated-code-complete\11-Data-Constants.md

```markdown
# 11-Data-Constants

Files: 4

---

## D:\projectsing\S-Delivery-AppV3\src\data\mockCoupons.ts

Size: 1.1 KB

```
import { Coupon } from '../types/coupon';

export const mockCoupons: Coupon[] = [
  {
    id: 'coupon-1',
    code: 'WELCOME2024',
    name: '신규 가입 환영 쿠폰',
    discountType: 'fixed',
    discountValue: 3000,
    minOrderAmount: 15000,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    isActive: true,
    createdAt: new Date('2024-01-01'),
    isUsed: false,
  },
  {
    id: 'coupon-2',
    code: 'PERCEN10',
    name: '10% 할인 쿠폰',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 20000,
    maxDiscountAmount: 5000,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2024-12-31'),
    isActive: true,
    createdAt: new Date('2024-01-15'),
    isUsed: false,
  },
  {
    id: 'coupon-3',
    code: 'BIGDEAL',
    name: '대박 할인 5000원',
    discountType: 'fixed',
    discountValue: 5000,
    minOrderAmount: 30000,
    validFrom: new Date('2024-06-01'),
    validUntil: new Date('2024-06-30'),
    isActive: false,
    createdAt: new Date('2024-05-20'),
    isUsed: true,
    usedAt: new Date('2024-06-15'),
  },
];
```

---

## D:\projectsing\S-Delivery-AppV3\src\data\mockMenus.ts

Size: 4.32 KB

```
import { Menu } from '../types/menu';

export const mockMenus: Menu[] = [
  {
    id: '1',
    name: '소고기 쌀국수',
    price: 9500,
    category: ['인기메뉴', '기본메뉴'],
    description: '부드러운 소고기와 신선한 야채가 들어간 정통 베트남 쌀국수입니다. 진한 육수가 일품입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80',
    soldout: false,
    options: [
      { id: 'opt1', name: '면 추가', price: 2000 },
      { id: 'opt2', name: '고기 추가', price: 3000 },
      { id: 'opt3', name: '야채 추가', price: 1500 },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: '해물 쌀국수',
    price: 11000,
    category: ['인기메뉴', '추천메뉴'],
    description: '신선한 새우, 오징어, 조개가 듬뿍 들어간 푸짐한 해물 쌀국수입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
    soldout: false,
    options: [
      { id: 'opt1', name: '면 추가', price: 2000 },
      { id: 'opt4', name: '해물 추가', price: 4000 },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: '닭고기 쌀국수',
    price: 8500,
    category: ['기본메뉴'],
    description: '담백한 닭고기로 만든 건강한 쌀국수입니다. 깔끔한 맛을 원하시는 분께 추천합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800&q=80',
    soldout: false,
    options: [
      { id: 'opt1', name: '면 추가', price: 2000 },
      { id: 'opt5', name: '닭고기 추가', price: 2500 },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: '베지테리언 쌀국수',
    price: 8000,
    category: ['기본메뉴', '추천메뉴'],
    description: '신선한 야채만으로 만든 건강한 채식 쌀국수입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    soldout: false,
    options: [
      { id: 'opt1', name: '면 추가', price: 2000 },
      { id: 'opt3', name: '야채 추가', price: 1500 },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: '월남쌈',
    price: 7000,
    category: ['사이드메뉴', '인기메뉴'],
    description: '신선한 야채와 새우를 라이스 페이퍼로 감싼 건강한 월남쌈입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1559054663-e8fbaa5b6c53?w=800&q=80',
    soldout: false,
    options: [],
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '6',
    name: '분짜',
    price: 10000,
    category: ['기본메뉴'],
    description: '숯불에 구운 돼지고기와 쌀국수를 특제 소스에 찍어 먹는 베트남 요리입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80',
    soldout: false,
    options: [
      { id: 'opt6', name: '돼지고기 추가', price: 3000 },
    ],
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '7',
    name: '짜조',
    price: 6000,
    category: ['사이드메뉴'],
    description: '바삭하게 튀긴 베트남식 스프링롤입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
    soldout: false,
    options: [],
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '8',
    name: '베트남 커피',
    price: 4500,
    category: ['음료', '인기메뉴'],
    description: '진한 베트남식 연유 커피입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80',
    soldout: false,
    options: [
      { id: 'opt7', name: '아이스', price: 500 },
    ],
    createdAt: new Date('2024-01-03'),
  },
  {
    id: '9',
    name: '코코넛 주스',
    price: 3500,
    category: ['음료'],
    description: '신선한 코코넛 주스입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1608023136037-626dad6c6188?w=800&q=80',
    soldout: false,
    options: [],
    createdAt: new Date('2024-01-03'),
  },
  {
    id: '10',
    name: '사이공 맥주',
    price: 5000,
    category: ['주류'],
    description: '베트남 대표 맥주 사이공입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80',
    soldout: false,
    options: [],
    createdAt: new Date('2024-01-03'),
  },
];

```

---

## D:\projectsing\S-Delivery-AppV3\src\data\mockOrders.ts

Size: 2.04 KB

```
import { Order } from '../types/order';

// This would be replaced with actual Firestore/Supabase data
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      {
        menuId: '1',
        name: '소고기 쌀국수',
        price: 9500,
        quantity: 2,
        options: [{ name: '면 추가', price: 2000 }],
        imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80',
      },
      {
        menuId: '8',
        name: '베트남 커피',
        price: 4500,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80',
      },
    ],
    totalPrice: 29500,
    status: '배달중',
    address: '서울시 강남구 테헤란로 123',
    phone: '010-1234-5678',
    memo: '문 앞에 놔주세요',
    paymentType: '앱결제',
    createdAt: new Date('2024-12-04T12:30:00'),
  },
  {
    id: 'order-2',
    userId: 'user-1',
    items: [
      {
        menuId: '2',
        name: '해물 쌀국수',
        price: 11000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
      },
    ],
    totalPrice: 14000,
    status: '완료',
    address: '서울시 강남구 테헤란로 123',
    phone: '010-1234-5678',
    paymentType: '만나서카드',
    createdAt: new Date('2024-12-03T18:20:00'),
  },
  {
    id: 'order-3',
    userId: 'user-1',
    items: [
      {
        menuId: '5',
        name: '월남쌈',
        price: 7000,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1559054663-e8fbaa5b6c53?w=800&q=80',
      },
      {
        menuId: '7',
        name: '짜조',
        price: 6000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
      },
    ],
    totalPrice: 23000,
    status: '완료',
    address: '서울시 강남구 테헤란로 123',
    phone: '010-1234-5678',
    paymentType: '만나서현금',
    createdAt: new Date('2024-12-01T19:45:00'),
  },
];

```

---

## D:\projectsing\S-Delivery-AppV3\src\data\mockUsers.ts

Size: 1.3 KB

```
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
}

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'user@demo.com',
    name: '김민수',
    phone: '010-1234-5678',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    email: 'hong@example.com',
    name: '홍길동',
    phone: '010-2345-6789',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'user-3',
    email: 'park@example.com',
    name: '박영희',
    phone: '010-3456-7890',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'user-4',
    email: 'lee@example.com',
    name: '이철수',
    phone: '010-4567-8901',
    createdAt: new Date('2024-04-05'),
  },
  {
    id: 'user-5',
    email: 'choi@example.com',
    name: '최수진',
    phone: '010-5678-9012',
    createdAt: new Date('2024-05-12'),
  },
  {
    id: 'user-6',
    email: 'kang@example.com',
    name: '강민지',
    phone: '010-6789-0123',
    createdAt: new Date('2024-06-18'),
  },
  {
    id: 'user-7',
    email: 'yoon@example.com',
    name: '윤서준',
    phone: '010-7890-1234',
    createdAt: new Date('2024-07-22'),
  },
  {
    id: 'user-8',
    email: 'jung@example.com',
    name: '정다은',
    phone: '010-8901-2345',
    createdAt: new Date('2024-08-08'),
  },
];

```

---


```

---

## File: D:\projectsing\S-Delivery-AppV3\project-code-docs\02-타입-정의-파일.md

```markdown
# 타입 정의 파일

## src/types/menu.ts

```typescript
export interface MenuOption {
  id: string;
  name: string;
  price: number;
  quantity?: number; // 옵션1용: 수량이 있는 옵션
}

export interface Menu {
  id: string;
  name: string;
  price: number;
  category: string[];
  description: string;
  imageUrl?: string;
  options?: MenuOption[];
  soldout: boolean;
  createdAt: Date;
}

export const CATEGORIES = [
  '인기메뉴',
  '추천메뉴',
  '기본메뉴',
  '사이드메뉴',
  '음료',
  '주류',
] as const;

export type Category = typeof CATEGORIES[number];
```

## src/types/order.ts

```typescript
export interface OrderItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  options?: { name: string; price: number }[];
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  address: string;
  phone: string;
  memo?: string;
  paymentType: PaymentType;
  createdAt: Date;
  updatedAt?: Date;
}

export type OrderStatus = '접수' | '조리중' | '배달중' | '완료' | '취소';
export type PaymentType = '앱결제' | '만나서카드' | '만나서현금' | '방문시결제';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  '접수': '주문 접수',
  '조리중': '조리 중',
  '배달중': '배달 중',
  '완료': '배달 완료',
  '취소': '주문 취소',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
  '접수': { bg: 'bg-blue-100', text: 'text-blue-700' },
  '조리중': { bg: 'bg-orange-100', text: 'text-orange-700' },
  '배달중': { bg: 'bg-purple-100', text: 'text-purple-700' },
  '완료': { bg: 'bg-green-100', text: 'text-green-700' },
  '취소': { bg: 'bg-red-100', text: 'text-red-700' },
};

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  '앱결제': '앱 결제',
  '만나서카드': '만나서 카드 결제',
  '만나서현금': '만나서 현금 결제',
  '방문시결제': '방문 시 결제',
};
```

## src/types/coupon.ts

```typescript
export interface Coupon {
  id: string;
  code: string;
  name: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
  // 특정 회원에게만 발급된 쿠폰인 경우
  assignedUserId?: string;
  assignedUserName?: string;
  assignedUserPhone?: string;
  // 사용 여부 (1회만 사용 가능)
  isUsed: boolean;
  usedAt?: Date;
}

export const DISCOUNT_TYPE_LABELS = {
  percentage: '퍼센트 할인',
  fixed: '금액 할인',
};
```

## src/types/review.ts

```typescript
/**
 * 리뷰 타입 정의
 */

export interface Review {
  id: string;
  orderId: string;
  userId: string;
  userDisplayName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateReviewData extends Omit<Review, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateReviewData extends Partial<Omit<Review, 'id' | 'orderId' | 'userId' | 'createdAt'>> {}
```

## src/types/notice.ts

```typescript
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: '공지' | '이벤트' | '점검' | '할인';
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const NOTICE_CATEGORIES = ['공지', '이벤트', '점검', '할인'] as const;
export type NoticeCategory = typeof NOTICE_CATEGORIES[number];
```

## src/types/event.ts

```typescript
export interface Event {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
```

## src/types/store.ts

```typescript
/**
 * 상점(Store) 타입 정의
 * 단일 레스토랑 앱을 위한 단순화된 구조
 */

export interface Store {
  id: string; // 단일 문서 ID (예: 'store')
  name: string;
  description: string;

  // 연락처 정보
  phone: string;
  email: string;
  address: string;

  // 브랜딩
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor?: string; // 메인 테마 색상

  // 운영 정보
  businessHours?: BusinessHours;
  deliveryFee: number;
  minOrderAmount: number;

  // 설정
  settings: StoreSettings;

  // 메타데이터
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface BusinessHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string; // "09:00"
  close: string; // "22:00"
  closed: boolean; // 휴무일 여부
}

export interface StoreSettings {
  // 주문 설정
  autoAcceptOrders: boolean; // 자동 주문 접수
  estimatedDeliveryTime: number; // 예상 배달 시간 (분)

  // 결제 설정
  paymentMethods: PaymentMethod[];

  // 알림 설정
  notificationEmail?: string;
  notificationPhone?: string;

  // 기능 활성화
  enableReviews: boolean;
  enableCoupons: boolean;
  enableNotices: boolean;
  enableEvents: boolean;
}

export type PaymentMethod = '앱결제' | '만나서카드' | '만나서현금' | '방문시결제';

/**
 * 상점 설정 폼 데이터
 */
export interface StoreFormData {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  deliveryFee: number;
  minOrderAmount: number;
  logoUrl?: string;
  bannerUrl?: string;
  businessHours?: BusinessHours;
  settings?: StoreSettings;
}
```


```

---

## File: D:\projectsing\S-Delivery-AppV3\project-code-docs\09-Components-Menu-Review-Notice-Event.md

```markdown
# Components - Menu, Review, Notice, Event

## src/components/menu/MenuCard.tsx

```typescript
import { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Menu } from '../../types/menu';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import MenuDetailModal from './MenuDetailModal';

interface MenuCardProps {
  menu: Menu;
}

export default function MenuCard({ menu }: MenuCardProps) {
  const { addItem } = useCart();
  const [showDetail, setShowDetail] = useState(false);
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (menu.soldout) {
      toast.error('품절된 메뉴입니다');
      return;
    }
    
    if (menu.options && menu.options.length > 0) {
      // 옵션이 있으면 상세 모달 열기
      setShowDetail(true);
    } else {
      // 옵션이 없으면 바로 추가
      addItem({
        menuId: menu.id,
        name: menu.name,
        price: menu.price,
        quantity: 1,
        imageUrl: menu.imageUrl,
      });
      toast.success('장바구니에 추가되었습니다');
    }
  };

  return (
    <>
      <Card
        hover
        padding="none"
        onClick={() => setShowDetail(true)}
        className={`overflow-hidden ${menu.soldout ? 'opacity-60' : ''}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {menu.imageUrl ? (
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-5xl">🍜</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {menu.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="primary" size="sm">
                {cat}
              </Badge>
            ))}
          </div>
          
          {menu.soldout && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="danger" size="lg">
                품절
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {menu.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {menu.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-blue-600">
                {menu.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 ml-1">원</span>
            </div>
            
            <Button
              size="sm"
              onClick={handleQuickAdd}
              disabled={menu.soldout}
              className="group"
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              담기
            </Button>
          </div>
          
          {menu.options && menu.options.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              {menu.options.length}개의 옵션 선택 가능
            </p>
          )}
        </div>
      </Card>

      {showDetail && (
        <MenuDetailModal
          menu={menu}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
```

## src/components/menu/CategoryBar.tsx

```typescript
import { CATEGORIES, Category } from '../../types/menu';

interface CategoryBarProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryBar({ selected, onSelect }: CategoryBarProps) {
  const allCategories = ['전체', ...CATEGORIES];
  
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* 스크롤 힌트를 위한 그라데이션 오버레이 */}
        <div className="relative">
          {/* 오른쪽 그라데이션 (더 많은 항목이 있음을 표시) */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden"></div>
          
          {/* 카테고리 버튼들 */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={`
                  px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0
                  ${
                    selected === category
                      ? 'gradient-primary text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## src/components/menu/MenuDetailModal.tsx

(전체 코드는 프로젝트의 `src/components/menu/MenuDetailModal.tsx` 파일 참조)

주요 기능:
- 메뉴 상세 정보 표시
- 옵션 선택
- 수량 조절
- 장바구니 추가

## src/components/review/ReviewModal.tsx

(전체 코드는 프로젝트의 `src/components/review/ReviewModal.tsx` 파일 참조)

주요 기능:
- 별점 선택
- 리뷰 내용 작성
- 리뷰 생성/수정/삭제

## src/components/review/ReviewList.tsx

(전체 코드는 프로젝트의 `src/components/review/ReviewList.tsx` 파일 참조)

주요 기능:
- 리뷰 목록 표시
- 평균 별점 계산
- 별점 분포 표시

## src/components/notice/NoticeList.tsx

(전체 코드는 프로젝트의 `src/components/notice/NoticeList.tsx` 파일 참조)

주요 기능:
- 공지사항 목록 표시
- 고정 공지 우선 표시
- 확장/축소 기능

## src/components/notice/NoticePopup.tsx

(전체 코드는 프로젝트의 `src/components/notice/NoticePopup.tsx` 파일 참조)

주요 기능:
- 고정 공지 팝업 표시
- 오늘 하루 보지 않기 기능

## src/components/event/EventBanner.tsx

(전체 코드는 프로젝트의 `src/components/event/EventBanner.tsx` 파일 참조)

주요 기능:
- 이벤트 배너 슬라이더
- 자동 슬라이드
- 이벤트 클릭 시 링크 이동

## src/components/figma/ImageWithFallback.tsx

```typescript
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
```


```

---

## File: D:\projectsing\S-Delivery-AppV3\scripts\client_reset.js

```javascript
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

## File: D:\projectsing\S-Delivery-AppV3\scripts\generate-v3-code-volumes.ps1

```powershell
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

## File: D:\projectsing\S-Delivery-AppV3\src\components\event\EventBanner.tsx

```typescript
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '../../types/event';
import { useStore } from '../../contexts/StoreContext';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { getActiveEventsQuery } from '../../services/eventService';

export default function EventBanner() {
  const { store } = useStore();
  const storeId = store?.id;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Firestore에서 활성화된 이벤트만 조회
  const { data: events, loading } = useFirestoreCollection<Event>(
    storeId ? getActiveEventsQuery(storeId) : null
  );

  // 자동 슬라이드
  useEffect(() => {
    if (!events || events.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [events?.length]);

  if (!storeId || loading) {
    return null;
  }

  if (!events || events.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handleClick = (event: Event) => {
    if (event.link) {
      window.open(event.link, '_blank');
    }
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full">
      {/* 배너 이미지 */}
      <div
        onClick={() => handleClick(currentEvent)}
        className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer group"
      >
        <img
          src={currentEvent.imageUrl}
          alt={currentEvent.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg">
              {currentEvent.title}
            </h3>
          </div>
        </div>
      </div>

      {/* 이전/다음 버튼 (여러 이벤트가 있을 때만) */}
      {events.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\event\EventList.tsx

```typescript
import { useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/formatDate';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useStore } from '../../contexts/StoreContext';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { getActiveEventsQuery } from '../../services/eventService';

export default function EventList() {
    const { store } = useStore();
    const storeId = store?.id;
    const { data: events, loading } = useFirestoreCollection<Event>(
        storeId ? getActiveEventsQuery(storeId) : null
    );

    if (!storeId) return null;

    if (loading) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">이벤트를 불러오는 중...</p>
            </div>
        );
    }

    if (!events || events.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-5xl mb-4">🎉</div>
                <p className="text-gray-600">현재 진행 중인 이벤트가 없습니다</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <Card key={event.id} className="overflow-hidden p-0">
                    {event.imageUrl && (
                        <div className="relative h-48 w-full">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            {event.active && (
                                <div className="absolute top-2 right-2">
                                    <Badge variant="success" size="sm">진행중</Badge>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>

                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar className="w-4 h-4 mr-1.5" />
                            <span>
                                {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                            </span>
                        </div>

                        {event.link && (
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                자세히 보기 <ChevronRight className="w-4 h-4 ml-0.5" />
                            </a>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\accordion.tsx

```typescript
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\badge.tsx

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\calendar.tsx

```typescript
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\hover-card.tsx

```typescript
"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card@1.1.6";

import { cn } from "./utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\input.tsx

```typescript
import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\input-otp.tsx

```typescript
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp@1.4.2";
import { MinusIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\navigation-menu.tsx

```typescript
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu@1.2.5";
import { cva } from "class-variance-authority@0.7.1";
import { ChevronDownIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center",
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\pagination.tsx

```typescript
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react@0.487.0";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\separator.tsx

```typescript
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator@1.1.2";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\components\ui\utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\contexts\AuthContext.tsx

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useIsAdmin } from '../hooks/useIsAdmin';

interface User {
  id: string;
  email: string;
  displayName?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, displayName?: string, phone?: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading, signup, login, logout } = useFirebaseAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin(user?.id);
  // TEMPORARY TEST OVERRIDE: Force Admin
  // const isAdmin = true;
  // const adminLoading = false;

  const loading = authLoading || adminLoading;

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

---

## File: D:\projectsing\S-Delivery-AppV3\src\devtools\safeSnapshot.ts

```typescript
import { Query, onSnapshot, DocumentReference } from 'firebase/firestore';

/**
 * onSnapshot의 안전한 래퍼
 * - 권한 에러 시 조용히 실패
 * - enabled 옵션으로 구독 제어
 * - 에러 시 console.warn으로 로깅
 */
export function onSnapshotSafe<T = any>(
  query: Query<T> | DocumentReference<T>,
  callback: (snapshot: any) => void,
  options?: {
    enabled?: boolean;
    onError?: (error: Error) => void;
  }
) {
  const enabled = options?.enabled !== false;

  if (!enabled) {
    // 구독하지 않고 빈 unsubscribe 함수 반환
    return () => {};
  }

  try {
    return onSnapshot(
      query,
      callback,
      (error) => {
        // 권한 에러는 경고만 출력
        if (error.code === 'permission-denied') {
          console.warn('[safeSnapshot] 권한 없음:', error.message);
        } else {
          console.warn('[safeSnapshot] 에러 발생:', error);
        }

        // 커스텀 에러 핸들러 호출
        if (options?.onError) {
          options.onError(error);
        }
      }
    );
  } catch (error) {
    console.warn('[safeSnapshot] 구독 실패:', error);
    return () => {};
  }
}

export default onSnapshotSafe;

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\hooks\useReorder.ts

```typescript
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../contexts/CartContext';
import { Order, OrderItem } from '../types/order';
import { Menu } from '../types/menu';
import { toast } from 'sonner';

type ReorderStatus = 'valid' | 'deleted' | 'hidden' | 'soldout' | 'error';

interface ReorderCheckResult {
    item: OrderItem;
    status: ReorderStatus;
    menuData?: Menu;
    firestoreMenuId?: string;
    reason?: string;
}

export function useReorder() {
    const { addItem, clearCart } = useCart();
    const [reordering, setReordering] = useState(false);

    const handleReorder = async (storeId: string, order: Order) => {
        if (!storeId || !order.items || order.items.length === 0) return;

        if (!window.confirm('장바구니를 비우고 이 주문을 다시 담으시겠습니까?\n(옵션은 초기화되므로 다시 선택해주세요)')) {
            return;
        }

        setReordering(true);
        try {
            const promises = order.items.map(async (item): Promise<ReorderCheckResult> => {
                try {
                    // R2-FIX-04: menuId fallback
                    const menuId = item.menuId ?? (item as any).id;
                    if (!menuId) return { item, status: 'error', reason: 'ID 없음' };

                    const menuRef = doc(db, 'stores', storeId, 'menus', menuId);
                    const menuSnap = await getDoc(menuRef);

                    if (!menuSnap.exists()) {
                        return { item, status: 'deleted', reason: '메뉴 삭제됨' };
                    }

                    const menuData = menuSnap.data() as Menu;

                    if (menuData.isHidden) {
                        return { item, status: 'hidden', reason: '메뉴 숨김 처리됨' };
                    }

                    if (menuData.soldout) {
                        return { item, status: 'soldout', reason: '품절됨' };
                    }

                    return { item, status: 'valid', menuData, firestoreMenuId: menuSnap.id };
                } catch (e) {
                    return { item, status: 'error', reason: '확인 불가' };
                }
            });

            const results = await Promise.all(promises);

            const validItems: ReorderCheckResult[] = [];
            const invalidItems: ReorderCheckResult[] = [];

            results.forEach(res => {
                if (res.status === 'valid') {
                    validItems.push(res);
                } else {
                    invalidItems.push(res);
                }
            });

            if (validItems.length === 0) {
                toast.error('담을 수 있는 메뉴가 없습니다. (전체 품절 또는 삭제됨)');
                return;
            }

            // 2. 장바구니 초기화 및 담기
            clearCart();

            validItems.forEach(({ item, menuData, firestoreMenuId }) => {
                if (!menuData || !firestoreMenuId) return;

                // R2-FIX-02: 옵션 제거 정책 (가장 안전한 방법)
                // 옵션 가격/구조 변경 리스크로 인해 옵션은 제외하고 기본 메뉴만 담음
                addItem({
                    menuId: firestoreMenuId,
                    name: menuData.name,
                    price: menuData.price,
                    quantity: item.quantity,
                    options: [], // 옵션 초기화
                    imageUrl: menuData.imageUrl,
                });
            });

            // 3. 결과 알림 (R2-FIX-04: 상세 통계)
            const soldoutCount = invalidItems.filter(i => i.status === 'soldout').length;
            const hiddenCount = invalidItems.filter(i => i.status === 'hidden').length;
            const deletedCount = invalidItems.filter(i => i.status === 'deleted').length; // error 포함

            if (invalidItems.length > 0) {
                let msg = `${validItems.length}개 메뉴 담기 성공`;
                const excluded = [];
                if (soldoutCount > 0) excluded.push(`품절 ${soldoutCount}`);
                if (hiddenCount > 0) excluded.push(`숨김 ${hiddenCount}`);
                if (deletedCount > 0) excluded.push(`삭제/기타 ${deletedCount}`);

                toast.warning(`${msg} (${excluded.join(', ')} 제외됨)`);
                toast.info('옵션은 초기화되었으니 다시 선택해주세요.');
            } else {
                toast.success('메뉴를 장바구니에 담았습니다! 옵션을 다시 선택해주세요.');
            }

        } catch (error) {
            console.error('Reorder error:', error);
            toast.error('재주문 처리 중 오류가 발생했습니다.');
        } finally {
            setReordering(false);
        }
    };

    return { handleReorder, reordering };
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\IMPLEMENTATION_ATOMIC_CHECKLIST.md

```markdown
# 🎯 커스컴배달앱 원자 단위 구현 체크리스트

> My-Pho-App 가이드 기반 정밀 분석 및 실행 계획

---

## ✅ Phase 0: 멀티 테넌트 (완료 상태 재확인)

### 0-1. 상점 정보 스키마
- [x] stores/{storeId} 컬렉션 생성
- [x] Store 타입 정의 (/types/store.ts)
- [x] ownerUid, name, phone, address 필드

### 0-2. 관리자-상점 매핑
- [x] stores/{storeId}/admins 서브컬렉션
- [x] adminStores 컬렉션 (역방향 매핑)
- [x] storeAccess.ts 유틸리티

### 0-3. 초기 설정 마법사
- [x] StoreSetupWizard 4단계 구현
- [x] 상점 생성 로직
- [x] 관리자 매핑 자동 설정

### 0-4. StoreContext
- [x] contexts/StoreContext.tsx
- [x] currentStore, adminStores 상태
- [x] switchStore 함수
- [x] localStorage 연동

### 0-5. 데이터 격리
- [x] stores/{storeId}/menus
- [x] stores/{storeId}/orders
- [x] stores/{storeId}/coupons
- [ ] ⚠️ stores/{storeId}/users (미확인)
- [ ] ⚠️ stores/{storeId}/reviews (미확인)
- [ ] ⚠️ stores/{storeId}/notices (미확인)
- [ ] ⚠️ stores/{storeId}/events (미확인)
- [ ] ⚠️ stores/{storeId}/pushTokens (미확인)

### 0-6. 보안 규칙
- [x] firestore.rules 멀티 테넌트 적용
- [x] storage.rules 적용

### 0-7. 상점 선택 UI
- [x] StoreSwitcher 컴포넌트
- [x] AdminSidebar에 통합

### 0-8. 상점 설정 페이지
- [x] AdminStoreSettings 페이지
- [x] 상점 정보 수정 폼
- [x] 브랜딩 설정

### 0-9. 회원가입 로직
- [x] SignupPage storeId 연동 (재확인 필요)

### 0-10. 랜딩 페이지
- [x] WelcomePage 구현
- [ ] ⚠️ 상점별 커스터마이징 (추가 필요)

---

## ✅ Phase 1-5: 기본 기능 (98% 완료)

### Phase 1: 프로젝트 설정
- [x] React + TypeScript + Vite
- [x] Firebase 연동 (auth, firestore, storage)
- [x] 폴더 구조
- [x] 라우팅 (React Router)

### Phase 2: 인증 시스템
- [x] LoginPage
- [x] SignupPage
- [x] AuthContext
- [x] 관리자 권한 (useIsAdmin)
- [x] 데모 계정 (user@demo.com, admin@demo.com)

### Phase 3: 메뉴 시스템
- [x] MenuPage
- [x] MenuCard
- [x] MenuDetailModal
- [x] 옵션1/옵션2 시스템
- [x] CategoryBar
- [x] 관리자 메뉴 관리 (AdminMenuManagement)

### Phase 4: 주문 시스템
- [x] CartContext
- [x] CartPage
- [x] CheckoutPage
- [x] OrdersPage
- [x] OrderDetailPage
- [x] 주문 생성/조회

### Phase 5: 관리자 기능
- [x] AdminDashboard
- [x] AdminOrderManagement
- [x] AdminCouponManagement
- [x] 회원 검색 기능
- [x] 쿠폰 1회 제한 시스템

---

## ❌ Phase 6: 푸시 알림 시스템 (미구현)

### 6-1. FCM 설정
- [ ] Firebase 콘솔에서 FCM 활성화
- [ ] VAPID 키 생성
- [ ] .env에 REACT_APP_FIREBASE_VAPID_KEY 추가
- [ ] firebase.ts에서 messaging export 확인

### 6-2. FCM 초기화 파일
- [ ] /lib/firebase-messaging.ts 생성
- [ ] requestNotificationPermission() 함수
  - [ ] Notification.requestPermission()
  - [ ] getToken(messaging, { vapidKey })
  - [ ] 토큰 반환
- [ ] setupForegroundMessaging() 함수
  - [ ] onMessage(messaging, callback)
  - [ ] toast.info로 알림 표시

### 6-3. Service Worker
- [ ] /public/firebase-messaging-sw.js 생성
- [ ] Firebase SDK CDN import
  - [ ] importScripts('https://www.gstatic.com/firebasejs/...')
- [ ] firebase.initializeApp(config)
- [ ] onBackgroundMessage(messaging, handler)
  - [ ] self.registration.showNotification()
  - [ ] title, body, icon, badge, data
- [ ] notificationclick 이벤트
  - [ ] data.link로 페이지 이동

### 6-4. FCM 토큰 관리
- [ ] /lib/fcmInit.ts 생성
- [ ] Firestore pushTokens 컬렉션 스키마
  ```typescript
  stores/{storeId}/pushTokens/{tokenId}
  {
    uid: string,
    token: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
  ```
- [ ] 토큰 발급 로직
  - [ ] getToken() 호출
  - [ ] where('uid', '==', currentUser.uid) 쿼리
  - [ ] 기존 토큰 확인
  - [ ] 없으면 addDoc, 있으면 updateDoc
- [ ] 에러 처리 (토큰 발급 실패 시)

### 6-5. 알림 핸들러 컴포넌트
- [ ] /components/NotificationHandler.tsx 생성
- [ ] useEffect로 fcmInit 호출
- [ ] 로그인 사용자만 실행
- [ ] onMessage로 포그라운드 메시지 수신
- [ ] toast로 알림 표시
- [ ] 알림 클릭 시 navigate 이동
- [ ] App.tsx에 NotificationHandler 추가

### 6-6. Firebase Functions 푸시 API
- [ ] /functions 폴더 생성
- [ ] Firebase Functions 초기화
  - [ ] firebase init functions
  - [ ] TypeScript 선택
- [ ] functions/src/index.ts 작성
- [ ] sendToUser (HTTP Function)
  - [ ] 입력: {uid, title, body, data, link}
  - [ ] pushTokens에서 uid 기반 토큰 조회
  - [ ] sendEachForMulticast()로 발송
  - [ ] 실패 토큰 정리 (invalid token)
  - [ ] 결과 반환 {sent, failed, invalid}
- [ ] sendToAllUsers (HTTP Function)
  - [ ] 입력: {title, body, data, link}
  - [ ] 모든 토큰 조회
  - [ ] 전체 브로드캐스트
- [ ] sendWebpush (Callable Function)
  - [ ] 관리자 권한 확인
  - [ ] send()로 발송
  - [ ] pushLogs에 로그 저장
- [ ] HTTP Function 보안
  - [ ] x-api-key 헤더 확인
  - [ ] CORS 설정
- [ ] Functions 배포
  - [ ] npm run deploy:functions

### 6-7. 관리자 푸시 UI
- [ ] /pages/admin/AdminPushNotification.tsx 생성
- [ ] UI 구성
  - [ ] 제목 입력 (Input)
  - [ ] 내용 입력 (Textarea)
  - [ ] 링크 입력 (Input, 선택)
  - [ ] 발송 대상 선택 (Radio)
    - [ ] 특정 사용자 (UID 입력)
    - [ ] 전체 사용자
  - [ ] 발송 버튼
- [ ] handleSubmit 로직
  - [ ] fetch()로 HTTP Function 호출
  - [ ] x-api-key 헤더 추가
  - [ ] 성공/실패 수 표시
- [ ] AdminSidebar에 "푸시 알림" 메뉴 추가
- [ ] App.tsx에 /admin/push 라우트 추가

---

## ❌ Phase 7: 리뷰 시스템 (미구현)

### 7-1. Firestore 리뷰 스키마
- [ ] stores/{storeId}/reviews 컬렉션 생성
- [ ] 문서 구조 정의
  ```typescript
  {
    orderId: string,
    userId: string,
    userDisplayName: string,
    rating: number,  // 1-5
    comment: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
  ```
- [ ] /types/review.ts 타입 정의
- [ ] firestore.rules에 보안 규칙 추가
  - [ ] 읽기: 모든 사용자
  - [ ] 생성: 로그인 사용자
  - [ ] 수정/삭제: 작성자만
- [ ] firestore.indexes.json에 인덱스 추가
  - [ ] orderId

### 7-2. 리뷰 작성/수정 폼
- [ ] /components/review/ReviewForm.tsx 생성 (또는 ReviewModal 수정)
- [ ] Props 정의
  - [ ] orderId: string
  - [ ] onClose: () => void
  - [ ] onSuccess: () => void
- [ ] UI 구성
  - [ ] 별점 선택 (1-5 클릭 가능한 ★)
  - [ ] 리뷰 내용 (textarea, 최대 200자)
  - [ ] 등록/수정 버튼
  - [ ] 삭제 버튼 (수정 모드)
  - [ ] 닫기 버튼
- [ ] 기존 리뷰 확인 로직
  - [ ] useEffect로 reviews 쿼리
  - [ ] where('orderId', '==', orderId)
  - [ ] where('userId', '==', user.uid)
  - [ ] 있으면 수정 모드, 없으면 등록 모드
- [ ] 리뷰 등록 로직
  - [ ] addDoc(collection(db, `stores/${storeId}/reviews`), data)
  - [ ] orders 문서 업데이트
    - [ ] reviewed: true
    - [ ] reviewText, reviewRating, reviewAt
- [ ] 리뷰 수정 로직
  - [ ] updateDoc(doc(db, `stores/${storeId}/reviews/${reviewId}`), data)
  - [ ] orders 문서 동기화
- [ ] 리뷰 삭제 로직
  - [ ] deleteDoc(doc(db, `stores/${storeId}/reviews/${reviewId}`))
  - [ ] orders 문서 리뷰 필드 초기화
- [ ] OrderDetailPage에 "리뷰 작성" 버튼 추가

### 7-3. 리뷰 목록
- [ ] /components/review/ReviewList.tsx 생성
- [ ] Firestore 쿼리
  - [ ] collection(db, `stores/${storeId}/reviews`)
  - [ ] orderBy('createdAt', 'desc')
  - [ ] onSnapshot으로 실시간 구독
- [ ] UI 구성
  - [ ] 카드 형태 리스트
  - [ ] 작성자명 (userDisplayName)
  - [ ] 별점 (★★★★☆)
  - [ ] 리뷰 내용
  - [ ] 작성일 (formatDate)
- [ ] 별점별 색상 구분
  - [ ] 5점: 금색
  - [ ] 4점: 파란색
  - [ ] 3점 이하: 회색
- [ ] WelcomePage 또는 별도 페이지에 ReviewList 추가

---

## ❌ Phase 8: 공지사항 시스템 (미구현)

### 8-1. Firestore 공지사항 스키마
- [ ] stores/{storeId}/notices 컬렉션 생성
- [ ] 문서 구조 정의
  ```typescript
  {
    title: string,
    content: string,
    category: '공지' | '이벤트' | '점검' | '할인',
    pinned: boolean,  // 상단 고정
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
  ```
- [ ] /types/notice.ts 타입 정의 (이미 있음, 확인)
- [ ] firestore.rules 보안 규칙
  - [ ] 읽기: 모든 사용자
  - [ ] 쓰기: 관리자만
- [ ] firestore.indexes.json 인덱스
  - [ ] createdAt (desc)
  - [ ] category + createdAt

### 8-2. 공지사항 관리 UI
- [ ] AdminNoticeManagement.tsx 확인 (이미 있음)
- [ ] 기능 확인
  - [ ] 공지사항 목록 조회 (실시간)
  - [ ] 공지사항 추가
  - [ ] 공지사항 수정
  - [ ] 공지사항 삭제
- [ ] 입력 필드
  - [ ] 제목 (Input)
  - [ ] 내용 (Textarea)
  - [ ] 카테고리 (Select)
  - [ ] 상단 고정 (Checkbox)
- [ ] UI 개선
  - [ ] 고정 공지 배경색 강조
  - [ ] 카테고리별 배지 색상
- [ ] storeId 기반 쿼리로 변경
  - [ ] collection(db, `stores/${storeId}/notices`)

### 8-3. 공지사항 목록 (사용자용)
- [ ] /components/notice/NoticeList.tsx 확인 (이미 있음)
- [ ] 기능 확인
  - [ ] notices 컬렉션 조회
  - [ ] 고정 공지 우선 표시
  - [ ] 최신순 정렬
- [ ] UI 확인
  - [ ] 제목, 카테고리 배지
  - [ ] 내용 (일부만, 더보기)
  - [ ] 작성일
- [ ] storeId 기반 쿼리로 변경
- [ ] NoticePage에 NoticeList 통합 확인

### 8-4. 공지사항 팝업
- [ ] /components/notice/NoticePopup.tsx 생성
- [ ] 기능
  - [ ] 앱 시작 시 중요 공지 팝업
  - [ ] pinned === true인 공지만
  - [ ] "오늘 하루 보지 않기" 체크박스
  - [ ] localStorage로 표시 여부 저장
    - [ ] key: `notice_popup_${noticeId}_${today}`
- [ ] UI
  - [ ] 모달 형태
  - [ ] 제목, 내용
  - [ ] 닫기 버튼
  - [ ] "오늘 하루 보지 않기" 체크박스
- [ ] App.tsx 또는 WelcomePage에 NoticePopup 추가

---

## ❌ Phase 9: 이벤트 배너 시스템 (미구현)

### 9-1. Firestore 이벤트 스키마
- [ ] stores/{storeId}/events 컬렉션 생성
- [ ] 문서 구조 정의
  ```typescript
  {
    title: string,
    imageUrl: string,
    link: string,
    active: boolean,
    startDate: Timestamp,
    endDate: Timestamp,
    createdAt: Timestamp
  }
  ```
- [ ] /types/event.ts 타입 정의 (이미 있음, 확인)
- [ ] firestore.rules 보안 규칙
  - [ ] 읽기: 모든 사용자
  - [ ] 쓰기: 관리자만

### 9-2. 이벤트 배너 컴포넌트
- [ ] /components/event/EventBanner.tsx 확인 (이미 있음)
- [ ] 기능 확인
  - [ ] events 컬렉션 조회
  - [ ] active === true 필터
  - [ ] 현재 날짜가 startDate ~ endDate 범위 내
- [ ] UI 확인
  - [ ] 이미지 배너 표시
  - [ ] 클릭 시 link로 이동
  - [ ] 여러 이벤트 시 캐러셀 (선택)
- [ ] storeId 기반 쿼리로 변경
  - [ ] collection(db, `stores/${storeId}/events`)
- [ ] WelcomePage에 EventBanner 추가 확인

### 9-3. 이벤트 관리 UI
- [ ] AdminEventManagement.tsx 확인 (이미 있음)
- [ ] 기능 확인
  - [ ] 이벤트 목록 조회
  - [ ] 이벤트 추가
  - [ ] 이벤트 수정
  - [ ] 이벤트 삭제
  - [ ] 활성화/비활성화
- [ ] 입력 필드
  - [ ] 제목
  - [ ] 이미지 URL (또는 업로드)
  - [ ] 링크 URL
  - [ ] 시작일 (DatePicker)
  - [ ] 종료일 (DatePicker)
  - [ ] 활성화 (Switch)
- [ ] UI 개선
  - [ ] 활성 이벤트 강조 표시
  - [ ] 기간 만료 이벤트 회색 표시
- [ ] storeId 기반 쿼리로 변경

---

## ❌ Phase 10: 유틸리티 함수 (부분 완료)

### 10-1. 날짜 포맷 유틸
- [x] /utils/formatDate.ts 존재 확인
- [ ] formatDate(timestamp) 함수 확인
  - [ ] Firestore Timestamp → "YYYY-MM-DD HH:mm:ss"
- [ ] formatDateShort(timestamp) 함수 추가
  - [ ] "MM/DD HH:mm" 형식
- [ ] formatDateRelative(timestamp) 함수 추가
  - [ ] "방금", "5분 전", "1시간 전", "어제", "MM/DD"

### 10-2. 라벨 관리
- [x] /utils/labels.ts 존재 확인
- [ ] ORDER_STATUS_LABELS 확인
  ```typescript
  {
    '접수': '주문 접수',
    '조리중': '조리 중',
    '배달중': '배달 중',
    '완료': '배달 완료',
    '취소': '주문 취소'
  }
  ```
- [ ] PAYMENT_TYPE_LABELS 확인
  ```typescript
  {
    '앱결제': '앱 결제',
    '만나서카드': '만나서 카드 결제',
    '만나서현금': '만나서 현금 결제',
    '방문시결제': '방문 시 결제'
  }
  ```
- [ ] CATEGORY_LABELS 확인
  ```typescript
  ['인기메뉴', '추천메뉴', '기본메뉴', '사이드메뉴', '음료', '주류']
  ```

### 10-3. Firestore 안전 스냅샷
- [ ] /devtools/safeSnapshot.ts 생성
- [ ] onSnapshotSafe() 래퍼 함수
  - [ ] onSnapshot의 안전한 버전
  - [ ] try-catch 에러 처리
  - [ ] 권한 없을 때 조용히 실패
  - [ ] options.enabled === false면 구독 안 함
  - [ ] 에러 시 console.warn
  - [ ] 빈 unsubscribe 함수 반환
- [ ] export { onSnapshotSafe }
- [ ] 기존 onSnapshot 호출을 onSnapshotSafe로 리팩토링 (선택)

---

## ❌ Phase 11: 공통 컴포넌트 (부분 완료)

### 11-1. 웰컴 페이지
- [x] /pages/WelcomePage.tsx 존재 확인
- [ ] Props 확인
  - [ ] user: User | null
- [ ] 표시 내용 확인
  - [ ] 로고 이미지
  - [ ] 환영 메시지
  - [ ] 사용자 정보 (로그인 시)
  - [ ] 관리자 뱃지 (useIsAdmin)
  - [ ] 이벤트 배너 (EventBanner)
  - [ ] 메인 버튼
    - [ ] 로그인 전: "로그인하고 시작하기" → /login
    - [ ] 로그인 후: "메뉴 바로가기" → /menu
- [ ] 개선 사항
  - [ ] 상점별 커스터마이징 (currentStore.logoUrl, bannerUrl)

### 11-2. 상단 바 (TopBar)
- [x] /components/common/TopBar.tsx 존재 확인
- [ ] 표시 내용 확인
  - [ ] 앱 로고/제목 (클릭 시 홈)
  - [ ] 네비게이션 링크
    - [ ] 메뉴
    - [ ] 장바구니 (아이템 수 배지)
    - [ ] 내 주문
    - [ ] 관리자 (관리자만)
  - [ ] 로그아웃 버튼
- [ ] CartContext로 장바구니 수 표시 확인
- [ ] useIsAdmin으로 관리자 메뉴 표시 확인
- [ ] 모바일 반응형 확인

### 11-3. 관리자 메뉴 바
- [x] AdminSidebar.tsx 존재 확인
- [ ] 메뉴 항목 확인
  - [ ] 대시보드
  - [ ] 주문 관리
  - [ ] 메뉴 관리
  - [ ] 쿠폰 관리
  - [ ] 공지사항 관리
  - [ ] 이벤트 관리
  - [ ] 리뷰 관리
  - [ ] 상점 설정
  - [ ] 푸시 알림 (추가 필요)
- [ ] 현재 페이지 강조 표시 확인
- [ ] StoreSwitcher 통합 확인

### 11-4. 알림 가이드
- [ ] /components/common/NotificationGuide.tsx 생성
- [ ] 기능
  - [ ] 알림 권한 요청 안내
  - [ ] Notification.permission 확인
  - [ ] 'default' 상태면 배너 표시
  - [ ] "알림 받기" 버튼
  - [ ] 버튼 클릭 시 Notification.requestPermission()
- [ ] UI
  - [ ] 배너 형태 (상단 고정)
  - [ ] 닫기 버튼
  - [ ] localStorage로 "다시 보지 않기" 저장
- [ ] App.tsx 또는 WelcomePage에 NotificationGuide 추가

---

## ❌ Phase 12: 배포 및 최적화 (부분 완료)

### 12-1. Firebase Hosting 설정
- [x] firebase.json 존재 확인
- [ ] hosting 설정 확인
  - [ ] public: "dist" (Vite) 또는 "build" (CRA)
  - [ ] rewrites: SPA 라우팅 (모든 요청 → /index.html)
  - [ ] headers: 캐시 제어
    - [ ] index.html: no-cache
    - [ ] static files: max-age=31536000
- [ ] firestore 설정 확인
  - [ ] rules: "firestore.rules"
  - [ ] indexes: "firestore.indexes.json"
- [ ] storage 설정 확인
  - [ ] rules: "storage.rules"
- [ ] functions 설정 확인 (Phase 6 이후)
  - [ ] source: "functions"
  - [ ] runtime: "nodejs18"

### 12-2. Firestore 인덱스
- [x] firestore.indexes.json 존재 확인
- [ ] 필요한 인덱스 확인
  - [ ] orders: status + createdAt (desc)
  - [ ] orders: userId + createdAt (asc)
  - [ ] orders: adminDeleted + createdAt (desc)
  - [ ] orders: status + adminDeleted + createdAt (desc)
  - [ ] reviews: orderId
  - [ ] notices: type + startDate
  - [ ] notices: createdAt (desc)
  - [ ] menus: category + createdAt (desc)
  - [ ] events: createdAt (desc)
- [ ] firebase deploy --only firestore:indexes

### 12-3. 환경변수 템플릿
- [x] .env.example 존재 확인
- [ ] 필요한 변수 확인
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID
  - [ ] VITE_FIREBASE_VAPID_KEY (Phase 6)
- [ ] 주석 추가
  - [ ] Firebase 프로젝트 설정 안내
  - [ ] VAPID 키 생성 방법

### 12-4. 빌드 및 배포 스크립트
- [ ] package.json scripts 확인
  - [ ] "build": "vite build" 또는 "react-scripts build"
  - [ ] "deploy": "npm run build && firebase deploy"
  - [ ] "deploy:hosting": "npm run build && firebase deploy --only hosting"
  - [ ] "deploy:functions": "cd functions && npm run build && cd .. && firebase deploy --only functions"
  - [ ] "deploy:rules": "firebase deploy --only firestore:rules,storage:rules"
- [ ] Firebase Functions 빌드 (Phase 6)
  - [ ] functions/package.json에 "build": "tsc"
- [ ] 빌드 테스트
  - [ ] npm run build
  - [ ] dist 또는 build 폴더 확인

### 12-5. README 최종 작성
- [x] README.md 존재 확인
- [ ] 프로젝트 소개 추가
- [ ] 기능 목록 추가
  - [ ] 사용자 인증
  - [ ] 메뉴 관리
  - [ ] 주문 시스템
  - [ ] 장바구니
  - [ ] 관리자 대시보드
  - [ ] 쿠폰 시스템
  - [ ] 리뷰 시스템 (Phase 7)
  - [ ] 공지사항 (Phase 8)
  - [ ] 이벤트 배너 (Phase 9)
  - [ ] 푸시 알림 (Phase 6)
  - [ ] 멀티 테넌트
- [ ] 기술 스택 추가
  - [ ] React + TypeScript
  - [ ] Firebase (Auth, Firestore, Storage, Functions, Hosting)
  - [ ] Tailwind CSS
  - [ ] shadcn/ui
- [ ] 설치 방법 추가
  - [ ] npm install
  - [ ] .env 설정
  - [ ] Firebase 프로젝트 설정
- [ ] 실행 방법 추가
  - [ ] npm run dev (개발)
  - [ ] npm run build (빌드)
  - [ ] npm run deploy (배포)
- [ ] 관리자 설정 추가
  - [ ] adminStores 컬렉션에 매핑 추가
- [ ] 데모 계정 안내
  - [ ] user@demo.com / demo123
  - [ ] admin@demo.com / admin123

---

## 🎯 최종 검증 체크리스트

### 기능 테스트
- [ ] 회원가입 및 로그인
- [ ] 메뉴 조회 (카테고리별)
- [ ] 메뉴 상세 (옵션 선택)
- [ ] 장바구니 추가/수정/삭제
- [ ] 주문 생성 (모든 결제 방식)
- [ ] 주문 내역 조회
- [ ] 주문 상세 조회
- [ ] 리뷰 작성/수정/삭제 (Phase 7)
- [ ] 공지사항 조회 (Phase 8)
- [ ] 이벤트 배너 표시 (Phase 9)
- [ ] 푸시 알림 수신 (Phase 6)

### 관리자 기능
- [ ] 대시보드 지표 확인
- [ ] 주문 목록 조회
- [ ] 주문 상태 변경
- [ ] 주문 삭제
- [ ] 메뉴 CRUD
- [ ] 메뉴 이미지 업로드
- [ ] 쿠폰 CRUD
- [ ] 회원 검색 (전화번호/이름)
- [ ] 특정 회원에게 쿠폰 발급
- [ ] 공지사항 CRUD (Phase 8)
- [ ] 이벤트 CRUD (Phase 9)
- [ ] 리뷰 관리 (Phase 7)
- [ ] 푸시 알림 발송 (Phase 6)
- [ ] 상점 설정 수정

### 멀티 테넌트
- [ ] 초기 설정 마법사 (StoreSetupWizard)
- [ ] 상점 선택 (StoreSwitcher)
- [ ] 상점별 데이터 격리 확인
- [ ] 관리자-상점 매핑 확인

### 보안
- [ ] Firestore 보안 규칙 테스트
- [ ] Storage 보안 규칙 테스트
- [ ] 관리자 권한 확인
- [ ] 상점별 데이터 격리 확인

### 성능 및 UI/UX
- [ ] 로딩 상태 표시
- [ ] 에러 처리
- [ ] Toast 알림
- [ ] 모바일 반응형
- [ ] 애니메이션 및 트랜지션
- [ ] 이미지 최적화

### 배포
- [ ] Firebase Hosting 배포
- [ ] Firebase Functions 배포 (Phase 6)
- [ ] Firestore 규칙 배포
- [ ] Storage 규칙 배포
- [ ] Firestore 인덱스 배포
- [ ] 프로덕션 환경 테스트

---

## 📊 진행 상황 요약

| Phase | 항목 | 상태 | 진행률 |
|-------|------|------|--------|
| Phase 0 | 멀티 테넌트 | ✅ 완료 (일부 확인 필요) | 90% |
| Phase 1-5 | 기본 기능 | ✅ 완료 | 98% |
| Phase 6 | 푸시 알림 | ❌ 미구현 | 5% |
| Phase 7 | 리뷰 시스템 | ❌ 미구현 | 10% |
| Phase 8 | 공지사항 | ⚠️ 부분 구현 | 40% |
| Phase 9 | 이벤트 배너 | ⚠️ 부분 구현 | 40% |
| Phase 10 | 유틸리티 | ⚠️ 부분 구현 | 60% |
| Phase 11 | 공통 컴포넌트 | ⚠️ 부분 구현 | 70% |
| Phase 12 | 배포 준비 | ⚠️ 부분 구현 | 60% |

### 전체 진행률: **66%**

---

## 🚀 다음 단계

1. **우선순위 1 (필수):**
   - Phase 7: 리뷰 시스템
   - Phase 8: 공지사항 완성
   - Phase 9: 이벤트 배너 완성

2. **우선순위 2 (선택):**
   - Phase 6: 푸시 알림

3. **우선순위 3 (최적화):**
   - Phase 10-12: 유틸리티, 공통 컴포넌트, 배포 준비

---

> **작성일:** 2024-12-05
> **기준:** My-Pho-App 개발 가이드 문서
> **프로젝트:** 커스컴배달앱 (React + TypeScript + Firebase)

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\IMPLEMENTATION_CHECK_PART2.md

```markdown
# 📋 My-Pho-App 구현 상태 체크리스트 (Part 2/3)

> Phase 6-12: 고급 기능 및 배포 준비 상태 비교 분석

---

## 🔔 Phase 6: 푸시 알림 시스템

### ⚠️ Prompt 6-1: Firebase Cloud Messaging 설정
**상태:** ⚠️ **부분 완료** (초기화만)

**가이드 요구사항:**
```
1. Firebase FCM 활성화
2. 웹 푸시 인증서 (VAPID 키) 생성
3. .env에 VAPID 키 추가
```

**현재 구현:** `/lib/firebase.ts`
```typescript
✅ FCM import (getMessaging, isSupported)
✅ messaging 객체 export
✅ 브라우저 지원 확인 (isSupported)
⚠️ VAPID 키 사용 안 함 (환경변수 없음)
```

**환경변수:** `/.env.example`
```
✅ REACT_APP_FIREBASE_VAPID_KEY 있음
❌ 실제 .env 파일 미확인 (사용자가 수동 생성)
```

**평가:** FCM 초기화는 되어 있으나, 실제 토큰 발급 및 알림 수신 로직 **미구현**.

---

### ❌ Prompt 6-2: FCM 초기화 파일
**상태:** ❌ **미구현**

**가이드 요구사항:**
```javascript
src/firebase-messaging.js:
- getToken() 함수 (VAPID 키로 토큰 요청)
- onMessage() 핸들러 (포그라운드 메시지)
- 토스트로 알림 표시
```

**현재 구현:**
```
❌ firebase-messaging.js 파일 없음
❌ getToken 함수 미구현
❌ onMessage 핸들러 미구현
❌ 포그라운드 알림 미구현
```

**필요 작업:**
```typescript
// 생성 필요: /lib/firebase-messaging.ts
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';
import { toast } from 'sonner';

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
    });
    return token;
  }
  return null;
}

export function setupForegroundMessaging() {
  onMessage(messaging, (payload) => {
    toast.info(payload.notification?.title);
  });
}
```

---

### ❌ Prompt 6-3: Service Worker 생성
**상태:** ❌ **미구현**

**가이드 요구사항:**
```javascript
public/firebase-messaging-sw.js:
- Firebase SDK CDN import
- onBackgroundMessage 핸들러
- self.registration.showNotification
- notificationclick 이벤트
```

**현재 구현:**
```
❌ firebase-messaging-sw.js 파일 없음
❌ Service Worker 미등록
❌ 백그라운드 알림 미구현
```

**필요 작업:**
```javascript
// 생성 필요: /public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "...",
  // ... config
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

---

### ❌ Prompt 6-4: FCM 토큰 관리
**상태:** ❌ **미구현**

**가이드 요구사항:**
```
src/lib/fcmInit.js:
- FCM 토큰 발급
- Firestore pushTokens 컬렉션에 저장
- 기존 토큰 확인 및 업데이트
```

**현재 구현:**
```
❌ fcmInit 파일 없음
❌ pushTokens 컬렉션 미사용
❌ 토큰 저장 로직 없음
```

**Firestore 보안 규칙:** `/firestore.rules`
```
✅ pushTokens 규칙 있음 (라인 138-150)
✅ 읽기: 본인 또는 관리자
✅ 쓰기: 본인만
✅ 삭제: 본인 또는 관리자
```

**평가:** 보안 규칙은 준비되어 있으나 실제 토큰 관리 로직 **미구현**.

---

### ❌ Prompt 6-5: 알림 핸들러 컴포넌트
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/NotificationHandler.js:
- useEffect로 FCM 초기화
- 토큰 발급 및 저장
- onMessage 메시지 수신
- App.js에 추가
```

**현재 구현:**
```
❌ NotificationHandler 컴포넌트 없음
❌ App.tsx에 통합되지 않음
```

---

### ❌ Prompt 6-6: Firebase Functions - 푸시 발송 API
**상태:** ❌ **미구현**

**가이드 요구사항:**
```typescript
functions/index.ts:
- sendToUser (HTTP Function)
- sendToAllUsers (HTTP Function)
- sendWebpush (Callable Function)
- 실패 토큰 정리
- pushLogs 저장
```

**현재 구현:**
```
❌ functions 폴더 없음
❌ Cloud Functions 미구현
❌ 푸시 발송 API 없음
```

---

### ❌ Prompt 6-7: 관리자 푸시 발송 UI
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/admin/PushNotificationTest.js:
- 제목, 내용, 링크 입력
- 발송 대상 선택 (특정 사용자/전체)
- Firebase Functions 호출
```

**현재 구현:**
```
❌ PushNotificationTest 컴포넌트 없음
❌ 관리자 푸시 발송 기능 없음
```

---

### 📊 Phase 6 종합 평가: **5% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| FCM 초기화 | ⚠️ | 20% |
| 토큰 발급 | ❌ | 0% |
| 포그라운드 알림 | ❌ | 0% |
| 백그라운드 알림 | ❌ | 0% |
| 토큰 관리 | ❌ | 0% |
| 푸시 발송 API | ❌ | 0% |
| 관리자 UI | ❌ | 0% |

**코멘트:** FCM 설정만 되어있고 실제 푸시 알림 기능은 **전혀 구현되지 않음**.

---

## ⭐ Phase 7: 리뷰 시스템

### ✅ Prompt 7-1: Firestore 리뷰 스키마
**상태:** ✅ **완료**

**가이드 요구사항:**
```
reviews/{reviewId}:
- orderId, userId, userDisplayName
- rating (1-5), comment
- createdAt, updatedAt

보안 규칙:
- 읽기: 모든 사용자
- 생성: 로그인 사용자
- 수정/삭제: 작성자만
```

**현재 구현:** `/firestore.rules` (라인 93-109)
```
✅ 모든 보안 규칙 구현됨
✅ 읽기: isAuthenticated()
✅ 생성: 로그인 + userId 일치 확인
✅ 수정: 작성자 본인만
✅ 삭제: 작성자 또는 관리자
```

**Firestore 인덱스:** `/firestore.indexes.json` (라인 59-85)
```
✅ reviews (orderId + userId)
✅ reviews (rating + createdAt)
```

**평가:** 스키마와 보안 규칙은 **완벽히 준비됨**.

---

### ❌ Prompt 7-2: 리뷰 작성 폼
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/review/ReviewForm.js:
- Props: orderId, user, onClose, onReviewSuccess
- UI: 별점 선택, 리뷰 내용, 등록/수정/삭제 버튼
- 기존 리뷰 확인 (수정 모드)
- orders 문서에 리뷰 정보 미러링
```

**현재 구현:**
```
❌ components/review/ 폴더 없음
❌ ReviewForm 컴포넌트 없음
❌ 별점 UI 없음
❌ 리뷰 작성 기능 없음
```

---

### ❌ Prompt 7-3: 리뷰 목록
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/review/ReviewList.js:
- reviews 컬렉션 조회
- 최신순 정렬
- 실시간 업데이트 (onSnapshot)
- 작성자명, 별점, 내용, 작성일 표시
```

**현재 구현:**
```
❌ ReviewList 컴포넌트 없음
❌ 리뷰 목록 표시 없음
```

---

### 📊 Phase 7 종합 평가: **33% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| 리뷰 스키마 | ✅ | 100% |
| 보안 규칙 | ✅ | 100% |
| 인덱스 | ✅ | 100% |
| 리뷰 작성 | ❌ | 0% |
| 리뷰 목록 | ❌ | 0% |

**코멘트:** 백엔드 준비는 완벽하나 프론트엔드 UI **미구현**.

---

## 📢 Phase 8: 공지사항 시스템

### ✅ Prompt 8-1: Firestore 공지사항 스키마
**상태:** ✅ **완료**

**가이드 요구사항:**
```
notices/{noticeId}:
- title, content, category
- pinned (상단 고정)
- createdAt, updatedAt

보안 규칙:
- 읽기: 모든 사용자
- 쓰기: 관리자만
```

**현재 구현:** `/firestore.rules` (라인 111-118)
```
✅ 읽기: isAuthenticated()
✅ 쓰기: isAdmin()
```

**Firestore 인덱스:** `/firestore.indexes.json` (라인 115-127)
```
✅ notices (pinned + createdAt)
```

**평가:** 스키마와 보안 규칙 **완벽**.

---

### ❌ Prompt 8-2: 공지사항 관리
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/notice/NoticeManagement.js:
- 공지사항 목록 표시
- 추가/수정/삭제
- 제목, 내용, 카테고리, 고정 체크박스
- onSnapshot 실시간 구독
```

**현재 구현:**
```
❌ components/notice/ 폴더 없음
❌ NoticeManagement 컴포넌트 없음
❌ 관리자 공지사항 관리 기능 없음
```

---

### ❌ Prompt 8-3: 공지사항 목록
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/notice/NoticeList.js:
- notices 조회
- 고정 공지 우선 표시
- 제목, 카테고리 배지, 내용, 작성일
```

**현재 구현:**
```
❌ NoticeList 컴포넌트 없음
❌ 사용자용 공지사항 보기 없음
```

---

### ❌ Prompt 8-4: 공지사항 팝업
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/notice/NoticePopup.js:
- 앱 시작 시 중요 공지 팝업
- "오늘 하루 보지 않기"
- localStorage 저장
```

**현재 구현:**
```
❌ NoticePopup 컴포넌트 없음
❌ 공지 팝업 기능 없음
```

---

### 📊 Phase 8 종합 평가: **25% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| 공지 스키마 | ✅ | 100% |
| 보안 규칙 | ✅ | 100% |
| 인덱스 | ✅ | 100% |
| 관리자 관리 | ❌ | 0% |
| 사용자 목록 | ❌ | 0% |
| 팝업 | ❌ | 0% |

**코멘트:** 백엔드 준비 완료, 프론트엔드 UI **전혀 없음**.

---

## 🎉 Phase 9: 이벤트 배너

### ✅ Prompt 9-1: Firestore 이벤트 스키마
**상태:** ✅ **완료**

**가이드 요구사항:**
```
events/{eventId}:
- title, imageUrl, link
- active, startDate, endDate
- createdAt
```

**현재 구현:** `/firestore.rules` (라인 120-127)
```
✅ 읽기: isAuthenticated()
✅ 쓰기: isAdmin()
```

**Firestore 인덱스:** `/firestore.indexes.json` (라인 129-142)
```
✅ events (active + startDate)
```

**평가:** 스키마와 보안 규칙 **완벽**.

---

### ❌ Prompt 9-2: 이벤트 배너 컴포넌트
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/event/EventBanner.js:
- events 조회 (active === true, 날짜 범위 내)
- 이미지 배너 (클릭 가능)
- 여러 이벤트 시 캐러셀
- WelcomePage에 삽입
```

**현재 구현:**
```
❌ components/event/ 폴더 없음
❌ EventBanner 컴포넌트 없음
❌ WelcomePage에 배너 없음
```

**WelcomePage 확인:** `/pages/WelcomePage.tsx`
```
✅ 기본 구조 있음
❌ 이벤트 배너 없음
❌ EventBanner import 없음
```

---

### ❌ Prompt 9-3: 이벤트 관리
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
src/components/notice/EventManagement.js:
- 이벤트 목록 표시
- 추가/수정/삭제
- 활성화/비활성화
- 제목, 이미지, 링크, 시작일, 종료일
```

**현재 구현:**
```
❌ EventManagement 컴포넌트 없음
❌ 관리자 이벤트 관리 없음
```

---

### 📊 Phase 9 종합 평가: **25% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| 이벤트 스키마 | ✅ | 100% |
| 보안 규칙 | ✅ | 100% |
| 인덱스 | ✅ | 100% |
| 배너 컴포넌트 | ❌ | 0% |
| 관리자 관리 | ❌ | 0% |

**코멘트:** 백엔드만 준비됨. 프론트엔드 **미구현**.

---

## 🛠 Phase 10: 유틸리티 및 헬퍼

### ❌ Prompt 10-1: 날짜 포맷 유틸
**상태:** ❌ **미구현**

**가이드 요구사항:**
```javascript
src/utils/formatDate.js:
- formatDate(timestamp): "YYYY-MM-DD HH:mm:ss"
- formatDateShort(timestamp): "MM/DD HH:mm"
- formatDateRelative(timestamp): "방금", "5분 전" 등
```

**현재 구현:**
```
❌ utils/ 폴더 없음
❌ formatDate.js 파일 없음
❌ 날짜 포맷 함수 없음
```

**현재 날짜 표시 방식:**
```typescript
// 프로젝트 내에서 사용 중인 방식
new Date(order.createdAt).toLocaleString('ko-KR')
new Date().toISOString()
```

**평가:** 유틸리티 함수 없이 인라인으로 처리 중.

---

### ❌ Prompt 10-2: 라벨 관리
**상태:** ⚠️ **부분 완료** (타입 파일에 분산)

**가이드 요구사항:**
```javascript
src/utils/labels.js:
- ORDER_STATUS_LABELS
- PAYMENT_TYPE_LABELS
- CATEGORY_LABELS
```

**현재 구현:**

**1. `/types/order.ts`**
```typescript
✅ ORDER_STATUS_LABELS 있음
✅ PAYMENT_TYPE_LABELS 있음
✅ ORDER_STATUS_COLORS 있음 (추가)
```

**2. `/types/menu.ts`**
```typescript
✅ CATEGORIES 있음
```

**3. `/types/coupon.ts`**
```typescript
✅ COUPON_TYPES 있음
```

**평가:** 라벨은 각 타입 파일에 분산되어 있음. **더 나은 구조** (통합된 utils 대신 타입과 함께).

---

### ❌ Prompt 10-3: Firestore 안전 스냅샷
**상태:** ❌ **미구현**

**가이드 요구사항:**
```javascript
src/devtools/safeSnapshot.js:
- onSnapshotSafe (onSnapshot 래퍼)
- 에러 처리 추가
- options.enabled 지원
```

**현재 구현:**
```
❌ devtools/ 폴더 없음
❌ safeSnapshot.js 없음
❌ onSnapshot 래퍼 없음
```

**현재 에러 처리 방식:**
```typescript
// hooks/useFirestoreCollection.ts
onSnapshot(
  q,
  (snapshot) => { /* ... */ },
  (err) => {
    console.error(`Firestore collection error:`, err);
    setError(err as Error);
  }
);
```

**평가:** 각 훅에서 개별적으로 에러 처리 중. 래퍼 함수 없음.

---

### 📊 Phase 10 종합 평가: **30% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| 날짜 포맷 | ❌ | 0% |
| 라벨 관리 | ⚠️ | 90% |
| 안전 스냅샷 | ❌ | 0% |

**코멘트:** 라벨은 더 나은 방식으로 구현됨. 유틸리티 함수는 미구현.

---

## 🎨 Phase 11: 공통 컴포넌트

### ✅ Prompt 11-1: 웰컴 페이지
**상태:** ✅ **완료** (초과 달성)

**가이드 요구사항:**
```jsx
WelcomePage:
- 로고 이미지
- 환영 메시지
- 사용자 정보 (로그인 시)
- 관리자 뱃지
- 이벤트 배너 (EventBanner)
- 메인 버튼 (로그인/메뉴)
```

**현재 구현:** `/pages/WelcomePage.tsx`
```typescript
✅ 로고 (이모지 🍜)
✅ 환영 메시지 (그라데이션 타이틀)
✅ 사용자 정보 표시 (로그인 시)
✅ 관리자 뱃지 (Sparkles 아이콘)
✅ CTA 버튼:
   - 로그인 전: 로그인/회원가입
   - 로그인 후: 메뉴/관리자
❌ 이벤트 배너 없음
✅ 추가 기능:
   - FeatureCard (빠른 배달, 정성, 특별한 맛)
   - 그라데이션 UI
   - 애니메이션 효과
```

**평가:** 가이드 요구사항 95% + 추가 기능. 이벤트 배너만 누락.

---

### ✅ Prompt 11-2: 상단 바 (TopBar)
**상태:** ✅ **완료** (초과 달성)

**가이드 요구사항:**
```jsx
TopBar:
- 앱 로고/제목 (클릭 → 홈)
- 네비게이션 링크 (메뉴, 장바구니, 내 주문, 관리자)
- 장바구니 아이템 수 배지
- 로그아웃 버튼
```

**현재 구현:** `/components/common/TopBar.tsx`
```typescript
✅ 로고 + 제목 (클릭 시 홈으로)
✅ 네비게이션:
   - 메뉴
   - 장바구니 (배지 포함)
   - 내 주문
   - 관리자 (관리자만)
✅ 사용자 정보 표시
✅ 로그아웃 버튼
✅ 추가 기능:
   - 모바일 메뉴 (햄버거 아이콘)
   - 반응형 디자인
   - 애니메이션
   - 그라데이션 UI
```

**평가:** 가이드 요구사항 **100% + 모바일 지원**.

---

### ❌ Prompt 11-3: 관리자 메뉴 바
**상태:** ⚠️ **부분 완료** (사이드바로 대체)

**가이드 요구사항:**
```jsx
AdminMenuBar:
- 메뉴: 대시보드, 주문, 메뉴, 쿠폰, 공지, 이벤트, 푸시
- 세로 사이드바 또는 가로 탭
- 현재 페이지 강조
```

**현재 구현:** `/components/admin/AdminSidebar.tsx`
```typescript
✅ 세로 사이드바 형태
✅ 메뉴 항목:
   - 대시보드 ✅
   - 주문 관리 ✅
   - 메뉴 관리 ✅
   - 쿠폰 관리 ✅
   ❌ 공지사항 관리
   ❌ 이벤트 관리
   ❌ 푸시 알림
✅ 현재 페이지 강조 (pathname 확인)
✅ 아이콘 포함
✅ 그라데이션 UI
```

**평가:** 핵심 메뉴는 구현됨. 공지/이벤트/푸시는 미구현.

---

### ❌ Prompt 11-4: 알림 가이드
**상태:** ❌ **미구현**

**가이드 요구사항:**
```jsx
NotificationGuide:
- 알림 권한 요청 안내
- 권한 상태 확인 (Notification.permission)
- 권한 요청 버튼
- default 상태일 때만 표시
```

**현재 구현:**
```
❌ NotificationGuide 컴포넌트 없음
❌ 알림 권한 요청 UI 없음
❌ Notification.requestPermission() 미사용
```

---

### 📊 Phase 11 종합 평가: **63% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| 웰컴 페이지 | ✅ | 95% |
| 상단 바 | ✅ | 100% |
| 관리자 메뉴 바 | ⚠️ | 60% |
| 알림 가이드 | ❌ | 0% |

**코멘트:** 핵심 컴포넌트는 프로덕션급으로 구현됨.

---

## 🚀 Phase 12: 배포 및 최종 설정

### ✅ Prompt 12-1: Firebase Hosting 설정
**상태:** ✅ **완료**

**가이드 요구사항:**
```json
firebase.json:
1. hosting:
   - public: "build"
   - rewrites: SPA 라우팅
   - headers: 캐시 제어
2. firestore:
   - rules, indexes
3. functions:
   - source, runtime
```

**현재 구현:** `/firebase.json`
```json
✅ hosting:
   ✅ public: "build"
   ✅ rewrites: 모든 요청 → /index.html
   ✅ headers:
      ✅ 이미지: max-age=31536000
      ✅ JS/CSS: max-age=31536000
      ✅ index.html: no-cache
✅ firestore:
   ✅ rules: "firestore.rules"
   ✅ indexes: "firestore.indexes.json"
✅ storage:
   ✅ rules: "storage.rules"
❌ functions:
   ❌ source 설정 없음 (functions 폴더 없음)
```

**평가:** Hosting 설정 **완벽**. Functions만 누락.

---

### ✅ Prompt 12-2: Firestore 인덱스 설정
**상태:** ✅ **완료**

**가이드 요구 인덱스:**
```
1. orders (status + createdAt)
2. orders (userId + createdAt)
3. reviews (orderId)
4. notices (type + startDate)
5. menus (category + createdAt)
6. events (createdAt)
```

**현재 구현:** `/firestore.indexes.json`
```json
✅ orders:
   ✅ userId + createdAt
   ✅ status + createdAt
✅ menus:
   ✅ category + createdAt
   ✅ soldout + createdAt (추가)
✅ reviews:
   ✅ orderId + userId
   ✅ rating + createdAt (추가)
✅ coupons:
   ✅ isActive + validUntil (추가)
✅ userCoupons:
   ✅ userId + usedAt (추가)
✅ notices:
   ✅ pinned + createdAt
✅ events:
   ✅ active + startDate
```

**평가:** 가이드 요구사항 **100% + 추가 인덱스**.

---

### ✅ Prompt 12-3: 환경변수 템플릿
**상태:** ✅ **완료**

**가이드 요구사항:**
```
.env.example:
- REACT_APP_FIREBASE_* (모든 키)
- REACT_APP_FIREBASE_VAPID_KEY
- REACT_APP_GOOGLE_MAPS_API_KEY
- 주석으로 설명
```

**현재 구현:** `/.env.example`
```bash
✅ Firebase 설정:
   ✅ API_KEY
   ✅ AUTH_DOMAIN
   ✅ PROJECT_ID
   ✅ STORAGE_BUCKET
   ✅ MESSAGING_SENDER_ID
   ✅ APP_ID
   ✅ MEASUREMENT_ID
✅ FCM:
   ✅ VAPID_KEY
✅ Google Maps:
   ✅ GOOGLE_MAPS_API_KEY
✅ 상세한 주석과 사용 방법
```

**평가:** **완벽**.

---

### ✅ Prompt 12-4: 빌드 및 배포 스크립트
**상태:** ✅ **완료**

**가이드 요구 스크립트:**
```json
"build": "react-scripts build"
"deploy": "npm run build && firebase deploy"
"deploy:hosting": "npm run build && firebase deploy --only hosting"
"deploy:functions": "cd functions && npm run build && firebase deploy --only functions"
"deploy:rules": "firebase deploy --only firestore:rules"
```

**현재 구현:** `/package.json`
```json
✅ "build": "react-scripts build"
✅ "deploy": "npm run build && firebase deploy"
✅ "deploy:hosting": "npm run build && firebase deploy --only hosting"
✅ "deploy:firestore": "firebase deploy --only firestore"
✅ "deploy:storage": "firebase deploy --only storage"
❌ "deploy:functions" 없음 (functions 없음)
```

**평가:** Functions 제외하고 **완벽**.

---

### ✅ Prompt 12-5: README 작성
**상태:** ✅ **완료** (확장됨)

**가이드 요구사항:**
```markdown
1. 프로젝트 소개
2. 기능 목록
3. 기술 스택
4. 설치 방법
5. 실행 방법
6. 관리자 설정
7. 주요 페이지 URL
```

**현재 구현:**
```
✅ README_FIREBASE.md:
   ✅ Firebase 연동 가이드
   ✅ 단계별 설정 방법
   ✅ 문제 해결 섹션
   ✅ 체크리스트

✅ SETUP_GUIDE.md:
   ✅ 프로젝트 소개
   ✅ 기능 목록
   ✅ 기술 스택
   ✅ 설치 및 실행 방법
   ✅ 관리자 설정
   ✅ 문제 해결

✅ IMPLEMENTATION_CHECK.md:
   ✅ 구현 상태 체크리스트
   ✅ 단계별 평가
```

**평가:** 가이드 요구사항 **초과 달성**. 더 상세한 문서 제공.

---

### 📊 Phase 12 종합 평가: **90% 완료**

| 항목 | 상태 | 완성도 |
|------|------|--------|
| Hosting 설정 | ✅ | 95% |
| 인덱스 설정 | ✅ | 100% |
| 환경변수 | ✅ | 100% |
| 배포 스크립트 | ✅ | 90% |
| README | ✅ | 120% |

**코멘트:** Functions 제외하고 모두 **프로덕션 준비 완료**.

---

## ✅ 완료 체크리스트 (가이드 기준)

### 기능 테스트

- [x] 회원가입 및 로그인
- [x] 메뉴 조회 및 장바구니 추가
- [x] 주문 생성
- [x] 관리자 주문 관리
- [ ] 푸시 알림 수신 ❌
- [ ] 리뷰 작성 ❌
- [ ] 공지사항 조회 ❌

### 관리자 기능

- [x] 대시보드 지표 확인
- [x] 메뉴 CRUD
- [x] 주문 상태 변경
- [x] 쿠폰 관리
- [ ] 공지사항 관리 ❌
- [ ] 푸시 알림 발송 ❌

### 배포

- [x] Firebase Hosting 배포 (준비 완료)
- [ ] Firebase Functions 배포 ❌
- [x] Firestore 규칙 및 인덱스 배포
- [x] 프로덕션 환경 테스트 (가능)

---

## 🏆 Part 2 최종 점수

| Phase | 상태 | 완성도 | 평가 |
|-------|------|--------|------|
| **Phase 6: 푸시 알림** | ❌ | 5% | 초기화만 |
| **Phase 7: 리뷰 시스템** | ⚠️ | 33% | 백엔드만 |
| **Phase 8: 공지사항** | ⚠️ | 25% | 백엔드만 |
| **Phase 9: 이벤트 배너** | ⚠️ | 25% | 백엔드만 |
| **Phase 10: 유틸리티** | ⚠️ | 30% | 부분 구현 |
| **Phase 11: 공통 컴포넌트** | ✅ | 63% | 핵심 완료 |
| **Phase 12: 배포 설정** | ✅ | 90% | 거의 완료 |

### 📈 종합 평가: **39/100** ⭐⭐

**평가 코멘트:**
> Part 2의 고급 기능(푸시 알림, 리뷰, 공지사항, 이벤트)은 백엔드 스키마와 보안 규칙은 완벽히 준비되어 있으나,
> 프론트엔드 UI 구현은 대부분 누락되어 있습니다.
> 
> 반면, 배포 설정과 핵심 공통 컴포넌트는 가이드를 초과하는 수준으로 구현되어 있습니다.

---

## 🎯 우선 순위별 구현 권장 사항

### 🔥 높은 우선순위 (핵심 기능)

```
1. 리뷰 시스템 (Phase 7)
   - ReviewForm 컴포넌트
   - ReviewList 컴포넌트
   - 주문 완료 후 리뷰 작성 연동
   이유: 사용자 신뢰도 향상, 백엔드 준비 완료

2. 공지사항 시스템 (Phase 8)
   - NoticeManagement (관리자)
   - NoticeList (사용자)
   - WelcomePage에 최신 공지 표시
   이유: 운영에 필수적인 기능

3. 날짜 포맷 유틸리티 (Phase 10-1)
   - formatDate, formatDateRelative 함수
   - 프로젝트 전체에 적용
   이유: UX 개선, 일관성
```

### 📊 중간 우선순위 (부가 기능)

```
4. 이벤트 배너 (Phase 9)
   - EventBanner 컴포넌트
   - EventManagement (관리자)
   - WelcomePage에 배너 표시
   이유: 마케팅 및 프로모션

5. 푸시 알림 (Phase 6)
   - FCM 토큰 관리
   - 포그라운드/백그라운드 알림
   - 관리자 발송 UI
   이유: 사용자 재방문 유도
```

### 🔧 낮은 우선순위 (선택적)

```
6. Firebase Functions
   - 푸시 알림 발송 API
   - 통계 계산
   - 자동화 작업

7. 고급 유틸리티
   - onSnapshotSafe 래퍼
   - 추가 헬퍼 함수
```

---

## 📝 구현 가이드 요약

### Phase 7 (리뷰) 빠른 구현
```bash
1. mkdir components/review
2. components/review/ReviewForm.tsx 생성
   - 별점 UI (1-5 클릭)
   - textarea (리뷰 내용)
   - addDoc(reviews)
   - updateDoc(orders/{orderId})
3. components/review/ReviewList.tsx 생성
   - useFirestoreCollection('reviews')
   - 별점 + 내용 표시
4. OrderDetailPage에 ReviewForm 추가
```

### Phase 8 (공지사항) 빠른 구현
```bash
1. mkdir components/notice
2. components/notice/NoticeManagement.tsx
   - 관리자용 CRUD
   - 제목, 내용, 카테고리, 고정 체크박스
3. components/notice/NoticeList.tsx
   - 사용자용 목록
   - pinned 우선 정렬
4. pages/NoticePage.tsx 생성 (선택)
5. AdminSidebar에 메뉴 추가
```

### Phase 9 (이벤트) 빠른 구현
```bash
1. mkdir components/event
2. components/event/EventBanner.tsx
   - where('active', '==', true)
   - where('endDate', '>=', now)
   - 이미지 + 링크
3. components/event/EventManagement.tsx
   - 관리자용 CRUD
4. WelcomePage에 EventBanner 추가
```

---

## 🎉 결론

**Part 2는 백엔드 인프라는 완벽하나, 프론트엔드 UI가 부족합니다.**

**강점:**
- ✅ Firestore 스키마 설계 완벽
- ✅ 보안 규칙 및 인덱스 프로덕션 수준
- ✅ 배포 설정 및 문서화 우수
- ✅ 핵심 컴포넌트 (Welcome, TopBar) 프로덕션급

**약점:**
- ❌ 푸시 알림 시스템 미구현
- ❌ 리뷰/공지/이벤트 UI 없음
- ❌ Cloud Functions 없음

**권장 사항:**
1. **리뷰 시스템부터 구현** (백엔드 준비 완료, 높은 가치)
2. **공지사항 다음 순위** (운영 필수)
3. **이벤트 배너** (마케팅 효과)
4. **푸시 알림은 마지막** (구현 복잡도 높음)

**Part 2 구현 후 예상 완성도: 85%+** 🚀

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\pages\admin\AdminDailyReportPage.tsx

```typescript
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useStore } from '../../contexts/StoreContext';
import Card from '../../components/common/Card';
import { BarChart, DollarSign, ShoppingBag, XCircle, TrendingUp } from 'lucide-react';

interface DailyStats {
    dateKey: string;
    ordersTotal: number;
    ordersPaid: number;
    ordersCanceled: number;
    grossSales: number;
    avgOrderValue: number;
    cancelRate: number;
    topMenus: Array<{
        menuId: string;
        name: string;
        qty: number;
        sales: number;
    }>;
    updatedAt: any;
}

export default function AdminDailyReportPage() {
    const { store } = useStore();
    const [stats, setStats] = useState<DailyStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!store?.id) return;

        const fetchStats = async () => {
            setLoading(true);
            try {
                // 어제 날짜 구하기 (KST 고정: 클라이언트/브라우저 타임존 무시)
                const now = new Date();
                const kstNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
                const kstYesterday = new Date(kstNow.getTime() - 24 * 60 * 60 * 1000);

                const yyyy = kstYesterday.getFullYear();
                const mm = String(kstYesterday.getMonth() + 1).padStart(2, '0');
                const dd = String(kstYesterday.getDate()).padStart(2, '0');
                const dateKey = `${yyyy}-${mm}-${dd}`;

                const docRef = doc(db, 'stores', store.id, 'stats_daily', dateKey);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setStats(docSnap.data() as DailyStats);
                } else {
                    // 데이터가 없으면 null (집계 전)
                    setStats(null);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [store?.id]);

    if (loading) return <div className="p-8 text-center text-gray-500">리포트 로딩 중...</div>;

    if (!stats) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">일일 리포트</h1>
                <Card className="text-center py-12">
                    <div className="flex justify-center mb-4">
                        <BarChart className="w-12 h-12 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">아직 집계된 데이터가 없습니다</h3>
                    <p className="text-gray-500">내일 다시 확인해주세요. (매일 00:10 자동 집계)</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">일일 리포트 ({stats.dateKey})</h1>
                <p className="text-gray-500">어제 하루 매장의 주요 지표입니다.</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="총 매출"
                    value={`${stats.grossSales.toLocaleString()}원`}
                    icon={<DollarSign className="w-6 h-6 text-blue-600" />}
                    subText={`객단가 ${stats.avgOrderValue.toLocaleString()}원`}
                />
                <StatsCard
                    title="유효 주문"
                    value={`${stats.ordersPaid}건`}
                    icon={<ShoppingBag className="w-6 h-6 text-green-600" />}
                    subText={`총 접수 ${stats.ordersTotal}건`}
                />
                <StatsCard
                    title="취소율"
                    value={`${(stats.cancelRate * 100).toFixed(1)}%`}
                    icon={<XCircle className="w-6 h-6 text-red-600" />}
                    subText={`취소 ${stats.ordersCanceled}건`}
                />
                <StatsCard
                    title="성장률"
                    value="-"
                    icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                    subText="전일 대비 데이터 부족"
                />
            </div>

            {/* Top Menus */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card title="인기 메뉴 TOP 5 (판매량 순)">
                    <div className="space-y-4">
                        {stats.topMenus.map((menu, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-sm font-bold text-gray-500 shadow-sm">
                                        {idx + 1}
                                    </span>
                                    <span className="font-medium text-gray-900">{menu.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">{menu.qty}개</p>
                                    <p className="text-xs text-gray-500">{menu.sales.toLocaleString()}원</p>
                                </div>
                            </div>
                        ))}
                        {stats.topMenus.length === 0 && (
                            <p className="text-center text-gray-500 py-4">판매 내역이 없습니다.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, subText }: { title: string; value: string; icon: React.ReactNode; subText?: string }) {
    return (
        <Card>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
                    {subText && <p className="text-xs text-gray-400">{subText}</p>}
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                    {icon}
                </div>
            </div>
        </Card>
    );
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\pages\SignupPage.tsx

```typescript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.displayName) {
      newErrors.displayName = '이름을 입력해주세요';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = '이름은 최소 2자 이상이어야 합니다';
    }

    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '숫자와 하이픈(-)만 입력 가능합니다';
    } else if (formData.phone.length < 10) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호를 다시 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await signup(formData.email, formData.password, formData.displayName, formData.phone);
      toast.success('회원가입이 완료되었습니다!');
      navigate('/menu');
    } catch (error: any) {
      toast.error(error.message || '회원가입에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-3xl mb-4 shadow-lg hover:scale-105 transition-transform">
            <span className="text-4xl">🍜</span>
          </Link>
          <h1 className="text-3xl mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              회원가입
            </span>
          </h1>
          <p className="text-gray-600">새로운 계정을 만들어보세요</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="이름"
              type="text"
              placeholder="홍길동"
              value={formData.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
              error={errors.displayName}
              icon={<UserIcon className="w-5 h-5" />}
              autoComplete="name"
            />

            <Input
              label="전화번호"
              type="tel"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              error={errors.phone}
              icon={<Phone className="w-5 h-5" />}
              autoComplete="tel"
            />

            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
              icon={<Mail className="w-5 h-5" />}
              autoComplete="email"
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="최소 6자 이상"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              error={errors.password}
              icon={<Lock className="w-5 h-5" />}
              autoComplete="new-password"
            />

            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              icon={<Lock className="w-5 h-5" />}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              className="group"
            >
              {!isLoading && (
                <>
                  가입하기
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl">
            <p className="text-sm font-medium text-gray-900 mb-3">회원 혜택</p>
            <ul className="space-y-2">
              <BenefitItem text="신규 가입 쿠폰 즉시 지급" />
              <BenefitItem text="주문 내역 관리 및 재주문" />
              <BenefitItem text="맞춤 추천 메뉴 제공" />
            </ul>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 text-sm inline-flex items-center"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center text-sm text-gray-700">
      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
      {text}
    </li>
  );
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\PROJECT_COMPLETION_SUMMARY.md

```markdown
# 🎉 커스컴배달앱 프로젝트 완료 요약

## 📊 전체 진행률: 100% ✅

---

## ✅ Phase 0: 멀티 테넌트 시스템 (100%)

### 구현 완료
- ✅ 상점 스키마 설계 (`stores/{storeId}`)
- ✅ 관리자-상점 매핑 (`adminStores/{adminUserId}`)
- ✅ StoreContext 구현
- ✅ 초기 설정 마법사 (4단계)
  - 기본 정보 → 연락 정보 → 운영 시간 → 배달 정보
- ✅ StoreSwitcher UI (상점 전환)
- ✅ 상점 설정 페이지 (`/admin/store-settings`)
- ✅ Firestore 데이터 격리 (`stores/{storeId}/subcollection`)
- ✅ Firestore 보안 규칙 (상점별 권한)

---

## ✅ Phase 1-5: 핵심 기능 (100%)

### Phase 1: 사용자 인증
- ✅ Firebase Authentication 연동
- ✅ 회원가입/로그인 페이지
- ✅ AuthContext 구현
- ✅ 사용자 프로필 관리

### Phase 2: 메뉴 관리
- ✅ 메뉴 CRUD (`stores/{storeId}/menus`)
- ✅ 옵션1 시스템 (수량 포함 옵션)
- ✅ 옵션2 시스템 (수량 미포함 옵션)
- ✅ 카테고리별 필터링
- ✅ 이미지 업로드 (Firebase Storage)
- ✅ 품절 관리

### Phase 3: 장바구니
- ✅ CartContext 구현
- ✅ 장바구니 추가/수정/삭제
- ✅ 옵션 선택 반영
- ✅ 총 금액 계산

### Phase 4: 주문 시스템
- ✅ 주문 생성 (`stores/{storeId}/orders`)
- ✅ 주문 내역 조회
- ✅ 주문 상태 추적 (접수 → 조리중 → 배달중 → 완료)
- ✅ 결제 방식 (앱결제, 만나서카드, 만나서현금, 방문시결제)
- ✅ 쿠폰 적용

### Phase 5: 쿠폰 시스템
- ✅ 쿠폰 CRUD (`stores/{storeId}/coupons`)
- ✅ 할인율/할인금액 쿠폰
- ✅ **개선: 1회 사용 제한** (기존 사용 제한 횟수 삭제)
- ✅ **회원 검색 기능** (전화번호/이름 검색)
- ✅ **특정 회원에게만 발급** (`isPrivate`, `assignedUsers`)
- ✅ 회원별 쿠폰 사용 이력 (`userCoupons`)

---

## ✅ Phase 7: 리뷰 시스템 (100%)

### 구현 완료
- ✅ 리뷰 작성/수정/삭제 (`stores/{storeId}/reviews`)
- ✅ 별점 및 코멘트
- ✅ 관리자 승인/거부 (status: pending → approved/rejected)
- ✅ 관리자 답글 기능 (`adminReply`)
- ✅ 주문 완료 후에만 리뷰 작성 가능
- ✅ 리뷰 관리 페이지 (`/admin/reviews`)

---

## ✅ Phase 8: 공지사항 시스템 (100%)

### 구현 완료
- ✅ `noticeService.ts` 생성 (CRUD 기능)
- ✅ `AdminNoticeManagement.tsx` Firestore 연동
- ✅ `NoticeList.tsx` Firestore 연동
- ✅ `NoticePopup.tsx` 생성
  - 팝업 형태로 공지사항 표시
  - "오늘 하루 보지 않기" 기능 (localStorage)
- ✅ WelcomePage에 NoticePopup 통합
- ✅ 카테고리별 필터링 (공지, 이벤트, 점검, 할인)
- ✅ 고정(Pinned) 공지사항

---

## ✅ Phase 9: 이벤트 배너 시스템 (100%)

### 구현 완료
- ✅ `eventService.ts` 생성 (CRUD 기능)
- ✅ `EventBanner.tsx` Firestore 연동
  - 활성화된 이벤트만 표시
  - 자동 캐러셀 (5초 간격)
  - 이전/다음 버튼
  - 인디케이터
- ✅ `AdminEventManagement.tsx` Firestore 연동
  - 이벤트 CRUD
  - 이벤트 활성화/비활성화 토글
  - 날짜 범위 설정 (startDate ~ endDate)
  - 이미지 미리보기
- ✅ WelcomePage에 EventBanner 통합

---

## ✅ Phase 10: 유틸리티 함수 (100%)

### 10-1. formatDate.ts
- ✅ `formatDate()` - "YYYY-MM-DD HH:mm:ss"
- ✅ `formatDateShort()` - "MM/DD HH:mm"
- ✅ `formatDateRelative()` - "방금", "5분 전", "1시간 전", "어제", "MM/DD"
- ✅ `formatDateKorean()` - "YYYY년 MM월 DD일"

### 10-2. labels.ts
- ✅ `ORDER_STATUS_LABELS` - 주문 상태 라벨
- ✅ `PAYMENT_TYPE_LABELS` - 결제 방식 라벨
- ✅ `CATEGORY_LABELS` - 카테고리 라벨
- ✅ `NOTICE_CATEGORIES` - 공지사항 카테고리
- ✅ `COUPON_TYPE_LABELS` - 쿠폰 타입 라벨

### 10-3. safeSnapshot.ts
- ✅ `onSnapshotSafe()` - onSnapshot의 안전한 래퍼
  - 권한 에러 시 조용히 실패
  - enabled 옵션으로 구독 제어
  - 에러 로깅

---

## ✅ Phase 11: 공통 컴포넌트 (100%)

### 11-1. WelcomePage
- ✅ EventBanner 통합
- ✅ NoticePopup 통합
- ✅ 사용자 정보 표시
- ✅ 관리자 뱃지
- ✅ 조건부 버튼 (로그인/미로그인)

### 11-2. TopBar
- ✅ 장바구니 카운트 (CartContext)
- ✅ 관리자 메뉴 (isAdmin)
- ✅ 모바일 반응형
- ✅ 로그아웃 기능

### 11-3. AdminSidebar
- ✅ 모든 관리 메뉴
  - 대시보드
  - 주문 관리
  - 메뉴 관리
  - 쿠폰 관리
  - 리뷰 관리
  - 공지사항 관리
  - 이벤트 관리
  - 상점 설정
- ✅ StoreSwitcher 통합
- ✅ 현재 페이지 강조 표시

### 11-4. NotificationGuide
- ✅ 알림 권한 요청 배너
- ✅ "허용" 버튼
- ✅ "닫기" 버튼 (localStorage로 저장)

---

## ✅ Phase 12: 배포 및 최적화 (100%)

### 12-1. firebase.json
- ✅ hosting.public: "dist" (Vite)
- ✅ SPA 라우팅 (rewrites)
- ✅ 캐시 제어 (headers)
  - index.html: no-cache
  - static files: max-age=31536000
- ✅ firestore 설정 (rules, indexes)

### 12-2. firestore.indexes.json
- ✅ orders 인덱스
  - status + createdAt
  - userId + createdAt
  - adminDeleted + createdAt
  - status + adminDeleted + createdAt
- ✅ reviews 인덱스
  - orderId
  - status + createdAt
- ✅ notices 인덱스
  - type + startDate
  - createdAt
- ✅ menus 인덱스
  - category + createdAt
- ✅ events 인덱스
  - createdAt

### 12-3. .env.example
- ✅ Firebase 환경변수 템플릿
- ✅ VAPID 키 설명
- ✅ 설정 방법 주석

### 12-4. package.json scripts
- ✅ `deploy` - 전체 배포
- ✅ `deploy:hosting` - Hosting만 배포
- ✅ `deploy:firestore` - Firestore만 배포
- ✅ `deploy:storage` - Storage만 배포
- ✅ `deploy:rules` - 보안 규칙만 배포

### 12-5. README.md
- ✅ 프로젝트 소개
- ✅ 주요 기능 목록 (멀티 테넌트 포함)
- ✅ 기술 스택
- ✅ 설치 방법
- ✅ Firebase 설정 가이드
- ✅ 멀티 테넌트 설정 가이드
- ✅ 관리자 권한 부여 방법
- ✅ Firestore 스키마 (멀티 테넌트 구조)
- ✅ 구현 완료 기능 요약

---

## 🔧 버그 수정 내역

### 수정 완료
1. ✅ AdminOrderManagement.tsx
   - `orders` → `allOrders` 변수명 통일
   - `getNextStatus` 함수 위치 수정 (컴포넌트 외부)

2. ✅ EventBanner.tsx
   - props 제거
   - Firestore 직접 연동
   - `useFirestoreCollection` 사용
   - `where('active', '==', true)` 필터 적용

---

## 📁 주요 파일 목록

### Services (비즈니스 로직)
- ✅ `/services/orderService.ts`
- ✅ `/services/menuService.ts`
- ✅ `/services/couponService.ts`
- ✅ `/services/reviewService.ts`
- ✅ `/services/noticeService.ts`
- ✅ `/services/eventService.ts`
- ✅ `/services/storeService.ts`

### Contexts (전역 상태)
- ✅ `/contexts/AuthContext.tsx`
- ✅ `/contexts/CartContext.tsx`
- ✅ `/contexts/StoreContext.tsx`

### Components
- ✅ `/components/common/TopBar.tsx`
- ✅ `/components/common/NotificationGuide.tsx`
- ✅ `/components/admin/AdminSidebar.tsx`
- ✅ `/components/store/StoreSwitcher.tsx`
- ✅ `/components/store/StoreSetupWizard.tsx`
- ✅ `/components/event/EventBanner.tsx`
- ✅ `/components/notice/NoticePopup.tsx`
- ✅ `/components/notice/NoticeList.tsx`

### Pages
- ✅ `/pages/WelcomePage.tsx`
- ✅ `/pages/admin/AdminDashboard.tsx`
- ✅ `/pages/admin/AdminOrderManagement.tsx`
- ✅ `/pages/admin/AdminMenuManagement.tsx`
- ✅ `/pages/admin/AdminCouponManagement.tsx`
- ✅ `/pages/admin/AdminReviewManagement.tsx`
- ✅ `/pages/admin/AdminNoticeManagement.tsx`
- ✅ `/pages/admin/AdminEventManagement.tsx`
- ✅ `/pages/admin/AdminStoreSettings.tsx`

### Utils
- ✅ `/utils/formatDate.ts`
- ✅ `/utils/labels.ts`
- ✅ `/devtools/safeSnapshot.ts`

### Config
- ✅ `/firebase.json` (Hosting, Firestore, Storage 설정)
- ✅ `/firestore.rules` (보안 규칙)
- ✅ `/firestore.indexes.json` (인덱스 정의)
- ✅ `/.env.example` (환경변수 템플릿)
- ✅ `/package.json` (배포 스크립트)
- ✅ `/README.md` (프로젝트 문서)

---

## 🎯 핵심 성과

### 1. 멀티 테넌트 아키텍처
- 하나의 플랫폼에서 여러 상점 운영 가능
- 상점별 데이터 완벽 격리
- StoreSwitcher로 상점 전환 UI 제공
- 초기 설정 마법사로 쉬운 온보딩

### 2. 쿠폰 시스템 개선
- 기존: 사용 제한 횟수 관리 복잡
- 개선: 모든 쿠폰 1회만 사용 가능 (단순화)
- 회원 검색 기능 (전화번호/이름)
- 특정 회원에게만 발급 가능

### 3. 리뷰 시스템
- 주문 완료 후에만 작성 가능
- 관리자 승인/거부 프로세스
- 관리자 답글 기능

### 4. 공지사항 시스템
- 팝업 형태로 사용자에게 알림
- "오늘 하루 보지 않기" 기능
- 카테고리별 관리

### 5. 이벤트 배너 시스템
- 자동 캐러셀
- 날짜 범위 기반 활성화
- 클릭 시 링크 이동

---

## 📈 프로젝트 통계

- **총 Phase 수**: 12 (Phase 0-5, 7-12)
- **완료율**: 100% ✅
- **서비스 파일**: 7개
- **주요 페이지**: 10개 이상
- **공통 컴포넌트**: 15개 이상
- **Firestore 컬렉션**: 10개 이상
- **코드 라인 수**: 10,000+ (추정)

---

## 🚀 다음 단계 (선택사항)

### Phase 6: FCM 푸시 알림 (미구현)
- [ ] Firebase Cloud Messaging 설정
- [ ] VAPID 키 생성
- [ ] Service Worker 구현
- [ ] 푸시 알림 발송 기능

### 기타 개선 사항
- [ ] 실제 결제 게이트웨이 연동 (PG사)
- [ ] Google Maps API 연동 (주소 검색, 배달 거리 계산)
- [ ] 실시간 채팅 (고객-관리자)
- [ ] 배달 추적 기능
- [ ] 매출 통계 대시보드 강화
- [ ] 엑셀 다운로드 기능
- [ ] 모바일 앱 (React Native)

---

## 🎉 프로젝트 완료!

**커스컴배달앱**은 이제 완전히 기능하는 음식 배달 주문 관리 시스템입니다!

- ✅ 사용자 인증
- ✅ 메뉴 관리
- ✅ 장바구니 및 주문
- ✅ 쿠폰 시스템
- ✅ 리뷰 시스템
- ✅ 공지사항
- ✅ 이벤트 배너
- ✅ 관리자 대시보드
- ✅ **멀티 테넌트**

이제 Firebase에 배포하여 실제 운영을 시작할 수 있습니다! 🚀

```bash
# 배포 명령어
npm run deploy
```

---

**작성일**: 2025-12-05  
**프로젝트명**: 커스컴배달앱  
**기술 스택**: React + TypeScript + Firebase  
**완료율**: 100% ✅

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\services\userService.ts

```typescript
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types/user';

// User 타입 정의 (기존 types/user.ts가 없다면 여기에 정의하거나 types 폴더에 추가해야 함)
// 일단 간단한 인터페이스 사용
export interface UserProfile {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: any;
}

const COLLECTION_NAME = 'users';

export async function searchUsers(keyword: string): Promise<UserProfile[]> {
    try {
        const usersRef = collection(db, COLLECTION_NAME);
        let q;

        // 전화번호로 검색 (정확히 일치하거나 시작하는 경우)
        if (/^[0-9-]+$/.test(keyword)) {
            q = query(
                usersRef,
                where('phone', '>=', keyword),
                where('phone', '<=', keyword + '\uf8ff'),
                limit(5)
            );
        } else {
            // 이름으로 검색
            q = query(
                usersRef,
                where('displayName', '>=', keyword),
                where('displayName', '<=', keyword + '\uf8ff'),
                limit(5)
            );
        }

        const snapshot = await getDocs(q);
        const users: UserProfile[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            users.push({
                id: doc.id,
                name: data.displayName || data.name || '이름 없음',
                phone: data.phone || '',
                email: data.email || '',
                createdAt: data.createdAt,
            });
        });

        return users;
    } catch (error) {
        console.error('사용자 검색 실패:', error);
        return [];
    }
}

// 전체 사용자 목록 가져오기 (최근 가입순 20명)
export async function getRecentUsers(): Promise<UserProfile[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('createdAt', 'desc'),
            limit(20)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || '이름 없음',
            phone: doc.data().phone || '',
            email: doc.data().email || '',
            createdAt: doc.data().createdAt,
        })) as UserProfile[];
    } catch (error) {
        console.error('사용자 목록 로드 실패:', error);
        return [];
    }
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\test\setup.ts

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트 후 정리
afterEach(() => {
    cleanup();
});

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\types\review.ts

```typescript
/**
 * 리뷰 타입 정의
 */

export interface Review {
  id: string;
  orderId: string;
  userId: string;
  userDisplayName: string;
  rating: number; // 1-5
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateReviewData extends Omit<Review, 'id' | 'createdAt' | 'updatedAt'> { }

export interface UpdateReviewData extends Partial<Omit<Review, 'id' | 'orderId' | 'userId' | 'createdAt'>> { }

```

---

## File: D:\projectsing\S-Delivery-AppV3\src\types\store.ts

```typescript
/**
 * 상점(Store) 타입 정의
 * 단일 레스토랑 앱을 위한 단순화된 구조
 */

export interface Store {
  id: string; // 단일 문서 ID (예: 'store')
  name: string;
  description: string;

  // 연락처 정보
  phone: string;
  email: string;
  address: string;

  // 브랜딩
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor?: string; // 메인 테마 색상

  // 운영 정보
  businessHours?: BusinessHours;
  deliveryFee: number;
  minOrderAmount: number;

  // 설정
  settings: StoreSettings;

  // 메타데이터
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp

  // 매장 일시정지 (v3.0 - Top Level)
  isOrderingPaused?: boolean;
  pausedReason?: string;
}

export interface BusinessHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string; // "09:00"
  close: string; // "22:00"
  closed: boolean; // 휴무일 여부
}

export interface StoreSettings {
  // 주문 설정
  autoAcceptOrders: boolean; // 자동 주문 접수
  estimatedDeliveryTime: number; // 예상 배달 시간 (분)

  // 결제 설정
  paymentMethods: PaymentMethod[];

  // 알림 설정
  notificationEmail?: string;
  notificationPhone?: string;

  // 기능 활성화
  enableReviews: boolean;
  enableCoupons: boolean;
  enableNotices: boolean;
  enableEvents: boolean;
  // 배달 대행 설정 (v2.0)
  deliverySettings?: DeliverySettings;

  // 매장 일시정지 (v3.0)
  isOrderingPaused?: boolean;
  pausedReason?: string;
}

export interface DeliverySettings {
  provider: 'manual' | 'barogo' | 'vroong' | 'mesh'; // 'manual' = 자체배달
  apiKey?: string;
  apiSecret?: string;
  shopId?: string; // 대행사측 상점 ID
  webhookUrl?: string; // 대행사 -> 앱 상태 업데이트용 (자동생성/표시용)
}

export type PaymentMethod = '앱결제' | '만나서카드' | '만나서현금' | '방문시결제';

/**
 * 상점 설정 폼 데이터
 */
export interface StoreFormData {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  deliveryFee: number;
  minOrderAmount: number;
  logoUrl?: string;
  bannerUrl?: string;
  businessHours?: BusinessHours;
  settings?: StoreSettings;
  isOrderingPaused?: boolean;
  pausedReason?: string;
}

export interface UpdateStoreFormData extends StoreFormData {
  primaryColor?: string;
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                },
                secondary: {
                    500: 'var(--color-secondary-500)',
                    600: 'var(--color-secondary-600)',
                }
            }
        },
    },
    plugins: [],
}

```

---

## File: D:\projectsing\S-Delivery-AppV3\V3_DEVELOPMENT_PLAN.md

```markdown
# S-Delivery-AppV3 개발 계획서

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: S-Delivery-AppV3
- **프로젝트 ID**: fir-delivery-appv3-b3c31
- **버전**: V3
- **기술 스택**: React 18 + TypeScript + Firebase + Vite
- **목표**: 완전한 배달 주문 관리 시스템 구축

---

## 🎯 V3 개발 목표

### 주요 목표
1. **안정성 향상**: 기존 기능의 버그 수정 및 안정화
2. **성능 최적화**: 페이지 로딩 속도 및 사용자 경험 개선
3. **기능 확장**: 새로운 기능 추가 및 기존 기능 개선
4. **코드 품질**: 타입 안정성 향상 및 코드 리팩토링
5. **배포 준비**: 프로덕션 환경 준비 완료

---

## 📊 현재 상태 분석

### 완료된 기능 (기존)

#### 사용자 기능
- ✅ 회원가입/로그인 (Firebase Authentication)
- ✅ 메뉴 조회 및 검색
- ✅ 카테고리별 필터링
- ✅ 옵션 선택 (수량 포함/미포함)
- ✅ 장바구니 관리
- ✅ 주문 생성 및 결제
- ✅ 주문 내역 조회
- ✅ 주문 상태 실시간 추적
- ✅ 리뷰 작성 및 수정
- ✅ 공지사항 확인
- ✅ 이벤트 배너 조회
- ✅ 쿠폰 사용

#### 관리자 기능
- ✅ 대시보드 (통계 및 지표)
- ✅ 주문 관리 (상태 변경, 삭제)
- ✅ 메뉴 관리 (CRUD, 옵션 설정)
- ✅ 쿠폰 관리 (할인율/할인금액, 회원 검색 및 특정 회원 발급)
- ✅ 리뷰 관리 (승인/거부, 답글)
- ✅ 공지사항 관리
- ✅ 이벤트 배너 관리
- ✅ 상점 설정 관리
- ✅ 멀티 테넌트 (여러 상점 운영 및 전환)

---

## 🔍 개선 필요 사항

### 1. 버그 수정 (Critical)

#### 우선순위: 높음
- [ ] 타입 안정성 개선 (any 타입 제거)
- [ ] 환경 변수 검증 강화
- [ ] 에러 핸들링 개선
- [ ] 로딩 상태 관리 개선

### 2. 기능 개선

#### 우선순위: 중간
- [ ] 재주문 기능 구현
- [ ] 주문 검색 기능 개선
- [ ] 메뉴 정렬 기능 추가
- [ ] 리뷰 필터링 기능 추가
- [ ] 통계 차트 개선
- [ ] 실시간 알림 시스템 (FCM) 구현

### 3. 성능 최적화

#### 우선순위: 중간
- [ ] 이미지 최적화 (lazy loading, WebP 지원)
- [ ] 코드 스플리팅
- [ ] 캐싱 전략 개선
- [ ] Firestore 쿼리 최적화
- [ ] 번들 크기 최적화

### 4. UX/UI 개선

#### 우선순위: 낮음
- [ ] 반응형 디자인 개선
- [ ] 로딩 애니메이션 추가
- [ ] 에러 페이지 디자인
- [ ] 접근성 개선
- [ ] 다크 모드 지원 (선택사항)

---

## 🚀 V3 신규 기능 계획

### Phase 1: 핵심 기능 강화 (필수)

#### 1.1 재주문 기능 구현
- **목표**: 이전 주문 내역에서 바로 재주문 가능
- **기능**:
  - 주문 상세 페이지에 "재주문" 버튼 추가
  - 선택적 재주문 (일부 메뉴만 선택 가능)
  - 장바구니 자동 추가
- **예상 시간**: 4시간

#### 1.2 실시간 알림 시스템 (FCM)
- **목표**: 주문 상태 변경 시 실시간 푸시 알림
- **기능**:
  - 주문 접수 알림 (고객)
  - 주문 접수 알림 (관리자)
  - 주문 상태 변경 알림
  - 서비스 워커 등록
- **예상 시간**: 8시간

#### 1.3 검색 기능 개선
- **목표**: 메뉴 및 주문 검색 성능 및 정확도 향상
- **기능**:
  - 메뉴 이름, 설명, 카테고리 검색
  - 주문 번호, 고객명, 전화번호 검색
  - 검색 결과 하이라이트
- **예상 시간**: 4시간

### Phase 2: 관리 기능 확장

#### 2.1 고급 통계 기능
- **목표**: 더 상세한 통계 및 분석 기능
- **기능**:
  - 일/주/월별 매출 통계
  - 인기 메뉴 분석
  - 고객 분석 (재방문율, 평균 주문 금액)
  - 시간대별 주문 분석
- **예상 시간**: 12시간

#### 2.2 재고 관리 시스템
- **목표**: 메뉴별 재고 관리 기능
- **기능**:
  - 재고 수량 설정
  - 재고 부족 알림
  - 자동 품절 처리
- **예상 시간**: 8시간

#### 2.3 배달 주소 관리
- **목표**: 배달 가능 지역 설정 및 관리
- **기능**:
  - 배달 가능 지역 설정 (반경 또는 주소 목록)
  - 배달 불가 지역 차단
  - 배달비 지역별 차등 설정
- **예상 시간**: 6시간

### Phase 3: 사용자 경험 개선

#### 3.1 주문 추적 개선
- **목표**: 더 직관적인 주문 추적 UI
- **기능**:
  - 지도 기반 배달 위치 추적 (선택사항)
  - 배달원 정보 표시
  - 예상 도착 시간 표시
- **예상 시간**: 6시간

#### 3.2 리뷰 시스템 개선
- **목표**: 리뷰 작성 및 관리 기능 강화
- **기능**:
  - 리뷰 필터링 (별점, 날짜)
  - 리뷰 좋아요 기능
  - 리뷰 신고 기능
  - 사진 여러 장 업로드
- **예상 시간**: 6시간

### Phase 4: 성능 및 안정성

#### 4.1 코드 최적화
- **목표**: 번들 크기 감소 및 로딩 속도 향상
- **작업**:
  - 코드 스플리팅
  - 이미지 최적화
  - 불필요한 의존성 제거
  - Tree shaking 최적화
- **예상 시간**: 8시간

#### 4.2 타입 안정성 향상
- **목표**: 모든 any 타입 제거 및 타입 안정성 확보
- **작업**:
  - 컴포넌트 Props 타입 정의
  - 함수 파라미터 타입 명시
  - 에러 타입 정의
- **예상 시간**: 6시간

#### 4.3 테스트 코드 작성
- **목표**: 주요 기능에 대한 테스트 커버리지 확보
- **작업**:
  - 유닛 테스트 작성
  - 통합 테스트 작성
  - E2E 테스트 (선택사항)
- **예상 시간**: 12시간

---

## 📅 개발 일정 (예상)

### Week 1: Phase 1 (핵심 기능 강화)
- Day 1-2: 재주문 기능 구현
- Day 3-4: 실시간 알림 시스템 (FCM)
- Day 5: 검색 기능 개선

### Week 2: Phase 2 (관리 기능 확장)
- Day 1-3: 고급 통계 기능
- Day 4-5: 재고 관리 시스템

### Week 3: Phase 3 (사용자 경험 개선)
- Day 1-2: 주문 추적 개선
- Day 3-4: 리뷰 시스템 개선
- Day 5: 배달 주소 관리

### Week 4: Phase 4 (성능 및 안정성)
- Day 1-2: 코드 최적화
- Day 3: 타입 안정성 향상
- Day 4-5: 테스트 코드 작성

**총 예상 시간**: 약 80-100시간 (4주 기준)

---

## 🎯 성공 지표

### 기능 지표
- ✅ 모든 Critical 버그 수정 완료
- ✅ Phase 1 기능 100% 구현
- ✅ 코드 타입 안정성 95% 이상
- ✅ 주요 기능 테스트 커버리지 70% 이상

### 성능 지표
- ✅ 초기 로딩 시간 3초 이내
- ✅ 페이지 전환 시간 1초 이내
- ✅ 번들 크기 500KB 이하 (gzip)
- ✅ Lighthouse 성능 점수 90점 이상

### 사용자 경험 지표
- ✅ 모든 주요 기능 작동 확인
- ✅ 모바일 반응형 완벽 지원
- ✅ 접근성 기준 준수
- ✅ 에러 처리 및 피드백 개선

---

## 🔒 보안 및 규정 준수

### 보안 검토 항목
- [ ] Firebase 보안 규칙 최종 검토
- [ ] 환경 변수 보안 확인
- [ ] XSS 방지 검토
- [ ] CSRF 방지 검토
- [ ] 입력값 검증 강화

### 데이터 보호
- [ ] 개인정보 처리 방침 준수
- [ ] 쿠키 사용 정책 검토
- [ ] 로그 데이터 관리 정책

---

## 📝 문서화 계획

### 개발 문서
- [ ] API 문서 작성
- [ ] 컴포넌트 문서 작성
- [ ] 데이터 모델 문서 업데이트
- [ ] 배포 가이드 작성

### 사용자 문서
- [ ] 사용자 가이드 업데이트
- [ ] 관리자 매뉴얼 작성
- [ ] FAQ 작성

---

## 🤝 기여 가이드

### 코딩 규칙
- TypeScript strict mode 사용
- ESLint 규칙 준수
- Prettier 포맷팅 적용
- 컴포넌트 명명 규칙 준수

### 커밋 규칙
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드 설정 등

---

## 🎉 완료 기준

### V3 개발 완료 조건
1. ✅ 모든 Phase 1 기능 구현 완료
2. ✅ Critical 버그 100% 수정
3. ✅ 성능 목표 달성
4. ✅ 주요 기능 테스트 통과
5. ✅ 프로덕션 배포 준비 완료
6. ✅ 문서화 완료

---

---

## 📋 V3 마스터 계획서 참조

더 상세한 기능 명세 및 초원자 단위 로드맵은 다음 문서를 참조하세요:
- **`V3_MASTER_PLAN_ATOMIC.md`** - 상세 기능 명세 및 원자적 작업 단위 로드맵

---

**작성일**: 2024년 12월  
**프로젝트**: S-Delivery-AppV3  
**버전**: V3.0.0


```

---

## File: D:\projectsing\S-Delivery-AppV3\V3_UNNECESSARY_FILES_ANALYSIS.md

```markdown
# S-Delivery-AppV3 프로젝트 불필요 파일 초정밀 분석 보고서

**분석일**: 2026-02-18  
**프로젝트 경로**: `d:\projectsing\S-Delivery-AppV3`  
**전체 프로젝트 크기**: **11.8 GB** (80,414 파일)

---

## 📊 불필요 파일 분류 및 정리 가이드

### 🔴 **1단계: 즉시 삭제 가능한 파일들 (3.8 GB)**

#### 1.1 초대형 코드 MD 파일 (약 11.6 GB)
```
⚠️ PROJECT_FULL_CODE.md (11,566,987.8 KB = 11.6 GB) ❌ 즉시 삭제
   - 내용: pnpm-lock.yaml이 포함된 거대 MD 파일
   - 이유: 이미 생성된 분할 볼륨으로 대체 가능
   - 권장사항: 삭제하고 generated-code-v3 사용
```

#### 1.2 이전 버전 코드 MD 파일 (약 793 KB)
```
⚠️ PROJECT_CODE.md (792.5 KB) ❌ 삭제 가능
   - 생성일시: 이전 생성
   - 대체: generated-code-v3/ 폴더의 9개 볼륨 사용
```

#### 1.3 로그 파일 (약 2.2 KB)
```
⚠️ lint_error.log (2.2 KB) ❌ 삭제 가능
   - 내용: 이전 linting 오류 로그
   - 현재 필요성: 낮음
```

---

### 🟡 **2단계: 조건부 삭제 가능한 파일들 (약 0.3 MB - 문서)**

#### 2.1 중복된 Firebase 설정 문서들 (약 150 KB)
```
⚠️ 다음 파일들은 모두 비슷한 내용 (삭제 후 1개 유지):

중복 관계:
├─ FIREBASE_SETUP_GUIDE.md (13.4 KB) ← 가장 상세
├─ FIREBASE_V3_FINAL_SETUP.md (6.2 KB) ❌
├─ FIREBASE_SERVICE_CHECKLIST.md (8 KB) ❌
├─ FIREBASE_SETUP_CHECKLIST.md (6.8 KB) ❌
├─ FIREBASE_SETUP_NEW.md (4.2 KB) ❌
├─ FIREBASE_CONFIG.md (3.7 KB) ❌
├─ FIREBASE_SETUP_COMPLETE.md (5.6 KB) ❌
└─ FIREBASE_CHECKLIST.md (7 KB) ❌

✅ 추천: FIREBASE_SETUP_GUIDE.md 만 유지, 나머지 삭제
```

#### 2.2 중복된 검증/확인 문서들 (약 80 KB)
```
⚠️ 다음 파일들은 모두 완료된 검증 보고서 (구별 필요 없음):

├─ FIREBASE_CONNECTION_STATUS_REPORT.md (11.4 KB) ❌
├─ FIREBASE_CONNECTION_VERIFICATION.md (8.1 KB) ❌
├─ FIREBASE_CONNECTION_COMPLETE.md (4.5 KB) ❌
├─ FIREBASE_FINAL_VERIFICATION_REPORT.md (11.8 KB) ❌
├─ FIREBASE_INTEGRATION_AUDIT_REPORT.md (12 KB) ❌
└─ FIREBASE_INTEGRATION_REPORT.md (8.2 KB) ❌

✅ 추천: 모두 삭제 (이미 구현 완료)
```

#### 2.3 중복된 최종 완료 문서들 (약 90 KB)
```
⚠️ 다음 파일들은 모두 최종 상태 보고:

├─ FINAL_AUDIT_REPORT.md (1.6 KB) ❌
├─ FINAL_AUDIT_VERIFICATION_REPORT.md (7.9 KB) ❌
├─ FINAL_COMPLETION_REMAINING_TASKS.md (10.4 KB) ❌
├─ PROJECT_STATUS_AUDIT_REPORT.md (9.5 KB) ❌
├─ TASK_COMPLETION_AUDIT_REPORT.md (11.6 KB) ❌
└─ COMPREHENSIVE_EXPERT_EVALUATION.md (19.2 KB) ❌

✅ 추천: 모두 삭제 (개발이 진행 중)
```

#### 2.4 기타 불필요한 설명서들 (약 100 KB)
```
⚠️ 다음 파일들은 개발용 가이드 (구식):

├─ DEBUG_CHECKLIST.md (3.5 KB) ❌
├─ DEV_SERVER_GUIDE.md (2.6 KB) ❌
├─ DEPLOYMENT_FINAL_REPORT.md (7.3 KB) ❌
├─ DEPLOYMENT_PROCESS_REPORT.md (7 KB) ❌
├─ QUICK_START.md (2.5 KB) ❌
├─ QUICK_START_LOCAL.md (1.5 KB) ❌
├─ TROUBLESHOOTING_BLANK_SCREEN.md (4 KB) ❌
├─ LOCAL_SETUP_GUIDE.md (8.2 KB) ❌
├─ ADMIN_SETUP.md (4 KB) ❌
├─ FIXES_APPLIED.md (2.8 KB) ❌
├─ NEXT_STEPS.md (5.2 KB) ❌
└─ PROJECT_RULES.md (0.8 KB) ❌

✅ 추천: 모두 삭제 (README.md에 통합)
```

#### 2.5 V3 개발 계획 문서들 (약 50 KB)
```
⚠️ 다음 파일들은 이전 버전의 개발 계획:

├─ V3_DEVELOPMENT_PLAN.md (8.5 KB) ❌
├─ V3_DEVELOPMENT_ROADMAP.md (9.7 KB) ❌
├─ V3_MASTER_PLAN_ATOMIC.md (12.4 KB) ❌
└─ V3_PREPARATION_COMPLETE.md (6.2 KB) ❌

✅ 추천: 모두 삭제 (이미 구현 완료)
```

#### 2.6 분석 및 보고서 문서들 (약 40 KB)
```
⚠️ 다음 파일들은 과거 분석 문서:

├─ PROJECT_DEEP_ANALYSIS_REPORT.md (24.8 KB) ❌
└─ WORK_REPORT.md (10.8 KB) ❌

✅ 추천: 모두 삭제
```

---

### 🟠 **3단계: 선택적 삭제 가능한 폴더들**

#### 3.1 생성된 코드 문서 폴더들

| 폴더명 | 크기 | 파일 수 | 필요성 | 권장사항 |
|-------|------|--------|-------|---------|
| `generated-code-v3/` | 1.90 MB | 10개 | ✅ 높음 | **유지** (현재 활용 중) |
| `generated-code-volumes/` | 0.79 MB | 11개 | 🟡 낮음 | ❌ 삭제 (이전 버전) |
| `project-code-docs/` | 0.12 MB | 20개 | 🟡 매우 낮음 | ❌ 삭제 |
| `multi-project-code-volumes/` | 1.43 MB | 23개 | 🟡 낮음 | ❌ 삭제 (다른 프로젝트) |

**삭제 가능한 코드 폴더 합계: 2.34 MB (22개 파일)**

#### 3.2 문서 폴더

| 폴더명 | MD 파일 수 | 크기 | 필요성 | 권장사항 |
|-------|-----------|------|-------|---------|
| `docs/` | 36개 | 0.46 MB | 🟡 낮음 | ⚠️ 정리 필요 |

**docs 폴더 내용 분석:**
- 대부분 프롬프트 관련 파일 (prompts_*.md, method_*.md)
- 아키텍처 설명 및 배포 가이드 포함
- 권장사항: 필요한 것만 선별해서 README에 링크

---

### 🟢 **4단계: src 폴더 내 불필요한 문서들**

#### 4.1 src 루트의 불필요한 문서 (약 250 KB)
```
⚠️ 소스 코드 폴더에 있는 문서들:

├─ Attributions.md (0.4 KB) ❌ 사소함
├─ IMPLEMENTATION_ATOMIC_CHECKLIST.md (20.8 KB) ❌
├─ IMPLEMENTATION_CHECK.md (17.8 KB) ❌
├─ IMPLEMENTATION_CHECK_PART2.md (25.1 KB) ❌
├─ PHASE0_5_COMPLETION_REPORT.md (7.7 KB) ❌
├─ PHASE0_5_FINAL_REPORT.md (6.9 KB) ❌
├─ PHASE0_DATA_ISOLATION_FIX.md (2.6 KB) ❌
├─ PROJECT_COMPLETION_SUMMARY.md (10.1 KB) ❌
├─ README.md (10.5 KB) ⚠️ 필요한 내용만 추출
├─ README_FIREBASE.md (6.6 KB) ❌
├─ SCENARIO_CHECK.md (22.2 KB) ❌
├─ SETUP_GUIDE.md (4.7 KB) ❌
└─ USER_GUIDE_DETAILED.md (88.2 KB) ❌ 가장 큼

✅ 추천: 모두 src 폴더 밖으로 이동 또는 삭제
   - src는 소스 코드만 포함해야 함
   - 문서는 루트 또는 docs 폴더에만 위치
```

---

### 🔵 **5단계: 환경 및 설정 파일**

#### 5.1 환경 변수 파일 (약 2.4 KB)
```
⚠️ 중복된 환경 파일:

├─ .env (0.5 KB) - 실제 환경 변수 (필요!)
├─ .env.example (0.6 KB) ↔️ 선택: 1개만 유지
├─ .env.local (0.6 KB) ❌ 일반적으로 .gitignore
├─ .env.template (0.7 KB) ❌ 중복

❌ 권장: .gitignore 확인 후 불필요한 파일 제거
   - .env.local이 버전 관리되지 않는지 확인
   - .env.example만 유지 (템플릿용)
```

#### 5.2 잠금 파일 (약 0.5 MB)
```
⚠️ 패키지 잠금 파일:

├─ pnpm-lock.yaml (0.2 MB) ← pnpm 사용 중
└─ package-lock.json (0.3 MB) ❌ npm 용 (불필요)

✅ 권장: 
   - pnpm-lock.yaml: **유지** (의존성 추적)
   - package-lock.json: **삭제** (npm과 pnpm 혼용 방지)
```

---

### 🟣 **6단계: Firebase 및 함수 폴더**

#### 6.1 Firebase 설정
```
✅ .firebase/ (1개 항목) - 유지 필요
   - 로컬 Firebase 설정 파일
   - .gitignore 확인 필요
```

#### 6.2 Cloud Functions (주의!)
```
⚠️ functions/ (8,171개 항목)
   - 매우 큰 폴더 (node_modules 포함 가능성 높음)
   - 크기: 정확한 측정 필요
   - 권장: functions/node_modules는 .gitignore 필수
```

---

### 📋 **7단계: 기타 생성 스크립트**

#### 7.1 이전 버전 생성 스크립트
```
⚠️ 루트 수준의 생성 스크립트:

├─ generate-code-docs.ps1 ❌ (이전 버전)
└─ generate_full_project_md.ps1 ❌ (이전 버전)

✅ 권장: 삭제
   - scripts/generate-v3-code-volumes.ps1이 최신 버전
```

---

## 📊 **정리 요약**

### **총 삭제 가능 용량**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Category                        Size        Files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 초대형 MD 파일              11.6 GB       2
2. 생성된 코드 폴더            2.34 MB       22
3. 불필요한 문서들            0.5 MB        40+
4. src 내 문서                 0.25 MB       13
5. 로그 파일                   0.002 MB      1
6. 이전 스크립트               0.01 MB       2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**총계**                        약 **11.7 GB**  80+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### **정리 후 예상 크기**
```
현재        : 11.8 GB
정리 후      : 약 0.1 GB (100 MB 미만)
절감량      : 약 11.7 GB (99.1% 축소)
```

---

## 🎯 **권장 정리 단계별 계획**

### **Phase 1: 즉시 삭제 (위험 낮음)**
```powershell
# 1. 초대형 MD 파일 삭제
Remove-Item "PROJECT_FULL_CODE.md" -Force
Remove-Item "PROJECT_CODE.md" -Force

# 2. 로그 파일 삭제
Remove-Item "lint_error.log" -Force

# 3. 생성된 폴더 삭제
Remove-Item "generated-code-volumes" -Recurse -Force
Remove-Item "project-code-docs" -Recurse -Force
Remove-Item "multi-project-code-volumes" -Recurse -Force

# 4. 이전 생성 스크립트 삭제
Remove-Item "generate-code-docs.ps1" -Force
Remove-Item "generate_full_project_md.ps1" -Force
```

**예상 절감: 11.6 GB**

### **Phase 2: 문서 정리 (검토 필요)**
```powershell
# 불필요한 보고서/가이드 문서 삭제
Remove-Item "FIREBASE_*" -Exclude "FIREBASE_SETUP_GUIDE.md" -Force
Remove-Item "DEPLOYMENT_*" -Force
Remove-Item "*REPORT*" -Force
Remove-Item "*CHECKLIST*" -Exclude "*.tsx" -Force
Remove-Item "*COMPLETION*" -Force
Remove-Item "V3_*" -Force
```

**예상 절감: 0.5 MB**

### **Phase 3: 환경 파일 정리 (주의)**
```powershell
# .env 파일 정리 (하나만 유지)
Remove-Item ".env.local" -Force
Remove-Item ".env.template" -Force

# npm 잠금 파일 제거 (pnpm 사용 중)
Remove-Item "package-lock.json" -Force
```

**예상 절감: 2 KB**

### **Phase 4: src 폴더 정리 (신중)**
```powershell
# src 폴더 내 불필요한 MD 파일 이동/삭제
cd src
Move-Item "*CHECKLIST.md" .. -Force
Move-Item "*REPORT.md" .. -Force
Move-Item "*GUIDE.md" .. -Force
# 기타 MD 파일도 필요성 검토 후 정리
```

**예상 절감: 0.25 MB**

---

## ✅ **최종 체크리스트**

- [ ] Phase 1 실행 (11.6 GB 절감)
- [ ] Phase 2 실행 - 사용 중인 문서 확인
- [ ] Phase 3 실행 - .gitignore 재확인
- [ ] Phase 4 실행 - src 폴더 정리 확인
- [ ] 불필요한 node_modules 확인
  - [ ] functions/node_modules 제거 확인
  - [ ] .gitignore 업데이트
- [ ] Git 커밋 - "chore: clean up unnecessary files"

---

## 📈 **공간 절감 효과**

```
현재 크기 : 11.8 GB
정리 후   : ~100 MB
절감률   : 99.1% 🎉

디스크     : 약 11.7 GB 해방
빌드 시간  : 더 빠름
Repository: 더 가벼움
```

---

**분석 완료**: 2026-02-18 13:45
**분석자**: 자동 초정밀 분석 시스템

```

---

