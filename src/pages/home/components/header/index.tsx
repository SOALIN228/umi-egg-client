/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 06:56
 * Desc:
 */
import React, { useEffect } from 'react';
import { Link } from 'umi';
import * as Cookie from 'es-cookie';

const Header: React.FC<{}> = props => {
  useEffect(() => {}, []);

  return (
    <div className={'header'}>
      <div className={'header_title'}>民宿</div>
      <div className={'header_login'}>
        {Cookie.get('user') ? (
          JSON.parse(Cookie.get('user')).username
        ) : (
          <>
            <Link to="/login">登录</Link> | <Link to="/register">注册</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
