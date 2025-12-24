# 먹는샘물 안심 알리미 - 이메일 구독 서비스

폭우나 지진은 재난 문자가 오는데, 왜 매일 마시는 물의 오염은 아무도 알려주지 않을까요? 우리는 수질 위반이 발생해도, 뉴스가 나오기 전까진 오염된 물을 마셔야 하는 안전 사각지대에 살고 있습니다.

'먹는샘물 안심 알리미'는 정부 데이터를 24시간 감시하여, 위반 즉시 재난 문자처럼 여러분께 경고를 보냅니다. 나와 내 가족의 생존을 위한 필수 앱, 이제 '알고 마시는 권리'를 챙기세요.

## ✨ 주요 기능

- 📧 **이메일 구독**: 간편한 이메일 입력으로 먹는샘물 위반 알림을 구독합니다.
- ✅ **안전한 구독 확인**: 이메일로 전송된 확인 링크를 통해 안전하게 구독을 인증합니다.
- 🔔 **실시간 위반 알림**: 새로운 위반 사례가 발견되면(15분 주기) 즉시 이메일로 알림을 보냅니다.
- 📖 **전문용어 해설**: 어려운 검사 항목 용어를 AI를 통해 알기 쉽게 번역하여 제공합니다.
- 🗺️ **취수원-브랜드 연동**: 환경부 데이터를 기반으로 어떤 브랜드의 샘물이 문제인지 명확히 알려줍니다.
- 🎨 **모던한 UI**: 그라데이션과 애니메이션을 활용한 세련된 디자인을 제공합니다.
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 모든 기기에서 최적화된 화면을 지원합니다.

## 🛠️ 기술 스택

- **프레임워크**: [Next.js 14](https://nextjs.org/) (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **스타일링**: CSS + Tailwind 유틸리티
- **상태 관리**: React Hooks
- **백엔드**: FastAPI (Python)
- **메일링**: Google SMTP

## 🚀 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

루트 디렉터리에 `.env.local` 파일을 생성하고 백엔드 API의 URL을 설정하세요.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인할 수 있습니다.

## 📝 사용 방법

1.  **구독 신청**: 메인 페이지에서 이메일 주소를 입력하고 "구독하기" 버튼을 클릭합니다.
2.  **구독 확인**: 입력한 이메일로 발송된 확인 링크를 클릭하면 구독이 활성화됩니다. 3초 후 메인 페이지로 자동 이동합니다.
3.  **구독 취소**: 알림 이메일에 포함된 "구독 취소" 링크를 클릭하여 언제든지 구독을 취소할 수 있습니다.

## 📁 프로젝트 구조

```
.
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── page.tsx                      # 메인 페이지
│   ├── globals.css                   # 전역 스타일
│   ├── subscribe/
│   │   └── confirm/[token]/          # 구독 확인 페이지
│   └── unsubscribe/[token]/          # 구독 취소 페이지
├── components/                       # React 컴포넌트
│   ├── EmailSubscriptionForm.tsx     # 이메일 구독 폼
│   └── ui/                           # 재사용 가능한 UI 컴포넌트
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Alert.tsx
├── lib/
│   └── api.ts                        # API 호출 함수
└── types/
    └── api.ts                        # TypeScript 타입 정의
```

## 🔌 백엔드 연동

이 프론트엔드 프로젝트는 다음의 백엔드 API 엔드포인트와 연동됩니다.

- `POST /api/subscribe` - 이메일 구독 신청
- `GET /api/subscribe/confirm/{token}` - 구독 확인
- `GET /api/unsubscribe/{token}` - 구독 취소

CORS 및 `BASE_URL` 설정이 백엔드 서버에 필요합니다.

### CORS 설정 (FastAPI 예시)

백엔드에서 프론트엔드 도메인을 허용하도록 CORS를 설정해야 합니다.

```python
# FastAPI 예시
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 프론트엔드 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### BASE_URL 설정

백엔드의 `.env` 파일에서 프론트엔드의 `BASE_URL`을 설정해야 합니다.

```env
BASE_URL=http://localhost:3000
```

## 📦 프로덕션 빌드

```bash
npm run build
npm start
```
