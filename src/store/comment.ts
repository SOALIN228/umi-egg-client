/**
 * User: soalin
 * Date: 2020/11/27
 * Time: 07:01
 * Desc:
 */
import { createModel } from '@rematch/core';
import { RootModel } from '@/store/models';
import { UserProps } from '@/store/user';
import { CommonEnum } from '@/enums';
import http from '@/utils/http';

interface CommentInfo {
  id: number;
  userId: string;
  houseId: string;
  msg: string;
  createTime: number;
}

export interface CommentProps {
  id: number;
  user: UserProps;
  username: string;
  createTime: number;
  msg: string;
}

interface CommentState {
  comments: CommentProps[];
  page: CommonEnum.PageProps;
  reloadCommentsNum: number;
  showLoading: boolean;
  reset: boolean;
}

export const comment = createModel<RootModel>()({
  state: {
    comments: [] as CommentProps[],
    page: CommonEnum.PAGE,
    reloadCommentsNum: 0,
    showLoading: true,
    reset: false,
  } as CommentState,
  reducers: {
    getComments(state, payload: CommentProps[]) {
      return {
        ...state,
        comments: state.comments.concat(payload),
      };
    },
    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...state.page,
          pageNum: state.page.pageNum + 1,
        },
        reset: false,
      };
    },
    setShowLoading(state, payload: boolean) {
      return {
        ...state,
        showLoading: payload,
      };
    },
    resetData(state, payload: object) {
      return {
        ...state,
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async getCommentsAsync(payload: object = {}, state) {
      try {
        const comments: CommentProps[] = await http<CommentProps[]>({
          url: '/comment/lists',
          body: {
            ...payload,
            pageSize: state.comment.page.pageSize,
            pageNum: state.comment.page.pageNum,
          },
          method: 'post',
        });
        dispatch({
          type: 'comment/getComments',
          payload: comments,
        });
        dispatch({
          type: 'comment/setShowLoading',
          payload: comments.length > 0,
        });
      } catch (err) {
        console.log('err', err);
      }
    },
    async addCommentsAsync(payload: object = {}, state) {
      try {
        const res = await http<CommentInfo>({
          url: '/comment/add',
          body: payload,
          method: 'post',
        });
        if (res) {
          dispatch({
            type: 'comment/resetData',
            payload: {
              reset: true,
            },
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  }),
});
