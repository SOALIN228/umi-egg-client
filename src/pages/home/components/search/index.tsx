/**
 * User: soalin
 * Date: 2020/11/11
 * Time: 06:56
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import { Picker, List, Calendar, Button } from 'antd-mobile';
import dayjs from 'dayjs';

export interface ICityItem {
  value: string | number;
  label: React.ReactNode;
}

interface IProps {
  citys: ICityItem[][];
  citysLoading?: boolean
}

const Search: React.FC<IProps> = (props) => {
  const [selectedCity, setSelectedCity] = useState(['10001']);
  const [times, setTimes] = useState('可选时间');
  const [dateShow, setDateShow] = useState(false);

  const handleCityChange = (value: (string | number)[] | undefined) => {
    if (value) {
      setSelectedCity((value as string[]));
    }
  };
  const handleDate = () => {
    setDateShow(!dateShow);
  };
  const handleDateConfirm = (startDateTime: Date | undefined, endDateTime: Date | undefined) => {
    setDateShow(!dateShow);
    setTimes(dayjs(startDateTime).format('YYYY-MM-DD') + '~' + dayjs(endDateTime).format('YYYY-MM-DD'));
  };
  const handleClick = () => {
  };

  useEffect(() => {
  }, []);
  return (
    <div className={'search'}>
      <div className="search-addr">
        {!props.citysLoading && (
          <Picker data={props.citys} title={'城市'}
                  value={selectedCity}
                  cascade={false}
                  cols={1}
                  onChange={handleCityChange}>
            <List.Item>可选城市</List.Item>
          </Picker>
        )}
      </div>
      <div className="search-time" onClick={handleDate}>
        <p className='search-time_left'>出租时间</p>
        <p className='search-time_right'>{times}</p>
      </div>
      <Button type='warning' size='large' onClick={handleClick}>搜索民宿</Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  );
};

Search.defaultProps = {
  citys: [],
};

export default Search;
