/**
 * User: soalin
 * Date: 2020/11/10
 * Time: 21:50
 * Desc:
 */
import React from 'react';
import './index.less';

interface IProps {
}

interface IState {
  flag: boolean
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  static getDerivedStateFromError (error: any) {
    console.log(error);
    return {
      flag: true,
    };
  }

  /** 用于记录错误日志 */
  componentDidCatch (error: any, info: any) {
  }

  render () {
    return (
      <div>
        {this.state.flag ? <h1 className='mk-error-page'>网络异常，请稍后再试！</h1> : this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
