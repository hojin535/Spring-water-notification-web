# 먹는샘물 위반 알림 - 이메일 구독 서비스

Next.js로 구현한 먹는샘물 위반 사례 이메일 알림 구독 웹 애플리케이션입니다.

## ✨ 주요 기능

- 📧 **이메일 구독** - 간편한 이메일 입력으로 위반 알림 구독
- ✅ **구독 확인** - 이메일 링크를 통한 안전한 구독 인증
- 🔔 **실시간 알림** - 새로운 위반 사례 발견 시 즉시 이메일 발송
- 🎨 **모던한 UI** - 그라데이션과 애니메이션을 활용한 세련된 디자인
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크톱 모두 지원

## 🚀 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 백엔드 API URL을 설정하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

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

이 프론트엔드는 다음 백엔드 API 엔드포인트와 연동됩니다:

- `POST /api/subscribe` - 이메일 구독 신청
- `GET /api/subscribe/confirm/{token}` - 구독 확인
- `GET /api/unsubscribe/{token}` - 구독 취소

### CORS 설정

백엔드에서 프론트엔드 도메인을 허용하도록 CORS를 설정해야 합니다:

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

백엔드의 `.env` 파일에서 `BASE_URL`을 설정:

```env
BASE_URL=http://localhost:3000
```

## 🛠️ 기술 스택

- **프레임워크**: [Next.js 14](https://nextjs.org/) (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **스타일링**: CSS + Tailwind 유틸리티
- **상태 관리**: React Hooks

## 📸 스크린샷

메인 페이지에서 사용자는 이메일을 입력하고 구독할 수 있습니다.

## 🎨 디자인 특징

- **그라데이션 배경**: 청록-보라-핑크 그라데이션으로 현대적인 느낌
- **부드러운 애니메이션**: 페이드인 효과로 요소가 자연스럽게 나타남
- **글래스모피즘**: 반투명 카드 스타일
- **접근성**: ARIA 라벨과 키보드 네비게이션 지원

## 📝 사용 방법

1. **구독 신청**

   - 메인 페이지에서 이메일 주소 입력
   - "구독하기" 버튼 클릭
   - 이메일로 발송된 확인 링크 클릭

2. **구독 확인**

   - 이메일의 확인 링크 클릭
   - 자동으로 구독이 활성화됨
   - 3초 후 메인 페이지로 리다이렉트

3. **구독 취소**
   - 이메일의 구독 취소 링크 클릭
   - 즉시 구독이 취소됨

## 🔒 보안 및 개인정보

- 이메일 주소는 안전하게 암호화되어 저장됩니다
- 구독 확인 토큰은 일회성으로 사용됩니다
- 언제든지 구독을 취소할 수 있습니다

## 📦 빌드

프로덕션 빌드:

```bash
npm run build
npm start
```

## 📄 라이선스

© 2025 먹는샘물 위반 알림. All rights reserved.

## 🤝 기여

이슈와 PR을 환영합니다!

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.
