/**
 * User: soalin
 * Date: 2020/11/18
 * Time: 23:25
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import './index.less';

const OrderSkeletons: React.FC<{}> = props => {
  const [state, setState] = useState(Array(3).fill(1));

  useEffect(() => {}, []);

  return (
    <div className="order-skeletons">
      {state.map((item, index) => (
        <div className="order-item" key={index}>
          <div className={'skeletons left'} />
          <div className="center">
            <div className={'skeletons title'} />
            <div className={'skeletons price'} />
            <div className={'skeletons time'} />
          </div>
          <div className={'skeletons pay'}></div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeletons;
