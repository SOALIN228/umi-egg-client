/**
 * User: soalin
 * Date: 2020/11/18
 * Time: 07:10
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
  loginAsync: (payload: ILoginParams) => dispatch.user.loginAsync(payload),
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

const Login: React.FC<Props> = props => {
  const { getFieldProps, validateFields } = props.form;

  const handleSubmit = () => {
    validateFields((error: any, value: ILoginParams) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      } else {
        props.loginAsync(value);
      }
    });
  };
  const handleClick = () => {
    history.push('/register');
  };

  useEffect(() => {}, []);

  return (
    <ErrorBoundary>
      <div className="login-page">
        <List renderHeader={() => '用户登录'}>
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
        </List>
        <Button type="warning" onClick={handleSubmit}>
          登录
        </Button>
        <div className="register" onClick={handleClick}>
          没有账户，去注册
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default connect(null, mapDispatch)(createForm()(Login));
