/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 01:13
 * Desc:
 */
import React from 'react';
import { Icon } from 'antd-mobile';
import CreatePortal from '@/components/CreatePortal';
import './index.less';

interface IProps {
  show: boolean;
  onClose?: Function;
  styleBody?: React.CSSProperties;
  styleClose?: React.CSSProperties;
}

const Modal: React.FC<IProps> = props => {
  const handleClose = () => {
    props.onClose && props.onClose();
  };

  return (
    <>
      {props.show && (
        <CreatePortal id={'modal-dom'}>
          <div className={'modal'}>
            <div className={'modal-body'} style={props.styleBody}>
              {props.children}
              <Icon
                type="cross"
                size="lg"
                onClick={handleClose}
                className={'modal-close'}
                style={props.styleClose}
              />
            </div>
          </div>
        </CreatePortal>
      )}
    </>
  );
};

export default Modal;
