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

export interface IDetail {
  id: string;
  banner: BannerProps[];
  info: IDetailInfo;
}

export interface IOrder {
  id: number;
  isPayed: number;
  houseId: string;
  userId: string;
}

interface HouseState {
  detail: IDetail;
  order: IOrder;
}

export const house = createModel<RootModel>()({
  state: {
    detail: {},
    order: {},
  } as HouseState,
  reducers: {
    getDetail(state, payload: IDetail) {
      return {
        ...state,
        detail: payload,
      };
    },
    setOrder(state, payload: IOrder) {
      return {
        ...state,
        order: payload,
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
    async hasOrderAsync(payload: object, state) {
      await handleOrder('/orders/hasOrder', dispatch, payload);
    },
    async addOrderAsync(payload: object, state) {
      await handleOrder('/orders/addOrder', dispatch, payload);
    },
    async delOrderAsync(payload: object, state) {
      await handleOrder('/orders/delOrder', dispatch, payload);
    },
  }),
});

async function handleOrder(url: string, dispatch: any, payload: any) {
  const result = await http<IOrder>({
    url,
    body: payload,
    method: 'post',
  });
  dispatch({
    type: 'house/setOrder',
    payload: result,
  });
}
