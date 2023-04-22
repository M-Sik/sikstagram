'use client';
import { ProfileUser } from '@/types/types';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { PropagateLoader } from 'react-spinners';
import UserCard from '../cards/UserCard';
import useDebounce from '@/hooks/useDebounce';

export default function UserSearch() {
  // 검색하는 키워드가 있다면 유저네임, 네임중 해당하는것을 보여줌
  // 검색하는 키워드가 없다면 전체 유저 보여줌
  const [keyword, setKeyword] = useState('');
  // tip) 디바운싱
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${debouncedKeyword}`);
  console.log('유저 검색 결과 => ', users);

  const onSubmit = (e: FormEvent) => {
    //tip) 서브밋시 페이지 새로고침 안되게 하기위함
    e.preventDefault();
  };

  return (
    <section className="w-full flex flex-col max-w-2xl items-center m-4">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        {/*  autoFocus는 페이지에 들어오면 자동으로 포커스 시켜줌 */}
        <input
          className="w-full text-2xl p-3 outline-none border boder-grey-400"
          type="text"
          autoFocus
          placeholder="검색할 유저 이름을 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>유저를 불러오는 중 오류가 발생하였습니다.</p>}
      {isLoading && <PropagateLoader className="mt-10" color="red" />}
      {!isLoading && !error && users.length === 0 && <p>찾는 사용자가 없습니다.</p>}
      <ul className="w-full px-3">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
