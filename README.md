# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# PG Dashboard (과제명)

## 1. 프로젝트 소개

브런치페이먼츠 채용 과제로 제작한 PG 대시보드입니다.  
채용 전용 API(`https://recruit.paysbypays.com/api/v1`)를 사용하여  
가맹점/거래 데이터를 조회하고 대시보드 형태로 시각화합니다.

- 필수 페이지
  - 대시보드 화면
  - 거래 내역 리스트 화면
- 추가 페이지
  - (있다면: 예시) 가맹점 리스트, 정산 요약 등

---

## 2. 개발 환경 / 사용 기술

- Node.js: 20.x LTS
- 패키지 매니저: npm
- 프레임워크: React 18 + Vite + TypeScript
- 상태 관리
  - React Query: 서버 상태(거래, 통계 데이터) 관리
  - Redux Toolkit: 전역 필터/UI 상태 관리
- 라우팅: React Router DOM
- HTTP 클라이언트: Axios
- 스타일링: (예: MUI / Tailwind / CSS Modules 등)  
  - 템플릿 사용 여부: 직접 디자인 또는 사용한 템플릿 이름/출처

---

## 3. 실행 방법

### 3.1. 사전 준비

- Node.js 20.x 버전이 설치되어 있어야 합니다.

```bash
node -v  # 20.x인지 확인
