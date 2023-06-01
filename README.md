# KoLiving 서비스

## Setup

### 패키지 설치

- Package manager: yarn
- node version: 18.13.0
- Npm version manager: nvm

```bash
# node 버전 설정
nvm use

# 패키지 설치
yarn install
```

## 개발 서버 실행

```bash
# local 환경 개발 서버
yarn dev
```

## 빌드 후 서버 띄우기

```bash
# build
yarn build

# start
yarn start
```

## Font

- Poppins
- pretendard
- 호출 위치: `styles/globals.css`

## 전역 css

- `styles/globals.css`
  - 내용
    - tailwind css 적용
    - 폰트 적용 (poppins, pretendard)

## tailwind css

- tailwind.config.js
  - 스타일 시스템의 컬러, 폰트 설정을 추가함 (theme.extend.colors, theme.extend.fontFamily)
  - html 태그에 컬러 적용: text-r1, bg-h1 etc...
  - 폰트 스타일 적용: font-poppins, font-pretendard
  - 기타 추가값 (스크린 사이즈 등) 이 필요할 경우 tailwind.config.js 에 추가하면 됨

## 깃 전략

- 현재 시점 (dev 를 따로 두지 않음)
  - main 브랜치에서 작업 브랜치 생성
  - 작업 브랜치에서 작업
  - 작업 브랜치에서 main 브랜치로 merge request
  - merge

## 커밋 컨벤션

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리펙토링
- test : 테스트 코드, 리펙토링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정

- 예시 >> [feat] 로그인 기능 추가

## 도커 빌드

```bash
# build
docker-compose build

# start
docker-compose up -d
```

- 추후 서비스가 추가될 것을 대비하여 docker-compose 를 만들어놓음 (컨테이너를 여러개 띄우기 쉽게 만든 것)
- 3000번으로 뜬 Next.js 를 80번 포트로 연결하여 도커를 띄운다

## 배포 스크립트

- .github/workflows/docker-image.yml
  - KoLiving_FE 리포지토리에서 발생한 푸시 이벤트일 때에만 작동하도록 해놓음
  - 각 secrets 키는 리포지토리에 설정이 되어있으며, 필요 시 공유함
