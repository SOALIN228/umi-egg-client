/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 23:20
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import ShowLoading from '@/components/ShowLoading';
import useHttpHook from '@/hooks/useHttpHook';
import useObserverHook from '@/hooks/useObserverHook';
import useImgHook from '@/hooks/useImgHook';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';
import './index.less';

interface HouseItem {
  id: number;
  imgs?: { url: string }[];
  name: string;
  info: string;
  price: string;
}

const Search: React.FC<{}> = props => {
  const { query }: any = useLocation();
  const [houseName, setHouseName] = useState('');
  const [houseLists, setHouseLists] = useState<HouseItem[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [reloadHouseNum, setReloadHouseNum] = useState(0);
  const [houseSubmitName, setHouseSubmitName] = useState('');
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [houses, loading] = useHttpHook<HouseItem[]>({
    url: '/house/search',
    method: 'post',
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    watch: [reloadHouseNum, houseSubmitName],
  });

  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    entries => {
      if (showLoading && entries[0]?.isIntersecting && houseLists.length) {
        setReloadHouseNum(reloadHouseNum + 1);
      }
    },
    [houseLists.length, showLoading],
  );

  useImgHook('.item-img');

  useEffect(() => {
    if (!loading) {
      if (houses && houses.length) {
        setHouseLists([...houseLists, ...houses]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1,
        });
        setShowLoading(houses.length === page.pageSize);
      } else {
        setHouseLists([]);
        setShowLoading(false);
      }
    }
  }, [loading]);

  const _handleSubmit = (value: string) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setReloadHouseNum(0);
    setShowLoading(true);
    setPage(CommonEnum.PAGE);
  };

  const handleChange = (value: string) => {
    setHouseName(value);
  };
  const handleCancel = () => {
    if (houseSubmitName !== '') {
      _handleSubmit('');
    }
  };
  const handleSubmit = (value: string) => {
    if (houseSubmitName !== value) {
      _handleSubmit(value);
    }
  };
  return (
    <ErrorBoundary>
      <div className="search-page">
        <SearchBar
          placeholder="搜索民宿"
          value={houseName}
          onChange={handleChange}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
        {!houseLists.length && loading ? (
          <ActivityIndicator toast />
        ) : (
          <div className="result">
            {houseLists.map(item => (
              <div className="item" key={item.id}>
                <img
                  alt="img"
                  className="item-img"
                  src={require('../../assets/blank.png')}
                  data-src={item.imgs ? item.imgs[0]?.url : undefined}
                />
                <div className="item-right">
                  <div className="title">{item.name}</div>
                  <div className="price">¥ {item.price}</div>
                </div>
              </div>
            ))}
            {houseLists.length ? (
              <ShowLoading showLoading={showLoading} />
            ) : (
              <div className={'page-end'}>无搜索信息～</div>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Search;
