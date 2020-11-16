/**
 * User: soalin
 * Date: 2020/11/13
 * Time: 06:44
 * Desc:
 */
import React, { CSSProperties, useEffect } from 'react';
import { CommonEnum } from '@/enums';
import './index.less';

interface IProps {
  showLoading: boolean;
  className?: string;
  style?: CSSProperties;
}

const ShowLoading: React.FC<IProps> = props => {
  useEffect(() => {}, []);

  return (
    <div className={props.className} style={props.style}>
      {props.showLoading ? (
        <div
          id={CommonEnum.LOADING_ID}
          key={'loading'}
          className={'loading-info'}
        >
          loading
        </div>
      ) : (
        <div className="loading-info" key={'no-data'}>
          没有数据了~
        </div>
      )}
    </div>
  );
};

ShowLoading.defaultProps = {
  showLoading: true,
};

export default ShowLoading;
