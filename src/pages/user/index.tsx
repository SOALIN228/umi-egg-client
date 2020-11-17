/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:37
 * Desc:
 */
import React, { useEffect } from 'react';
import { List } from 'antd-mobile';
import { history } from 'umi';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import './index.less';

const mapState = (state: RootState) => ({
  avatar: state.user.avatar,
  tel: state.user.tel,
  sign: state.user.sign,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getUserAsync: (payload: { id: number }) =>
    dispatch.user.getUserAsync(payload),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

const User: React.FC<Props> = props => {
  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
      query: {
        id: 10,
      },
    });
  };

  useEffect(() => {
    props.getUserAsync({
      id: 10,
    });
  }, []);

  return (
    <div className="user-page">
      <div className="info">
        <div className="set" onClick={handleClick}>
          设置
        </div>
        <div className="user">
          <img alt="user" src={props.avatar} />
          <div className="tel">{props.tel}</div>
          <div className="sign">{props.sign}</div>
        </div>
      </div>
      <div className="lists">
        <List>
          <List.Item arrow="horizontal">用户协议</List.Item>
          <List.Item arrow="horizontal">常见问题</List.Item>
          <List.Item arrow="horizontal">联系客服</List.Item>
        </List>
      </div>
    </div>
  );
};

export default connect(mapState, mapDispatch)(User);
