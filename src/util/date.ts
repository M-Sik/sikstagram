import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko'; //한국어 선택

register('ko', koLocale);

export function parseDate(date: string) {
  return format(date, 'ko');
}
