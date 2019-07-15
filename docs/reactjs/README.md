# React

## Awesome

- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

## Article

- [编写有弹性的组件](https://overreacted.io/zh-hans/writing-resilient-components/)
- [你可能不需要使用派生 state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
- [suspense](https://blog.logrocket.com/the-future-of-react-unfolding-with-suspense/)
- [react-window](https://web.dev/virtualize-long-lists-react-window)

## 小知识点

- React 组件中的 `key` 属性的值改变，React 将会创建新的实例，而不是更新现有的实例（可以用于重置 defaultProps）

## 重置不可控组件的 state

- 修改组件的 key 值（React 组件中的 `key` 属性的值改变，React 将会创建新的实例，而不是更新现有的实例）

- 传入一个 id 属性

```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.userID !== state.prevPropsUserID) {
      return {
        prevPropsUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  }

  // ...
}
```

- 使用组件中的方法(使用 ref 来调用这个方法)

```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail
  };

  resetEmailForNewUser(newEmail) {
    this.setState({ email: newEmail });
  }

  // ...
}
```
