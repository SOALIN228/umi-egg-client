/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 00:46
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { Dispatch } from '@/store';
import { useLocation } from 'umi';

const mapDispatch = (dispatch: Dispatch) => ({
  addCommentsAsync: (payload?: object) =>
    dispatch.house.addCommentsAsync(payload),
});

type dispatchProps = ReturnType<typeof mapDispatch>;
type Props = dispatchProps;

const Footer: React.FC<Props> = props => {
  const [show, setShow] = useState(false);
  const [commentsValue, setCommentsValue] = useState();
  const { query }: any = useLocation();

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (val?: string) => {
    setCommentsValue(val as any);
  };

  const handleSubmit = () => {
    if (commentsValue) {
      handleClose();
      props.addCommentsAsync({
        comment: commentsValue,
        houseId: query?.id,
      });
    } else {
      Toast.fail('请添加信息');
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="footer" onClick={handleClick}>
        评论~
      </div>
      <Modal
        show={show}
        onClose={handleClose}
        styleBody={{
          height: '220px',
          bottom: '0px',
          top: 'unset',
        }}
      >
        <div className="modal-comment">
          <TextareaItem rows={2} count={200} onChange={handleChange} />
          <Button className="comment-btn" type="warning" onClick={handleSubmit}>
            评论
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default connect(null, mapDispatch)(Footer);
