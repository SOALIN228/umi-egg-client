/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 23:20
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import ShowLoading from '@/components/ShowLoading';
import useHttpHook from '@/hooks/useHttpHook';
import useObserverHook from '@/hooks/useObserverHook';
import useImgHook from '@/hooks/useImgHook';
import useCallbackState from '@/hooks/useStateCallback';
import { CommonEnum } from '@/enums';
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
  const [houseLists, setHouseLists] = useCallbackState<HouseItem[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showNext, setShowNext] = useState(false);
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
    watch: [page.pageNum, houseSubmitName],
  });
  useObserverHook(`#${CommonEnum.LOADING_ID}`, (entries: IntersectionObserverEntry[]) => {
    if (!loading && showNext !== entries[0].isIntersecting) {
      setShowNext(entries[0].isIntersecting);
    }
  });
  useEffect(() => {
    if (showNext) {
      setPage({
        ...page,
        pageNum: page.pageNum + 1,
      });
    }
  }, [showNext]);
  useImgHook('.item-img');

  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        // 记录滚动位置
        const currentScrollTop =
          document.body.scrollTop + document.documentElement.scrollTop;
        // 加载新数据后滚动到加载前的位置
        setHouseLists([...houseLists, ...houses], () => {
          scrollTo(0, currentScrollTop);
        });
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
    setPage(CommonEnum.PAGE);
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
              <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-src={item.img}/>
              <div className='item-right'>
                <div className='title'>{item.title}</div>
                <div className='price'>{item.price}</div>
              </div>
            </div>
          ))}
          <ShowLoading showLoading={showLoading}/>
        </div>
      }
    </div>
  );
};

export default Search;
