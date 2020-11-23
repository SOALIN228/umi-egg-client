/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 06:56
 * Desc:
 */
import React, { useEffect, memo } from 'react';
import { Link } from 'umi';

const Header: React.FC<{}> = props => {
  const username = localStorage.getItem('username');
  useEffect(() => {}, []);

  return (
    <div className={'header'}>
      <div className={'header_title'}>民宿</div>
      <div className={'header_login'}>
        {username ? (
          username
        ) : (
          <>
            <Link to="/login">登录</Link> | <Link to="/register">注册</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
