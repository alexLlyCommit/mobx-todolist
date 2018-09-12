import { observable, action } from "mobx";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { observer, PropTypes as ObservablePropTypes } from "mobx-react";
import DevTools from "mobx-react-devtools";

class Store {
  @observable
  cache = {
    queue: []
  };
  @action.bound
  refresh() {
    this.cache.queue.push(1);
  }
}

const store = new Store();

@observer // 谁用到了可观察数据才需要用到observer进行重渲染
class Bar extends Component {
  static propTypes = {
    // queue: PropTypes.array
    queue: ObservablePropTypes.observableArray
  };
  render() {
    const queue = this.props.queue;
    return <span>{queue.length}</span>;
  }
}
class Foo extends Component {
  static propTypes = {
    // cache: PropTypes.object
    cache: ObservablePropTypes.observableObject
  };
  render() {
    const cache = this.props.cache;
    return (
      <div>
        <button onClick={this.props.refresh}>Refresh</button>
        <Bar queue={cache.queue} />
      </div>
    );
  }
}

ReactDOM.render(
  <React.Fragment>
    <Foo cache={store.cache} refresh={store.refresh} />,<DevTools />
  </React.Fragment>,
  document.querySelector("#root")
);
