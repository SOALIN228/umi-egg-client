/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 22:03
 * Desc:
 */
import React, { useState } from 'react';
import { TabBar } from 'antd-mobile';
import { BsHouseDoorFill, BsHouseDoor, BsBagFill, BsBag, BsPersonFill, BsPerson } from 'react-icons/bs';
import { history } from 'umi';
import './index.less';

interface IProps {
  show: boolean,
  pathname: string
}

interface IItem {
  title: string,
  selectedIcon: JSX.Element,
  icon: JSX.Element,
  link: string
}

const items: IItem[] = [{
  title: '首页',
  selectedIcon: <BsHouseDoorFill style={{ fontSize: '1.5rem' }}/>,
  icon: <BsHouseDoor style={{ fontSize: '1.5rem' }}/>,
  link: '/',
},
  {
    title: '订单',
    selectedIcon: <BsBagFill style={{ fontSize: '1.5rem' }}/>,
    icon: <BsBag style={{ fontSize: '1.5rem' }}/>,
    link: '/order',
  },
  {
    title: '我的',
    selectedIcon: <BsPersonFill style={{ fontSize: '1.5rem' }}/>,
    icon: <BsPerson style={{ fontSize: '1.5rem' }}/>,
    link: '/user',
  },
];

const MenuBar: React.FC<IProps> = (props) => {
  const { show, pathname } = props;
  return (
    <div className={'menu-bar'}>
      <TabBar hidden={!show}>
        {items.map(item => (
          <TabBar.Item
            key={item.link}
            title={item.title}
            icon={item.icon}
            selectedIcon={item.selectedIcon}
            selected={pathname === item.link}
            onPress={() => history.push(item.link)}
          />
        ))}
      </TabBar>
    </div>
  );
};

MenuBar.defaultProps = {
  show: false,
  pathname: '',
};

export default MenuBar;
