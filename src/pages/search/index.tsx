/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 23:20
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import useHttpHook from '@/hooks/useHttpHook';
import useObserverHook from '@/hooks/useObserverHook';
import { useLocation } from 'umi';
import './index.less';

interface HouseItem {
  id: number;
  img: string;
  title: string;
  price: string;
}

const Search: React.FC<{}> = (props) => {
  const { query }: any = useLocation();
  const [houseName, setHouseName] = useState('');
  const [houseLists, setHouseLists] = useState<HouseItem[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSubmitName, setHouseSubmitName] = useState('');
  const [page, setPage] = useState({
    pageSize: 8,
    pageNum: 1,
  });
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
    watch: [page.pageNum, houseSubmitName],
  });
  useObserverHook('#loading', (entries: IntersectionObserverEntry[]) => {
    if (!loading && entries[0].isIntersecting) {
      setPage({
        ...page,
        pageNum: page.pageNum + 1,
      });
    }
  });

  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if (houses.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [loading]);

  const _handleSubmit = (value: string) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage({
      pageSize: 8,
      pageNum: 1,
    });
    setHouseLists([]);
  };

  const handleChange = (value: string) => {
    setHouseName(value);
  };
  const handleCancel = () => {
    _handleSubmit('');
  };
  const handleSubmit = (value: string) => {
    if (houseSubmitName !== value) {
      _handleSubmit(value);
    }
  };
  return (
    <div className='search-page'>
      <SearchBar
        placeholder='搜索民宿'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      {!houseLists.length
        ? <ActivityIndicator toast/>
        : <div className='result'>
          {houseLists.map(item => (
            <div className='item' key={item.id + Math.random()}>
              <img alt='img' className='item-img' src={item.img} data-src={item.img}/>
              <div className='item-right'>
                <div className='title'>{item.title}</div>
                <div className='price'>{item.price}</div>
              </div>
            </div>
          ))}
          {showLoading ? <div id={'loading'}>loading</div> : <div>null</div>}
        </div>
      }
    </div>
  );
};

export default Search;
