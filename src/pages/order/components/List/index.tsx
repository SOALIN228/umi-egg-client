/**
 * User: soalin
 * Date: 2020/11/16
 * Time: 14:10
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import OrderItem from '@/pages/order/components/Item';
import OrderSkeletons from '@/skeletons/OrderSkeletons';
import { OrderItemProps } from '@/store/order';
import { isEmpty } from 'lodash';

export type OrderType = 0 | 1;

interface IProps {
  orders?: OrderItemProps[];
  type: OrderType;
}

const List: React.FC<IProps> = props => {
  const [state, setState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (isEmpty(props?.orders)) {
        setState(true);
      }
    }, 1500);
  }, []);

  return (
    <div>
      {isEmpty(props.orders) && !state ? (
        <OrderSkeletons />
      ) : (
        <div className="tab-lists">
          {props?.orders?.map(item => (
            <OrderItem
              type={props.type}
              key={item.id + Math.random()}
              id={item.id}
              house={item.house}
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
