<div align="center">

<h2> MOZZA </h2>
<br/>
</div>

<h2> 👥 Team </h2>

### 👨‍💻 팀원 정보

<table align="center">
    <tr align="center">
        <td style="min-width: 300px;">
            <a href="https://github.com/HelloSJ00">
              <!-- <img src="" width="300"> -->
              <br />
              <b>오승준</b>
            </a> 
        </td>
        <td style="min-width: 300px;">
            <a href="https://github.com/hyewonny2327">
              <!-- <img src="" width="300"> -->
              <br />
              <b>윤혜원</b>
            </a>
        </td>
    <tr align="center">
        <td>
            FE
        </td>
        <td>
            FE
        </td>
    </tr>
</table>

<br/>

### 👨‍💻 팀원 역할 분담

<table>
    <tr align="center">
        <td>
            오승준
        </td>
        <td>
        초기세팅, 타임테이블, ,일정등록 페이지,일정결과 및 관리 페이지
        </td>
    </tr>
    <tr align="center">
        <td>
            윤혜원
        </td>
        <td>
          공통 컴포넌트, 메인페이지, 로그인, 마이페이지, 만료페이지
        </td>
    </tr>
</table>
<br/>

## 🛠 기술 스택

| 역할                 | 종류                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                |
| Framework            | ![next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
| Programming Language | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)                                                                                             |
| Styling              | ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white)                                                                       |
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![ReactQuery](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)                                                                                                               |
| State Manager        | ![redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) |
| Package Manager      | ![Npm](https://img.shields.io/badge/Npm-2C8EBB?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                   |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)  |

<br />

<br/>

## 🎋 브랜치 전략

- 브랜치 전략
  - `feature/담당자명`
    - feature/SeungJun
  - `담당자명/기능설명`
    - SeungJun/Main
  ```js
  develop
  ㄴ feature/SeungJun
  	ㄴ SeungJun/Main
  ```
- 반드시 **직속 상위 브랜치**로 머지
- ↩️ PR은 1명 이상이 확인하면 merge (모두가 코드리뷰할 필요 없으나 반드시 한명은 확인해야 함)

### 📚 커밋 컨밴션
- 커밋메세지 : 한글
- gitmoji 사용 
<br/>

## 📁 폴더 구조

```
├── 📁 .next
├── 📁 node_modules
├── 📁 public
├── 📁 src
        └── 📁 app
            ├── 📁 components
            │   └── 📁 common
            ├── 📁 constants
            ├── 📁 hooks
            ├── 📁 slice
            ├── 📁 pages
            └── 📁 utils
├── .eslintrc.json
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

📁 src/app/components ⇒ 공통 컴포넌트<br/>
📁 src/app/constants ⇒ 전역적으로 사용되는 <br/>
📁 src/app/hooks ⇒ 커스텀 훅<br/>
📁 src/app/slice ⇒ Redux 상태관리<br/>
📁 src/app/pages ⇒ 라우팅 페이지<br/>
📁 src/app/utils ⇒ 라이프사이클이랑 관련없는 공용 함수

## 📁 폴더 및 컴포넌트 명명 규칙 

- PascalCase 형식
- 디렉토리 폴더명은 주로 소문자
- 직접적으로 바로 컴포넌트들이 들어있지 않은 폴더명은 소문자로!
- 함수명은 camelCase (첫 시작은 소문자)