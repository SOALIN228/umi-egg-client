/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 17:11
 * Desc:
 */
import dayjs from 'dayjs';

export default function timer(time: string | number | Date, type = 'all') {
  return dayjs(time).format(type === 'all' ? 'YYYY-MM-DD HH:mm:ss' : type);
}
