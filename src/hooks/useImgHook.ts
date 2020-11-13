/**
 * User: soalin
 * Date: 2020/11/12
 * Time: 23:13
 * Desc:
 */
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

let observer: IntersectionObserver;
export default function useImgHook (ele: string, callback?: (entries: any) => void, watch?: (string | number)[]) {
  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if (!isEmpty(nodes)) {
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
      if (!isEmpty(nodes) && observer) {
        observer.disconnect();
      }
    };
  }, watch);
}
