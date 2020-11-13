/**
 * User: soalin
 * Date: 2020/11/13
 * Time: 23:53
 * Desc:
 */
import { useEffect, useState, useRef } from 'react';

export default function useStateCallback<T> (
  data: T,
): [T, (value: T, cb?: () => void) => void] {

  const [state, setState] = useState<T>(data);

  const cbRef = useRef(null);

  function setStateAndCallback (value: T, cb?: () => void) {
    cbRef.current = cb;

    setState(value);
  }

  useEffect(() => {
    cbRef.current && cbRef.current(state);
  }, [state]);

  return [state, setStateAndCallback];
}
