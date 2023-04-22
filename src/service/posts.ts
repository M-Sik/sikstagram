import { SimplePost } from '@/types/types';
import { client, urlFor } from './sanity';

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[].username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author.username == "${username}" 
    || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostProjection}}`,
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "id": _id,
      "createdAt": _createdAt
    }`,
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"] | order(_createdAt desc){
    ${simplePostProjection}
  }`,
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      // 포스트 스키마에서 likes[] 배열에 있는 username이 username인 사람만 조회함
      // 즉 포스트에 좋아요를 누른 사람 중 req로 온 username이 있는것을 리턴해줌
      `*[_type == "post" && "${username}" in likes[]->username] | order(_createdAt desc){
      ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      // 포스트 스키마에서 포스트배열들 중 _id가, user스키마에 req키로 받아온 유저의 bookmarks배열에 _ref값이랑 같은것을 가져옴
      `*[_type == "post" && _id 
      in *[_type == "user" && username == "${username}"].bookmarks[]._ref] | order(_createdAt desc){
      ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    image: urlFor(post.image),
  }));
}
