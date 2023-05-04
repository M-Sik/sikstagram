# sikstagram
### 📑 개요
Next.js에 대하여 공부하기 위해 진행한 프로젝트 입니다. Next.js의 새로운 버전인 13버전의 app dir로 진행 하였습니다.

프로젝트를 진행하며 Next.js의 장점인 pre-rendering를 경험할 수 있었으며, 13버전에서 새로나온 개념인 서버 컴퍼넌트와 클라이언트 컴포넌트에 대해 깊게 공부할 수 있었습니다.

백엔드에서 데이터 관리는 headless cms인 Sanity를 이용하여 구현 하였습니다.

<br>

### 🛠️ 사용 기술
- Next.js 13.3.1
- React.js 18
- Typescript
- Swr
- Tailwindcss
<br>

### 🔗 배포 URL
- https://sikstagram.vercel.app
<br>

### 💻 구현 기능
- Sanity를 이용한 백엔드 데이터 관리
- OAuth 로그인(구글, 카카오) 구현
- Next meddleware를 통해 로그인하지 않거나 세션이 만료된 경우 로그인 페이지로 redirect 기능 구현
- 게시글 등록 구현
- 이미지 드로그앤 드롭 구현
- 팔로우한 유저 Carousel 구현
- 팔로우한 유저 및 본인이 작성한 글 조회 기능 구현
- 게시글의 좋아요, 북마크, 댓글 등 변경사항이 생길시 Swr을 이용하여 게시글 정보 동기화 기능 구현
- 좋아요, 북마크, 댓글 작성 기능 구현
- 팔로우, 언팔로우 기능 구현
- Debounce를 이용한 유저 검색 기능 구현
- 유저 상세페이지 구현(followers, following, 내가쓴 게시글, 좋아요한 글, 북마크한 글)
<br>

### 🚀 미리 보기

### OAuth 로그인👇👇
![sikstagram_Oauth](https://user-images.githubusercontent.com/77043973/236225568-5113c48a-fe69-4a04-947a-addedd10b880.gif)

<br>

### 게시글 등록👇👇
![sikstagram_addpost](https://user-images.githubusercontent.com/77043973/236227454-f16e27d3-96c1-4cb4-9542-c721c3b62793.gif)

<br>

### 게시글 및 게시글 상세화면 좋아요, 북마크, 댓글👇👇
![sikstagram_like_bookmark_comment](https://user-images.githubusercontent.com/77043973/236229580-ac8d7fe7-fa00-46a6-9657-729433e28d40.gif)

<br>

### Debounce를 이용한 유저 검색👇👇
![sikstagram_user_search](https://user-images.githubusercontent.com/77043973/236235133-09f89c89-cfaa-4b97-b270-5d6d87b84f52.gif)

<br>

### 유저 팔로우, 언팔로우👇👇
![sikstagram_user_follow_unfollow](https://user-images.githubusercontent.com/77043973/236235665-6c74a8c3-4b33-4e37-ad15-785c0be84538.gif)

<br>

### 팔로우한 유저 정보보기👇👇
![sikstagram_followuser_info](https://user-images.githubusercontent.com/77043973/236235923-545bd6f6-14b0-4f97-918d-9dedf9d4beec.gif)

<br>

### 해당 유저가 쓴 게시글, 북마크한 글, 좋아요한 글 조회👇👇
![sikstagram_mypost_bookmarked_liked](https://user-images.githubusercontent.com/77043973/236236293-2088b8c6-87ad-4998-aba6-7bfbc57dccd6.gif)

