export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

// tip ) ts에서 Pick 사용 예시 => User타입정보에서 username과 image만 가져오겠따.
export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
