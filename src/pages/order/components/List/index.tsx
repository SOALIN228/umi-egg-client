/**
 * User: soalin
 * Date: 2020/11/16
 * Time: 14:10
 * Desc:
 */
import React, { useEffect } from 'react';
import OrderItem from '@/pages/order/components/Item';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'lodash';

export interface OrderItem {
  id: number;
  img: string;
  title: string;
  info: string;
  price: string;
  createTime: string;
}

export type OrderType = 0 | 1;

interface IProps {
  orders?: OrderItem[];
  type: OrderType;
}

const List: React.FC<IProps> = props => {
  useEffect(() => {}, []);
  return (
    <div>
      {isEmpty(props.orders) ? (
        <ActivityIndicator />
      ) : (
        <div className="tab-lists">
          {props?.orders?.map(item => (
            <OrderItem
              type={props.type}
              key={item.id + Math.random()}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

List.defaultProps = {
  orders: [],
};

export default List;
