/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:35
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/pages/home/components/header';
import Search, { ICityItem } from '@/pages/home/components/search';
import Hot, { HouseItem } from '@/pages/home/components/hot';
import useHttpHook from '@/hooks/useHttpHook';
import './index.less';

const Home: React.FC<{}> = props => {
  const [cities, citiesLoading] = useHttpHook<ICityItem[][]>({
    url: '/commons/cities',
    method: 'post',
    watch: [],
  });
  const [houses] = useHttpHook<HouseItem[]>({
    url: '/house/hot',
    method: 'post',
    watch: [],
  });

  useEffect(() => {}, []);

  return (
    <ErrorBoundary>
      <div className={'home'}>
        <Header />
        <Search cities={cities} citiesLoading={citiesLoading} />
        <Hot houses={houses} />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
