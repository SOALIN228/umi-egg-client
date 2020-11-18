/**
 * User: soalin
 * Date: 2020/11/17
 * Time: 20:33
 * Desc:
 */
import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/store';

const mapState = (state: RootState) => ({
  id: state.user.id,
  avatar: state.user.avatar,
  tel: state.user.tel,
  sign: state.user.sign,
});

const mapDispatch = (dispatch: Dispatch) => ({
  editUserAsync: (payload: object) => dispatch.user.editUserAsync(payload),
});

interface IProps {
  // 添加'rc-form' 类型
  form: {
    getFieldProps: any;
    validateFields: any;
  };
}

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps & IProps;

interface IFile {
  url: string;
  id: number | undefined;
}

const Edit: React.FC<Props> = props => {
  const [files, setFiles] = useState<IFile[]>([
    { url: props.avatar || '', id: props.id },
  ]);
  const { getFieldProps, validateFields } = props.form;
  const handleChange = (files: any) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      Toast.fail('图片大小不能大于0.5M');
      return;
    }
    setFiles(files);
  };

  const handleSubmit = () => {
    if (!files.length && files[0].url) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error: any, value: any) => {
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        props.editUserAsync({
          avatar: files[0].url,
          tel: value.tel,
          sign: value.sign,
        });
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="user-edit">
      <List>
        <List.Item>
          <ImagePicker
            files={files}
            selectable={files.length < 1}
            onChange={handleChange}
          />
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('tel', {
              rules: [{ required: true }],
              initialValue: props.tel,
            })}
            placeholder="电话"
          >
            电话：
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('sign', {
              rules: [{ required: true }],
              initialValue: props.sign,
            })}
            placeholder="签名"
          >
            签名：
          </InputItem>
        </List.Item>
      </List>
      <Button
        type="warning"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        修改
      </Button>
    </div>
  );
};

export default connect(mapState, mapDispatch)(createForm()(Edit));
