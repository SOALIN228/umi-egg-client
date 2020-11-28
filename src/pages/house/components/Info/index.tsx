/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:46
 * Desc:
 */
import React, { useEffect } from 'react';
import { Button } from 'antd-mobile';
import { IDetailInfo, OrderProps } from '@/store/house';
import timer from '@/utils/timer';

interface IInfo {
  info?: IDetailInfo;
  order: OrderProps;
  btnClick?: (id?: number) => void;
}

const Info: React.FC<IInfo> = props => {
  const handleOrder = (id?: number) => {
    props.btnClick && props.btnClick(id);
  };

  const renderBtn = () => {
    // order里面没有id，说明订单一定不存在
    if (!props.order?.id) {
      return (
        <Button
          className="info-btn"
          type="warning"
          onClick={() => handleOrder()}
        >
          预定
        </Button>
      );
    }

    // 已经有订单了，处于未支付状态
    if (props.order?.isPayed === 0) {
      return (
        <Button
          className="info-btn"
          type="ghost"
          onClick={() => handleOrder(props.order.id)}
        >
          取消预定
        </Button>
      );
    }

    // 已经有订单了，处于已支付状态
    if (props.order?.isPayed === 1) {
      return (
        <Button className="info-btn" type="ghost">
          居住中
        </Button>
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="info">
      <div className="info-title">{props.info?.name}</div>
      <div className="info-msg">简介：{props.info?.info}</div>
      <div className="info-price">价格：¥ {props.info?.price || 0}</div>
      <div className="info-time">
        发布时间：{timer(props.info?.publishTime || 0)}
      </div>
      <div className="info-time">
        开始出租：{timer(props.info?.startTime || 0, '')}
      </div>
      <div className="info-time">
        结束出租：{timer(props.info?.endTime || 0, '')}
      </div>
      {renderBtn()}
    </div>
  );
};

export default Info;
