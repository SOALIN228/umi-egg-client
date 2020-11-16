/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:45
 * Desc:
 */
import React, { useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';

interface IProps {
  banner?: string[];
}

const config = {
  loop: true,
  autoplay: {
    delay: 1500,
  },
  pagination: {
    el: '.swiper-pagination',
  },
};

const Banner: React.FC<IProps> = props => {
  useEffect(() => {}, []);
  return (
    <AwesomeSwiper className="banner" config={config}>
      <div className="swiper-wrapper">
        {props.banner?.map(item => (
          <div className="swiper-slide" key={item}>
            <img alt="banner" src={item} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination" />
    </AwesomeSwiper>
  );
};

export default Banner;
