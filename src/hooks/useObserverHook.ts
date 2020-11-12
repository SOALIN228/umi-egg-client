/**
 * User: soalin
 * Date: 2020/11/12
 * Time: 07:03
 * Desc:
 */
import { useEffect } from 'react';

let observer: IntersectionObserver;
export default function useObserverHook (ele: string, callback: (entries: any) => void, watch?: (string | number)[]) {
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
      observer = new IntersectionObserver(entries => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        // 解绑元素
        observer.unobserve(node);

        // 停止监听
        observer.disconnect();
      }
    };
  }, watch);
}
