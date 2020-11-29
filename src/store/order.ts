/**
 * User: soalin
 * Date: 2020/11/28
 * Time: 14:50
 * Desc:
 */
import { createModel } from '@rematch/core';
import { RootModel } from '@/store/models';
import http from '@/utils/http';
import { CommonEnum } from '@/enums';

export interface OrderProps {
  id: number;
  isPayed: number;
  houseId: string;
  userId: string;
}

export interface OrderItemProps {
  id: number;
  img: string;
  title: string;
  info: string;
  price: string;
  createTime: string;
  house: any;
}

interface OrderState {
  order: OrderProps;
  orders: OrderItemProps[];
  page: CommonEnum.PageProps;
  reloadOrdersNum: number;
  showLoading: boolean;
}

export const order = createModel<RootModel>()({
  state: {
    order: {},
    orders: [] as OrderItemProps[],
    page: CommonEnum.PAGE,
    reloadOrdersNum: 0,
    showLoading: true,
  } as OrderState,
  reducers: {
    setOrder(state, payload: OrderProps) {
      return {
        ...state,
        order: payload,
      };
    },
    getOrders(state, payload: OrderItemProps[]) {
      return {
        ...state,
        orders: state.orders.concat(payload),
      };
    },
    reloadOrders(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadOrdersNum + 1,
        page: {
          ...state.page,
          pageNum: state.page.pageNum + 1,
        },
      };
    },
    setShowLoading(state, payload: boolean) {
      return {
        ...state,
        showLoading: payload,
      };
    },
    resetData(state, payload: object) {
      return {
        ...state,
        orders: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async hasOrderAsync(payload: object, state) {
      await handleOrder('/orders/hasOrder', dispatch, payload);
    },
    async addOrderAsync(payload: object, state) {
      await handleOrder('/orders/addOrder', dispatch, payload);
    },
    async delOrderAsync(payload: object, state) {
      await handleOrder('/orders/delOrder', dispatch, payload);
    },
    async getOrdersAsync(payload: { type: number }, state) {
      try {
        const orders = await http<OrderItemProps[]>({
          url: '/orders/lists',
          body: {
            ...payload,
            pageSize: state.order.page.pageSize,
            pageNum: state.order.page.pageNum,
            type: payload.type,
          },
          method: 'post',
        });
        dispatch({
          type: 'order/getOrders',
          payload: orders,
        });
        dispatch({
          type: 'order/setShowLoading',
          payload: orders.length > 0,
        });
      } catch (err) {
        console.log('err', err);
      }
    },
  }),
});

async function handleOrder(url: string, dispatch: any, payload: any) {
  const result = await http<OrderProps>({
    url,
    body: payload,
    method: 'post',
  });
  dispatch({
    type: 'order/setOrder',
    payload: result,
  });
}
