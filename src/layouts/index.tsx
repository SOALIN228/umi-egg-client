/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:28
 * Desc:
 */
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import MenuBar from '@/components/MenuBar';
import { useLocation } from 'umi';

const BaseLayout: React.FC<{}> = (props) => {
  const location = useLocation();
  const paths = ['/', '/order', '/user'];
  return (
    <div>
      <MenuBar show={paths.includes(location.pathname)}
               pathname={location.pathname}/>
      <ErrorBoundary>
        {props.children}
      </ErrorBoundary>
    </div>
  );
};

export default BaseLayout;
