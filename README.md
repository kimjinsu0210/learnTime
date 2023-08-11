## ⛔️ 런타임 (Learntime)

프론트엔드 비기너 스터디 커뮤니티

---

## 팀구성

| 임지영 | 김진수 | 제준영 | 백연주 | 전수정 |

---

## 사용 STACKS

- **TypeScript**
- **Supabase**
- **Zustand**
- **Tailwind CSS**
- React
- HTML
- Github
- ReactQuery(TanstackQuery)

---

## 깃 플로우 전략

- main
- dev
- feat
  - category/
  - detail/
  - comment
  - header
  - footer
  - modal

---

## 커밋 컨벤션

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Docs: 문서 변경
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- Refactor: 코드 리팩토링 (변수명 변경 등)
- Chore: 설정 변경 등 기타 변경사항
- Design: HTML, CSS 등 사용자 UI 디자인 변경
- Resolve: 충돌 해결

---

## 코드 컨벤션

### 폴더, 파일명

컴포넌트 파일명은 파스칼 케이스(PascalCase)를 사용한다.

```javascript
MainComponent.jsx;
Route.jsx;
```

컴포넌트를 제외한 폴더, 파일명은 카멜 케이스(camelCase)를 사용한다.

```javascript
components;
modules;
configStore.js;
```

### 함수

함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

```javascript
function nameOfFunction() {
  // ...some logic
}
```

### 변수명

상수는 모두 대문자로 쓰며 띄어쓰기는 \_로 처리하며, 객체타입의 경우 카멜 케이스를 적용한다.

```javascript
const SOME_VALUE = 1;

const people = {
  name: "김자바",
  age: "26"
};
```

### 클래스명

클래스명은 케밥 케이스(kebab-case)를 원칙으로 한다.

```html
<h1 class="main-title">오늘 메뉴 추천</h1>
```
