/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:46
 * Desc:
 */
import React, { useEffect } from 'react';
import ShowLoading from '@/components/ShowLoading';
import { IComment } from '@/store/house';
import timer from '@/utils/timer';

interface IProps {
  list?: IComment[];
  showLoading: boolean;
}

const List: React.FC<IProps> = props => {
  useEffect(() => {}, []);
  return (
    <div className="comment">
      <h1 className="comment-title">评论</h1>
      <div className="comment-list">
        {props.list?.map(item => (
          <div className="comment-list_item" key={item.id + Math.random()}>
            <img alt="user" className="avatar" src={item.avatar} />
            <div className="right">
              <div className="right-top">
                <p>{item.username}</p>
                <p>{timer(item.createTime)}</p>
              </div>
              <div className="right-bottom">{item.info}</div>
            </div>
          </div>
        ))}
        <ShowLoading showLoading={props.showLoading} />
      </div>
    </div>
  );
};

export default List;
