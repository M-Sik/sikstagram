import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};
// 사용하지 않는 인자는 _로 써어놈
export async function GET(_: NextRequest, context: Context) {
  return searchUsers().then((data) => NextResponse.json(data));
}
