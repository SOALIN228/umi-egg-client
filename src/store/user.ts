/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 13:56
 * Desc:
 */
import { createModel } from '@rematch/core';
import { RootModel } from './models';
import http from '@/utils/http';
import { Toast } from 'antd-mobile';
import { history } from 'umi';

export interface UserProps {
  id: number;
  username: string;
  avatar: string;
  phone: number;
  sign: string;
}

interface LoginInfo {
  id: number;
  username: string;
  token: string;
}

interface UserState {
  id?: number;
  username: string;
  avatar: string;
  phone?: number;
  sign: string;
}

function urlGet(key: string, href?: string): string | null {
  const queryStr = href ? href.split('?') : window.location.href.split('?');
  if (queryStr[1]) {
    const paramsObj = queryStr[1].split('&');
    let obj: any = {};
    paramsObj.map(item => {
      const _itme = item.split('=');
      obj[_itme[0]] = decodeURIComponent(_itme[1]);
    });
    return key ? obj[key] : null;
  }
  return null;
}

export const user = createModel<RootModel>()({
  state: {
    id: undefined,
    username: '',
    avatar: '',
    phone: undefined,
    sign: '',
  } as UserState,
  reducers: {
    getUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    editUser(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async getUserAsync(payload, state) {
      try {
        const user: UserProps = await http<UserProps>({
          url: '/user/detail',
          method: 'post',
        });
        if (user) {
          dispatch({
            type: 'user/getUser',
            payload: user,
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async editUserAsync(payload: object, state) {
      try {
        const result: UserProps = await http<UserProps>({
          url: '/user/edit',
          body: payload,
          method: 'post',
        });
        if (result) {
          dispatch({
            type: 'user/editUser',
            payload: result,
          });
          Toast.success('编辑成功');
          history.push('/user');
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async loginAsync(payload: object, state) {
      try {
        const result: LoginInfo = await http<LoginInfo>({
          url: '/user/login',
          body: payload,
          method: 'post',
        });
        if (result) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', result.username);

          dispatch({
            type: 'user/editUser',
            payload: result,
          });
          Toast.success('登录成功');
          const routerHref = urlGet('from');
          routerHref ? history.push(routerHref) : history.push('/');
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async registerAsync(payload: object, state) {
      try {
        const result: LoginInfo = await http<LoginInfo>({
          url: '/user/register',
          body: payload,
          method: 'post',
        });
        if (result) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', result.username);

          Toast.success('注册成功');
          history.push('/');
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async logoutAsync(payload, state) {
      try {
        const result: LoginInfo = await http<LoginInfo>({
          url: '/user/logout',
          body: payload,
          method: 'post',
        });
        if (result) {
          localStorage.clear();
          Toast.success('退出登录成功');
          location.href = '/login';
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  }),
});
