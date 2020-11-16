/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 09:48
 * Desc:
 */
import React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  id?: string;
}

interface IState {
  node: HTMLDivElement;
}

class CreatePortal extends React.Component<IProps, IState> {
  static defaultProps = {
    size: 'portal-root',
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      node: document.createElement('div'),
    };
  }

  componentDidMount() {
    this.state.node.setAttribute('id', this.props.id as string);
    document.body.appendChild(this.state.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.state.node);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.state.node);
  }
}

export default CreatePortal;
