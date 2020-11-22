/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 16:19
 * Desc:
 */
import { createModel } from '@rematch/core';
import { RootModel } from '@/store/models';
import http from '@/utils/http';
import { CommonEnum } from '@/enums';

export interface IDetailInfo {
  endTime: number;
  info: string;
  price: string;
  publishTime: number;
  startTime: number;
  name: string;
}

export interface BannerProps {
  url: string;
}

export interface IDetail {
  id: string;
  banner: BannerProps[];
  info: IDetailInfo;
}

export interface IComment {
  id: number;
  avatar: string;
  username: string;
  createTime: number;
  info: string;
}

interface HouseState {
  detail: IDetail;
  comments: IComment[];
  page: CommonEnum.IPage;
  showLoading: boolean;
  reloadCommentsNum: number;
  reset: boolean;
}

export const house = createModel<RootModel>()({
  state: {
    detail: {},
    comments: [] as IComment[],
    page: CommonEnum.PAGE,
    showLoading: true,
    reloadCommentsNum: 0,
    reset: false,
  } as HouseState,
  reducers: {
    getDetail(state, payload: IDetail) {
      return {
        ...state,
        detail: payload,
      };
    },
    getComments(state, payload: IComment[]) {
      return {
        ...state,
        comments: state.comments.concat(payload),
      };
    },
    setShowLoading(state, payload: boolean) {
      return {
        ...state,
        showLoading: payload,
      };
    },
    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...state.page,
          pageNum: state.page.pageNum + 1,
        },
        reset: false,
      };
    },
    resetData(state, payload: object) {
      return {
        ...state,
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async getDetailAsync(payload: object = {}, state) {
      try {
        const detail: IDetail = await http<IDetail>({
          url: '/house/detail',
          body: payload,
          method: 'post',
        });
        dispatch({
          type: 'house/getDetail',
          payload: detail,
        });
      } catch (err) {
        console.log('err', err);
      }
    },
    async getCommentsAsync(payload: object = {}, state) {
      try {
        const comments: IComment[] = await http<IComment[]>({
          url: '/comments/lists',
          body: {
            ...payload,
            pageSize: state.house.page.pageSize,
            pageNum: state.house.page.pageNum,
          },
          method: 'post',
        });
        dispatch({
          type: 'house/getComments',
          payload: comments,
        });
        dispatch({
          type: 'house/setShowLoading',
          payload: comments.length > 0,
        });
      } catch (err) {
        console.log('err', err);
      }
    },
    async addCommentsAsync(payload: object = {}, state) {
      try {
        const res = await http({
          url: '/comments/add',
          body: payload,
          method: 'post',
        });
        if (res) {
          dispatch({
            type: 'house/resetData',
            payload: {
              reset: true,
            },
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  }),
});
