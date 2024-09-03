### 👩‍👧‍👧 Our Team

| **🍀 [김지훈](https://github.com/)** | **🍀 [박다희](https://github.com/)** | **🍀 [신성우](https://github.com/)** |
| :-----------------------------------: | :-----------------------------------: | :---------------------------------: |
| **FrontEnd Developer**               | **FrontEnd Developer, Designer**       | **FrontEnd Developer**      |
|  프로젝트 개발 환경 설정<br/> 프로젝트 초기 구조 구축 <br/> | 프로젝트 디자인 작업 <br/> 와이어프레임 작성  |                          |


## 배포 주소

> **개발 버전** : [https://onmom-client.vercel.app/](https://onmom-client.vercel.app/)

## 필수 요구 사항

- **Node.js**: 
  - **최소 버전**: 16.x
  - **권장 버전**: 18.x 이상
- **npm**:
  - **최소 버전**: 7.x
  - **권장 버전**: 8.x 이상

## 시작하기

### 1. 저장소 클론

먼저, 이 저장소를 클론합니다:

```bash
git clone https://github.com/OnMomAiHackathon/onmom-client.git

# 디렉토리 이동 :
cd repository-name
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

개발 모드에서 프로젝트를 실행하려면 다음 명령어를 사용합니다:

```bash
npx next dev
```

### 4. 프로덕션 빌드

배포할 수 있는 정적 파일을 빌드하려면 다음 명령어를 사용하세요:

```bash
npm next build
```

## 🐈 Stacks 

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-18181B?style=for-the-badge&logo=zustand&logoColor=white)

### Communication

![Mattermost](https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## 📖 Directory

```
📦app
 ┣ 📂(child)
 ┃ ┣ 📂album
 ┃ ┃ ┣ 📂Types
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📂Diary
 ┃ ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📂Share
 ┃ ┃ ┣ 📂_data
 ┃ ┃ ┣ 📂_utill
 ┃ ┣ 📂create-group
 ┃ ┣ 📂groups
 ┃ ┣ 📂invite-code
 ┃ ┃ ┣ 📂[inviteCode]
 ┃ ┃ ┃ ┣ 📂group-join-success
 ┃ ┃ ┃ ┣ 📂wait-queue
 ┃ ┃ ┣ 📂_sections
 ┃ ┣ 📂join-group
 ┃ ┣ 📂pills
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_sections
 ┃ ┃ ┣ 📂_utils
 ┃ ┣ 📂question
 ┃ ┣ 📂signin
 ┃ ┃ ┣ 📂_components
 ┃ ┣ 📂signup
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_utils
 ┃ ┣ 📂userinfo
 ┃ ┃ ┣ 📂_components
 ┃ ┣ 📂(parent)
 ┃ ┃ ┣ 📂interview
 ┃ ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📂_sections
 ┃ ┃ ┃ ┣ 📂_utils
 ┣ 📂actions
 ┣ 📂api
 ┃ ┣ 📂createGroup
 ┃ ┣ 📂createInviteCode
 ┃ ┣ 📂createPillInfo
 ┃ ┣ 📂deleteUser
 ┃ ┣ 📂getDiary
 ┃ ┣ 📂getGroupId
 ┃ ┣ 📂getGroupInfo
 ┃ ┣ 📂getMedicationInfo
 ┃ ┣ 📂getMonthDiary
 ┃ ┣ 📂getPillInfo
 ┃ ┣ 📂getUserInfo
 ┃ ┣ 📂joinGroup
 ┃ ┣ 📂signin
 ┃ ┣ 📂signOut
 ┃ ┣ 📂signup
 ┃ ┗ 📂uploadInterview
 ┣ 📂constants
 ┣ 📂stt
 ┣ 📂types
 ┣ 📂_components
 ┣ 📂_utils
```
