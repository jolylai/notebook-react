# useRef

## Ref 和 DOM

在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

### 勿过度使用 Refs

你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 状态提升 以获取更多有关示例。

## 不仅仅是 ref

ref 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。

```js
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

## 回调 ref

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

```js
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

在这个案例中，我们没有选择使用 useRef，因为当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。

注意到我们传递了 [] 作为 useCallback 的依赖列表。这确保了 ref callback 不会在再次渲染时改变，因此 React 不会在非必要的时候调用它。

把这个逻辑抽取出来作为 一个可复用的 Hook

```js
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```

使用 callback ref 可以确保 即便[子组件延迟显示被测量的节点](https://codesandbox.io/s/818zzk8m78) (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。

```js
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

function MeasureExample() {
  const [height, setHeight] = useState(0);

  // Because our ref is a callback, it still works
  // even if the ref only gets attached after button
  // click inside the child component.
  const measureRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <Child measureRef={measureRef} />
      {height > 0 && <h2>The above header is {Math.round(height)}px tall</h2>}
    </>
  );
}

function Child({ measureRef }) {
  const [show, setShow] = useState(false);
  if (!show) {
    return <button onClick={() => setShow(true)}>Show child</button>;
  }
  return <h1 ref={measureRef}>Hello, world</h1>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MeasureExample />, rootElement);
```
