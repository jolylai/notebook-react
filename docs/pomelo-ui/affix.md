# 固钉

> [HTMLElement.offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)

## html 结构

```html
<!-- 当Affix后占据文档上的位置 -->
<div>
  <!-- Affiix 后 -->
  <div>{children}</div>
</div>
```

## css

```css
div {
  position: fixed;
}
```

## 知识点

1. 需要获取组件的宽高进行计算，使用有状态组件，因为 [ReactDom.findDOMNode](https://react.docschina.org/docs/react-dom.html#finddomnode) 不能用于函数式的组件中。
2. 使用[HTMLElement.offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth) 获取元素的宽高

## [获取视口的宽高](https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript)

```js
export default function getViewportSize() {
  const doc = document.documentElement;
  return {
    width: Math.max(doc.clientWidth, window.innerHeight || 0),
    height: Math.max(doc.clientHeight, window.innerHeight || 0)
  };
}
```

## 获取元素的尺寸

```js
import ReactDOM from "react-dom";

const element = ReactDOM.findDOMNode(this);

// 包含 `padding` 和 `border` 即 `border-box` 的尺寸
const widthToBorder = element.offsetWith;
const heightToBorder = element.offsetHeight;

// 包含 `padding` 但不包括 `border` 的尺寸
const widthToPadding = element.clientWidth;
const heightToPadding = element.clientHeight;

// 没有包含 `padding` 、`border` 和 `margin`的尺寸
```

::: tip

- [ReactDom.findDOMNode](https://react.docschina.org/docs/react-dom.html#finddomnode) 不能用于函数式的组件中。
- 需要获取组件的宽高进行计算，使用有状态组件，因为 [ReactDom.findDOMNode](https://react.docschina.org/docs/react-dom.html#finddomnode) 不能用于函数式的组件中。
  :::
