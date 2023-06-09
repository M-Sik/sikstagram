export type AuthUser = {
  name: string;
  username: string;
  email: string;
  image?: string;
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

// tip ) ts에서 Pick 사용 예시 => User타입정보에서 username과 image만 가져오겠따.
export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & { posts: number };

export type Comment = {
  comment: string;
  username: string;
  image?: string | undefined;
};

// tip) ts Omit => SimplePost라는 타입은 FullPost타입에서 comments키를 제거한 타입이라고 정의한것임
// 그 후 &를 통해 comments 타입을 넘버타입으로 재지정 해줌
export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};
