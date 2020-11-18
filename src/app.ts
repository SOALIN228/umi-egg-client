/**
 * User: soalin
 * Date: 2020/11/18
 * Time: 22:11
 * Desc:
 */
import { history } from 'umi';
import * as Cookie from 'es-cookie';

export function onRouteChange(route) {
  const nowPath = route.routes[0].routes.filter(
    item => item.path === route.location.pathname,
  );
  const isLogin = Cookie.get('user');

  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname,
      },
    });
  }
}
