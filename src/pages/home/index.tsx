/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:35
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import Header from '@/pages/home/components/header';
import Search, { ICityItem } from '@/pages/home/components/search';
import Hot, { HouseItem } from '@/pages/home/components/hot';
import useHttpHook from '@/hooks/useHttpHook';
import './index.less';

const Home: React.FC<{}> = (props) => {
  const [citys, citysLoading] = useHttpHook<ICityItem[][]>({
    url: '/commons/citys',
    method: 'post',
  });
  const [houses] = useHttpHook<HouseItem[]>({
    url: '/house/hot',
    method: 'post',
  });

  useEffect(() => {
  });
  return (
    <div className={'home'}>
      <Header/>
      {citys && <Search citys={citys} citysLoading={citysLoading}/>}
      {houses && <Hot houses={houses}/>}
    </div>
  );
};

export default Home;
