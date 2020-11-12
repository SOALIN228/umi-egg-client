/**
 * User: soalin
 * Date: 2020/11/12
 * Time: 23:13
 * Desc:
 */
import { useEffect } from 'react';

let observer: IntersectionObserver;
export default function useImgHook (ele: string, callback?: (entries: any) => void, watch?: (string | number)[]) {
  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if (nodes && nodes.length) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
        entries.forEach(item => {
          // 显示在页面
          if (item.isIntersecting) {
            const dataSrc = item.target.getAttribute('data-src') || '';
            item.target.setAttribute('src', dataSrc);
            observer.unobserve(item.target);
          }
        });
      });
      nodes.forEach(item => {
        observer.observe(item);
      });
    }
    return () => {
      if (nodes && nodes.length && observer) {
        observer.disconnect();
      }
    };
  }, watch);
}
