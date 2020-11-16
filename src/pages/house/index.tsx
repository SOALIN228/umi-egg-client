/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:27
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import Banner from '@/pages/house/components/Banner';
import Info from '@/pages/house/components/Info';
import List from '@/pages/house/components/List';
import Footer from '@/pages/house/components/Footer';
import useObserverHook from '@/hooks/useObserverHook';
import { CommonEnum } from '@/enums';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import { useLocation } from 'umi';
import './index.less';

const mapState = (state: RootState) => ({
  detail: state.house.detail,
  comments: state.house.comments,
  showLoading: state.house.showLoading,
  reloadCommentsNum: state.house.reloadCommentsNum,
  reset: state.house.reset,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getDetailAsync: (payload?: object) => dispatch.house.getDetailAsync(payload),
  getCommentsAsync: (payload?: object) =>
    dispatch.house.getCommentsAsync(payload),
  reloadComments: () => dispatch.house.reloadComments(),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

const House: React.FC<Props> = props => {
  const { query }: any = useLocation();
  useEffect(() => {
    props.getDetailAsync({
      id: query?.id,
    });
  }, []);

  useEffect(() => {
    props.getCommentsAsync({
      id: query?.id,
    });
  }, [props.reloadCommentsNum]);

  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    entries => {
      console.log(
        'cb2',
        entries[0].isIntersecting,
        props.showLoading,
        props.comments.length,
      );
      if (
        (props.comments.length || props.reset) &&
        props.showLoading &&
        entries[0]?.isIntersecting
      ) {
        console.log('props.reloadCommentsNum', props.reloadCommentsNum);
        props.reloadComments();
      }
    },
    [props.comments.length, props.showLoading],
  );

  console.log('rr');
  return (
    <div className="house-page">
      <Banner banner={props.detail.banner} />
      <Info info={props.detail.info} />
      <List list={props.comments} showLoading={props.showLoading} />
      <Footer />
    </div>
  );
};

export default connect(mapState, mapDispatch)(House);