/**
 * User: soalin
 * Date: 2020/11/18
 * Time: 07:53
 * Desc:
 */
import React, { useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { connect } from 'react-redux';
import { Dispatch } from '@/store';
import './index.less';

const mapDispatch = (dispatch: Dispatch) => ({
  registerAsync: (payload: ILoginParams) =>
    dispatch.user.registerAsync(payload),
});

interface IProps {
  // 添加'rc-form' 类型
  form: {
    getFieldProps: any;
    validateFields: any;
  };
}

interface ILoginParams {
  username: string;
  password: string;
}

type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = DispatchProps & IProps;

const Register: React.FC<Props> = props => {
  const { getFieldProps, validateFields } = props.form;

  const handleSubmit = () => {
    validateFields((error: any, value: any) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      } else {
        if (value.password !== value.password2) {
          Toast.fail('密码和确认密码必须一致');
          return;
        }
        props.registerAsync({
          username: value.username,
          password: value.password,
        });
      }
    });
  };
  const handleClick = () => {
    history.push('/login');
  };

  useEffect(() => {}, []);

  return (
    <ErrorBoundary>
      <div className="register-page">
        <List renderHeader={() => '用户注册'}>
          <InputItem
            {...getFieldProps('username', {
              rules: [{ required: true }],
            })}
            placeholder="用户名"
          >
            用户名：
          </InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [{ required: true }],
            })}
            placeholder="密码"
          >
            密码：
          </InputItem>
          <InputItem
            {...getFieldProps('password2', {
              rules: [{ required: true }],
            })}
            placeholder="确认密码"
          >
            确认密码：
          </InputItem>
        </List>
        <Button type="warning" onClick={handleSubmit}>
          注册
        </Button>
        <div className="login" onClick={handleClick}>
          已有账户，去登录
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default connect(null, mapDispatch)(createForm()(Register));
