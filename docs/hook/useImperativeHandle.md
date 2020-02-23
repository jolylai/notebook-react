# useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps]);
```

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

```js
FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  console.log("ref", ref);
  //   { current: <input />}

  return <FancyInput ref={inputRef} />;
}
```

`<FancyInput ref={inputRef} />` 的父组件的 Ref 中拿到是 Input 这个 Dom

```js
FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  inputRef.current.focus();
  return <FancyInput ref={inputRef} />;
}
```

`<FancyInput ref={inputRef} />` 的父组件 ref 是 useImperativeHandle 第二个函数参数返回的值，多以可以调用 inputRef.current.focus()。
