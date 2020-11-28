/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 16:19
 * Desc:
 */
import { createModel } from '@rematch/core';
import { RootModel } from '@/store/models';
import http from '@/utils/http';

export interface IDetailInfo {
  id: number;
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

export interface DetailProps {
  id: string;
  banner: BannerProps[];
  info: IDetailInfo;
}

interface HouseState {
  detail: DetailProps;
}

export const house = createModel<RootModel>()({
  state: {
    detail: {},
  } as HouseState,
  reducers: {
    getDetail(state, payload: DetailProps) {
      return {
        ...state,
        detail: payload,
      };
    },
  },
  effects: dispatch => ({
    async getDetailAsync(payload: object = {}, state) {
      try {
        const detail: DetailProps = await http<DetailProps>({
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
  }),
});
