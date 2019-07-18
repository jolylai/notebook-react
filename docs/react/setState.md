# setState

## 合成事件中的 setState

react 为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在 jsx 中常见的 onClick、onChange 这些都是合成事件。

```js
class App extends Component {
  state = { val: 0 };

  increment = () => {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 输出的是更新前的val --> 0
  };
  render() {
    return (
      <div onClick={this.increment}>{`Counter is: ${this.state.val}`}</div>
    );
  }
}
```

## 生命周期函数中的 setState

```js
class App extends Component {
  state = { val: 0 };

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 输出的还是更新前的值 --> 0
  }
  render() {
    return <div>{`Counter is: ${this.state.val}`}</div>;
  }
}
```

当 componentDidmount 执行的时候，react 内部并没有更新，执行完 componentDidmount 后才去 commitUpdateQueue 更新。这就导致你在 componentDidmount 中 setState 完去 console.log 拿的结果还是更新前的值。

## 原生事件中的 setState

原生事件是指非 react 合成事件，原生自带的事件监听 addEventListener ，或者也可以用原生 js、jq 直接 document.querySelector().onclick 这种绑定事件的形式都属于原生事件。

```js
class App extends Component {
  state = { val: 0 };

  changeValue = () => {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 输出的是更新后的值 --> 1
  };

  componentDidMount() {
    document.body.addEventListener("click", this.changeValue, false);
  }

  render() {
    return <div>{`Counter is: ${this.state.val}`}</div>;
  }
}
```

## setTimeout 中的 setState

在 setTimeout 中去 setState 并不算是一个单独的场景，它是随着你外层去决定的，因为你可以在合成事件中 setTimeout ，可以在钩子函数中 setTimeout ，也可以在原生事件 setTimeout，但是不管是哪个场景下，基于 event loop 的模型下， setTimeout 中里去 setState 总能拿到最新的 state 值。

```js
class App extends Component {
  state = { val: 0 };

  componentDidMount() {
    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 输出更新后的值 --> 1
    }, 0);
  }

  render() {
    return <div>{`Counter is: ${this.state.val}`}</div>;
  }
}
```

## setState 中的批量更新

```js
class App extends Component {
  state = { val: 0 };

  batchUpdates = () => {
    this.setState({ val: this.state.val + 1 });
    this.setState({ val: this.state.val + 1 });
    this.setState({ val: this.state.val + 1 });
  };

  render() {
    return (
      <div onClick={this.batchUpdates}>
        {`Counter is ${this.state.val}`} // 1
      </div>
    );
  }
}
```

上面的结果最终是 1，在 setState 的时候 react 内部会创建一个 updateQueue ，通过 firstUpdate 、 lastUpdate 、 lastUpdate.next 去维护一个更新的队列，在最终的 performWork 中，相同的 key 会被覆盖，只会对最后一次的 setState 进行更新

## 思考

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
}
```

结合上面分析的，钩子函数中的 setState 无法立马拿到更新后的值，所以前两次都是输出 0，当执行到 setTimeout 里的时候，前面两个 state 的值已经被更新，由于 setState 批量更新的策略， this.state.val 只对最后一次的生效，为 1，而在 setTimmout 中 setState 是可以同步拿到更新结果，所以 setTimeout 中的两次输出 2，3，最终结果就为 0, 0, 2, 3 。

## 总结

- setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
- setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
- setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。
