# useState

```js
const [state, setState] = useState(initialState);
```

## state

在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

## 更新 state

```js
// 直接更新
setState(newState);

// 函数式更新
setState(prevCount => prevCount - 1);
```

## 惰性初始化 state

initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

第一个常见的使用场景是当创建初始 state 很昂贵时：

```js
function Table(props) {
  // ⚠️ createRows() 每次渲染都会被调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

为避免重新创建被忽略的初始 state，我们可以传一个 函数 给 useState：

```js
function Table(props) {
  // ✅ createRows() 只会被调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

## FAQ

### 我应该使用单个还是多个 state 变量？

推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化。

如果你之前用过 class，你或许会试图总是在一次 useState() 调用中传入一个包含了所有 state 的对象。

```js
const [state, setState] = useState({ left: 0, top: 0, width: 0, height: 0 });
useEffect(() => {
  function handleWindowMouseMove(e) {
    // 展开 「...state」 以确保我们没有 「丢失」 width 和 height
    setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
  }
  // 注意：这是个简化版的实现
  window.addEventListener("mousemove", handleWindowMouseMove);
  return () => window.removeEventListener("mousemove", handleWindowMouseMove);
}, []);
```

组件的 state 拆分为 position 和 size 两个对象，并永远以非合并的方式去替换 position

```js
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
```

把独立的 state 变量拆分开还有另外的好处。这使得后期把一些相关的逻辑抽取到一个自定义 Hook 变得容

```js
function Box() {
  const position = useWindowPosition();
  const [size, setSize] = useState({ width: 100, height: 100 });
  // ...
}

function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, []);
  return position;
}
```
