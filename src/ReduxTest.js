import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { add, minus, asyncAdd } from "./store/counter.redux";
import store from "./store";

@connect(
    state => ({ count: state.counter.count }),
    {
        add, minus, asyncAdd
    }
  )
class ShowCounter extends Component {
    render() {
        return (
          <div>
            <p>{this.props.count}</p>
            <div>
              <button onClick={() => this.props.minus()}>-</button>
              <button onClick={() => this.props.add()}>+</button>
              <button onClick={() => this.props.asyncAdd()}>asyncAdd</button>
            </div>
          </div>
        );
    }
}

export default class ReduxTest extends Component {
    render() {
        return (
            <Provider store={store}>
                <ShowCounter/>
            </Provider>
        )
    }
};
