/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:46
 * Desc:
 */
import React, { useEffect } from 'react';
import { Button } from 'antd-mobile';
import { IDetailInfo } from '@/store/house';
import timer from '@/utils/timer';

interface IInfo {
  info?: IDetailInfo;
}

const Info: React.FC<IInfo> = props => {
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
      <Button className="info-btn" type="warning">
        预定
      </Button>
    </div>
  );
};

export default Info;
