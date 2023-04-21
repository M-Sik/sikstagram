import { ProfileUser } from '@/types/types';
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

export async function searchUsers(keyword?: string) {
  // 키워드가 있다면 name에서 키워드에 해당하는 것이 있거나, username에서 해당 키워드가 있는지 검색
  // 키워드가 없다면 유저 전체정보 가져옴
  const query = keyword ? `&& (name match "${keyword}") || (username match "${keyword}")` : '';
  // 검색된 결과에 정보를 다 가져오고(...) following, followers 키에는 각 카운트 값을 넣는다.
  return (
    client
      .fetch(
        `*[_type == "user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }`,
      )
      // tip) user.following ?? 0 에서 ??은 앞에것이 null or undefined일 경우 ?? 뒤에것을 리턴
      .then((users) =>
        users.map((user: ProfileUser) => ({
          ...user,
          following: user.following ?? 0,
          followers: user.followers ?? 0,
        })),
      )
  );
}
