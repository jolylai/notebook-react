# useEffect

## 清除 Effect

为防止内存泄漏，清除函数会在组件卸载前执行。

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除，即执行 effect 中 return 的函数，然后再执行 useEffect 中除 return 的函数

## 执行时机

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制**之后**，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

## 条件执行

默认情况下，effect 将在每轮渲染结束后执行

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
});
```

仅在某些值变化的时候执行 effect，比如下面只有当 props.source 改变后才会重新创建订阅。

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```
如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。似于 componentDidMount 和 componentWillUnmount 的思维模式
```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## 性能优化
要记住 effect 外部的函数使用了哪些 props 和 state 很难。这也是为什么 通常你会想要在 effect 内部 去声明它所需要的函数。

```js
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 这样不安全（它调用的 `doSomething` 函数使用了 `someProp`）
}
```
把那个函数移动到你的 effect 内部。这样就能很容易的看出来你的 effect 使用了哪些 props 和 state，并确保它们都被声明了
```js
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）
}
```
如果处于某些原因你 无法 把一个函数移动到 effect 内部，还有一些其他办法：

- 你可以尝试把那个函数移动到你的组件之外。那样一来，这个函数就肯定不会依赖任何 props 或 state，并且也不用出现在依赖列表中了。
- 如果你所调用的方法是一个纯计算，并且可以在渲染时调用，你可以 转而在 effect 之外调用它， 并让 effect 依赖于它的返回值。
- 万不得已的情况下，你可以 把函数加入 effect 的依赖但 把它的定义包裹 进 useCallback Hook。这就确保了它不随渲染而改变，除非 它自身 的依赖发生了改变：
  
```js
function ProductPage({ productId }) {
  // ✅ 用 useCallback 包裹以避免随渲染发生改变
  const fetchProduct = useCallback(() => {
    // ... Does something with productId ...
  }, [productId]); // ✅ useCallback 的所有依赖都被指定了

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct })
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ useEffect 的所有依赖都被指定了
  // ...
}
```