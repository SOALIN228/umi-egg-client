/**
 * User: soalin
 * Date: 2020/11/13
 * Time: 23:53
 * Desc:
 */
import { useEffect, useState, useRef } from 'react';

type CBType = () => void;

export default function useStateCallback<T>(
  data: T,
): [T, (value: T, cb?: CBType) => void] {
  const [state, setState] = useState<T>(data);

  const cbRef: any = useRef(null);

  function setStateAndCallback(value: T, cb: CBType = () => {}) {
    cbRef.current = cb;
    setState(value);
  }

  useEffect(() => {
    cbRef.current && cbRef.current(state);
  }, [state]);

  return [state, setStateAndCallback];
}
