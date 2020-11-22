/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:28
 * Desc:
 */
import React from 'react';
import MenuBar from '@/components/MenuBar';
import { Provider } from 'react-redux';
import { useLocation } from 'umi';
import { store } from '@/store';
import '../global.less';

const BaseLayout: React.FC<{}> = props => {
  const location = useLocation();
  const paths = ['/', '/order', '/user'];
  return (
    <Provider store={store}>
      <MenuBar
        show={paths.includes(location.pathname)}
        pathname={location.pathname}
      />
      {props.children}
    </Provider>
  );
};

export default BaseLayout;
