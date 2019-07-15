# 高级用法

## [React.memo](https://reactjs.org/docs/react-api.html#reactmemo)

`React.memo` 是一个高价组件，类似于 class 写法中的 `React.PureComponent`

```js
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false

  这个返回值是和 `shouldComponentUpdate()` 相反
  */
}
export default React.memo(MyComponent, areEqual);
```
