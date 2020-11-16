/**
 * User: soalin
 * Date: 2020/11/12
 * Time: 07:03
 * Desc:
 */
import { useEffect } from 'react';

let observer: IntersectionObserver;
export default function useObserverHook(
  ele: string,
  callback: (entries: any) => void,
  watch?: (string | number | boolean | object)[],
) {
  useEffect(() => {
    console.log('use');
    const node = document.querySelector(ele);
    if (node) {
      observer = new IntersectionObserver(entries => {
        console.log('cb1');
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      console.log('observer', observer);
      console.log('node', node);
      if (observer && node) {
        console.log('remover remove');
        // 解绑元素
        observer.unobserve(node);
        // 停止监听
        observer.disconnect();
      }
    };
  }, watch);
}
