/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 20:55
 * Desc:
 */
import { Toast } from 'antd-mobile';

interface Options {
  url: string
  method?: string,
  headers?: object,
  body?: object,
  setLoading?: (loading: boolean) => void,
  setResult?: (data: any) => void,
}

const http = (
  {
    url,
    method = 'get',
    headers,
    body = {},
    setLoading,
    setResult,
  }: Options) => {
  setLoading && setLoading(true);
  const defaultHeader: object = {
    'Content-type': 'application/json',
  };

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

  return new Promise((resolve, reject) => {
    fetch('/api' + url, params)
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
        } else {
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        }
      })
      .catch(err => {
        Toast.fail(err);
        reject(err);
      })
      .finally(() => {
        setLoading && setLoading(false);
      });
  });
};

export default http;
