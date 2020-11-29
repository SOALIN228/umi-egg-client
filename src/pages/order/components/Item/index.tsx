/**
 * User: soalin
 * Date: 2020/11/16
 * Time: 14:09
 * Desc:
 */
import React, { useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { OrderType } from '@/pages/order/components/List';
import { HouseItem } from '@/pages/home/components/hot';
import timer from '@/utils/timer';
import http from '@/utils/http';

interface IProps {
  type: OrderType;
  id: number;
  house: HouseItem;
}

const Item: React.FC<IProps> = props => {
  const renderPay = () => {
    switch (props.type) {
      case 0:
        return (
          <Button type="warning" size="small" onClick={handlePay}>
            去支付
          </Button>
        );
      case 1:
        return (
          <Button size="small" onClick={handleAchieve}>
            已完成
          </Button>
        );
      default:
        break;
    }
  };

  const handleAchieve = async () => {
    const result = await http({
      url: '/orders/achieve',
      body: {
        id: props.id,
      },
      method: 'post',
    });
    if (result) {
      Toast.success('订单完成');
      window.location.reload();
    }
  };

  const handlePay = async () => {
    const result = await http({
      url: '/orders/pay',
      body: {
        id: props.id,
      },
      method: 'post',
    });
    if (result) {
      Toast.success('支付成功');
      window.location.reload();
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="order-item">
      <img
        alt="order"
        src={props.house?.imgs ? props.house?.imgs[0]?.url : undefined}
      />
      <div className="center">
        <div className="title">{props?.house?.name}</div>
        <div className="price">￥{props?.house?.price}</div>
        <div className="time">
          {timer(props?.house?.createTime, 'YYYY-MM-DD')}
        </div>
      </div>
      <div className="pay">{renderPay()}</div>
    </div>
  );
};

export default Item;
