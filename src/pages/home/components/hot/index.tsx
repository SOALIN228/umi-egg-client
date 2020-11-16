/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 06:58
 * Desc:
 */
import React, { useEffect } from 'react';
import { history } from 'umi';

export interface HouseItem {
  id: number;
  img: string;
  title: string;
  info: string;
  price: string;
}

interface IProps {
  houses?: HouseItem[];
}

const Hot: React.FC<IProps> = props => {
  const handleClick = (id: number) => {
    history.push({
      pathname: '/house',
      query: {
        id,
      },
    });
  };

  useEffect(() => {}, []);

  return (
    <div className={'hot'}>
      <h1>最热民宿</h1>
      <div className={'hot-lists'}>
        {props.houses?.map(item => (
          <div
            className="hot-lists-item"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <img className="img" alt="img" src={item.img} />
            <div className="title">{item.title}</div>
            <div className="info">{item.info}</div>
            <div className="price">￥{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hot;
