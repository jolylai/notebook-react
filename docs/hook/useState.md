# useState

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
