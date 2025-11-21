# 올페이즈 프론트엔드 개발자 채용과제_정은비

## 1. 프로젝트 소개
" 올페이즈 프론트엔드 채용 과제로 제작한 PG 대시보드입니다.  
" 제공된 API(`https://recruit.paysbypays.com/api/v1`)를 기반으로 대시보드, 결제내역, 가맹점 정보등을 시각화하였습니다.

---

## 2. 개발 환경

- Node.js: 20.19.0
- Frontend Framework: React 18 + TypeScript
- Bundler: Vite
- 상태관리: Redux Toolkit
- 서버 State 관리: React Query
- 스타일: CSS Modules
- 차트: recharts

---

## 3. 실행 방법

1. 설치
```
npm install vite@latest .
npm install recharts
npm install redux react-redux @reduxjs/toolkit
npm install react-router-dom @tanstack/react-query axios
npm install recharts

2. 실행
```
npm run dev

3. 환경변수(.env)
```
VITE_API_BASE_URL=https://recruit.paysbypays.com/api/v1

---

## 4. 주요기능
1. 대시보드
- 요약카드 : 월간 매출, 거래수, 성공률/환불률 요약
- 결제수단 비율 : 전체 결제수단 원형 차트
- 최근거래 추이 : 일주일/1개월/3개월 기간으로 거래 그래프 
- 최근 거래 : 최근거래 10건 거래정보 표

2. 결제 내역
- 결제 내역 필터 : 결제 상태, 결제수단, 가맹점 코드, 결제 코드, 기간 조회 선택 필터링
- 결제 요약 : 필터링한 결과의 거래건수, 총 매출액, 총 환불액, 환불비율 요약 출력
- 결제 내역 표

3. 가맹점 정보
- 가맹점 목록 : 전체 가맹점 리스트 출력
- 가맹점 상세보기 : 리스트에서 선택한 가맹점 정보 상체 출력

---

## 5. UI 디자인 컨셉
1) 좌측 고정 사이드바와 콘텐츠 중심 레이아웃으로 관리자가 정보를 빠르게 탐색할 수 있도록 구성했습니다.

2) 라이트/다크 모드를 지원하고, 파란 계열의 컬러를 사용해 깔끔하고 눈에 편한 사용자 경험을 제공합니다.

3) 매출·거래건수·성공률·결제수단 비율·추이 그래프 등 핵심 데이터를 직관적으로 확인할 수 있도록 컴포넌트를 시각화 중심으로 설계했습니다.

---

## 6. 연락처
- 정은비
- obking0014@naver.com