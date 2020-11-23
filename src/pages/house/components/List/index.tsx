/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:46
 * Desc:
 */
import React, { useEffect } from 'react';
import { IComment } from '@/store/house';
import timer from '@/utils/timer';

interface IProps {
  list?: IComment[];
}

const List: React.FC<IProps> = props => {
  useEffect(() => {}, []);

  return (
    <div className="comment">
      <h1 className="comment-title">评论</h1>
      <div className="comment-list">
        {props.list?.map(item => (
          <div className="comment-list_item" key={item.id}>
            <img alt="user" className="avatar" src={item.user.avatar} />
            <div className="right">
              <div className="right-top">
                <p>{item.user.username}</p>
                <p>{timer(item.createTime)}</p>
              </div>
              <div className="right-bottom">{item.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
