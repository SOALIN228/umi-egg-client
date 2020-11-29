/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:37
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Tabs } from 'antd-mobile';
import List from '@/pages/order/components/List';
import ShowLoading from '@/components/ShowLoading';
import useObserverHook from '@/hooks/useObserverHook';
import { CommonEnum } from '@/enums';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import './index.less';

const mapState = (state: RootState) => ({
  orders: state.order.orders,
  showLoading: state.order.showLoading,
  reloadOrdersNum: state.order.reloadOrdersNum,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getOrdersAsync: (payload: { type: number }) =>
    dispatch.order.getOrdersAsync(payload),
  reloadOrders: () => dispatch.order.reloadOrders(),
  resetData: (payload: object = {}) => dispatch.order.resetData(payload),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

const Order: React.FC<Props> = props => {
  const [type, setType] = useState(0);

  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 },
  ];

  const handleChange = (e: any) => {
    setType(e.sub);
    props.resetData();
  };

  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    async entries => {
      // 每次页面loading 出现会触发监听，length变化会重新定义监听
      if (
        props.showLoading &&
        entries[0]?.isIntersecting &&
        props.orders.length
      ) {
        props.reloadOrders();
      }
    },
    [props.orders.length, props.showLoading],
  );

  useEffect(() => {
    props.getOrdersAsync({ type });
  }, [type, props.reloadOrdersNum]);

  useEffect(() => {
    return () => {
      props.resetData({});
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className={'order-page'}>
        <Tabs tabs={tabs} onChange={handleChange}>
          <div className="tab">
            <List type={0} orders={props.orders} />
          </div>
          <div className="tab">
            <List type={1} orders={props.orders} />
          </div>
        </Tabs>
        {props.orders.length ? (
          <ShowLoading
            showLoading={props.showLoading}
            style={{ marginBottom: 50 }}
          />
        ) : (
          <div className={'page-end'}>无订单信息～</div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapState, mapDispatch)(Order);
