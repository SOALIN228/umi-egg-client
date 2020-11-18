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
import * as Cookie from 'es-cookie';

interface IUser {
  id: number;
  username: string;
  avatar: string;
  tel: number;
  sign: string;
}

interface ILoginInfo {
  id: number;
  username: string;
}

interface UserState {
  id: number | undefined;
  username: string;
  avatar: string;
  tel: number | undefined;
  sign: string;
}

export const user = createModel<RootModel>()({
  state: {
    id: undefined,
    username: '',
    avatar: '',
    tel: undefined,
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
    async getUserAsync(payload: object, state) {
      try {
        const user: IUser = await http<IUser>({
          url: '/user/detail',
          body: payload,
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
        const result: IUser = await http<IUser>({
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
        const result: ILoginInfo = await http<ILoginInfo>({
          url: '/user/login',
          body: payload,
          method: 'post',
        });
        if (result) {
          dispatch({
            type: 'user/editUser',
            payload: result,
          });
          Toast.success('登录成功');
          Cookie.set('user', JSON.stringify(result));
          history.push('/');
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    async registerAsync(payload: object, state) {
      try {
        const result: ILoginInfo = await http<ILoginInfo>({
          url: '/user/register',
          body: payload,
          method: 'post',
        });
        if (result) {
          Toast.success('注册成功');
          Cookie.set('user', JSON.stringify(result));
          history.push('/');
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  }),
});
