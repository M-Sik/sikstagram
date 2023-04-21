'use client';
import React, { useState } from 'react';
import useSWR from 'swr';

export default function UserSearch() {
  // 검색하는 키워드가 있다면 유저네임, 네임중 해당하는것을 보여줌
  // 검색하는 키워드가 없다면 전체 유저 보여줌
  const [keyword, setKeyword] = useState('');
  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);
  console.log('유저 검색 결과 => ', data);

  return <div>UserSearch</div>;
}
