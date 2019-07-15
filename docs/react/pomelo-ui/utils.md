# 工具

::: tip
提取能在整个项目中能够复用的一些组件和方法
:::

## 获取浏览器视口的宽高

```js
export default function getViewportSize() {
  // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  const doc = document.documentElement;
  return {
    width: Math.max(doc.clientWidth, window.innerWidth || 0),
    height: Math.max(doc.clientHeight, window.innerHeight || 0)
  };
}
```

## 浏览器事件处理组件

```js
import PropTypes from "prop-types";
import { PureComponent } from "react";

export default class WindowEventHandler extends PureComponent {
  static propTypes = {
    eventName: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    useCapture: PropTypes.bool
  };

  static defaultProps = {
    useCapture: false
  };

  componentDidMount() {
    const { eventName, callback, useCapture } = this.props;
    window.addEventListener(eventName, callback, useCapture);
  }

  componentWillUnmount() {
    const { eventName, callback, useCapture } = this.props;
    window.removeEventListener(eventName, callback, useCapture);
  }

  render() {
    return null;
  }
}
```

::: tip

- [EventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
- addEventListener 返回值为 `undefined`
- removeEventListener 和 addEventListener 的用法一样，而不是跟 clearInterval() 传入 interval 的 id
- useCapture 是否使用事件捕获
  :::
