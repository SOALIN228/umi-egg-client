/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:37
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import List, { OrderItem } from '@/pages/order/components/List';
import ShowLoading from '@/components/ShowLoading';
import useObserverHook from '@/hooks/useObserverHook';
import http from '@/utils/http';
import { isEmpty } from 'lodash';
import { CommonEnum } from '@/enums';
import './index.less';
import { AiOutlineFileJpg } from 'react-icons/ai/index';

const Order: React.FC<{}> = props => {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(0);

  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 },
  ];

  const invokeHttp = async (pageNum: number) => {
    const result = await http<OrderItem[]>({
      url: '/order/lists',
      body: {
        ...page,
        pageNum,
        type,
      },
      method: 'post',
    });
    return result;
  };

  const fetchOrder = async (pageNum: number) => {
    const result = await invokeHttp(pageNum);
    if (!isEmpty(result) && result.length === page.pageSize) {
      setOrders(result);
      setShowLoading(true);
    } else {
      console.log('111');
      setShowLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setType(e.sub);
    setPage(CommonEnum.PAGE);
    setOrders([]);
    setShowLoading(true);
  };

  useObserverHook('#' + CommonEnum.LOADING_ID, async entries => {
    if (entries[0].isIntersecting && orders.length) {
      const result = await invokeHttp(page.pageNum + 1);
      if (
        !isEmpty(orders) &&
        !isEmpty(result) &&
        result.length === page.pageSize
      ) {
        setOrders([...orders, ...result]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1,
        });
        setShowLoading(true);
      } else {
        setShowLoading(false);
      }
    }
  });

  useEffect(() => {
    fetchOrder(1);
  }, [type]);

  return (
    <div className={'order-page'}>
      <Tabs tabs={tabs} onChange={handleChange}>
        <div className="tab">
          <List type={0} orders={orders} />
        </div>
        <div className="tab">
          <List type={1} orders={orders} />
        </div>
      </Tabs>
      <ShowLoading showLoading={showLoading} style={{ marginBottom: 50 }} />
    </div>
  );
};

export default Order;
