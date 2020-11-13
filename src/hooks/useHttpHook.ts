/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 20:54
 * Desc:
 */

import { useState, useEffect } from 'react';
import http from '@/utils/http';

interface Options {
  url: string
  method?: string,
  headers?: object,
  body?: object,
  watch?: (string | number)[]
}

export default function useHttpHook<T> (
  {
    url,
    method = 'get',
    headers,
    body = {},
    watch,
  }: Options): [T | undefined, boolean] {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    http({
      url,
      method,
      headers,
      body,
      setResult,
      setLoading,
    });
  }, watch);
  return [result, loading];
};
