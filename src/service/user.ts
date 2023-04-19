import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, email, name, username, image }: OAuthUser) {
  // 세니티 디비에 존재할경우 등록하지 않고 존재하지 않을 경우 등록하는 함수
  // createIfNotExists
  //  key랑 value랑 같을경우 생략가능
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username: username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  // 스키마 name이 user이고
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0] {
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks": bookmarks[]->_id
    }`,
  );
}
