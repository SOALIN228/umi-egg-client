/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 20:55
 * Desc:
 */
import { Toast } from 'antd-mobile';

interface Options {
  url: string;
  method?: string;
  headers?: object;
  body?: object;
  setLoading?: (loading: boolean) => void;
  setResult?: (data: any) => void;
}

export default function http<T>({
  url,
  method = 'get',
  headers,
  body = {},
  setLoading,
  setResult,
}: Options) {
  setLoading && setLoading(true);

  const token = localStorage.getItem('token');
  let defaultHeader: object = {
    'Content-type': 'application/json',
  };
  defaultHeader = token
    ? {
        ...defaultHeader,
        token,
      }
    : defaultHeader;

  let params: any;
  if (method.toUpperCase() === 'GET') {
    params = undefined;
  } else {
    params = {
      headers: {
        ...defaultHeader,
        headers,
      },
      method,
      body: JSON.stringify(body),
    };
  }

  return new Promise(
    (resolve: (value: T) => void, reject: (value: string | object) => void) => {
      fetch('/api' + url, params)
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
            setResult && setResult(res.data);
          } else {
            // 用户未登录，或用户不存在
            if (res.status === 1001 || res.status === 2002) {
              if (location.pathname !== '/login') {
                location.href =
                  '/login?from=' +
                  encodeURIComponent(location.pathname + location.search);
              } else {
                location.href = '/login';
              }
              localStorage.clear();
            }
            Toast.fail(res.errMsg);
            reject(res.errMsg);
          }
        })
        .catch(err => {
          Toast.fail(err.toString());
          reject(err);
        })
        .finally(() => {
          setLoading && setLoading(false);
        });
    },
  );
}
