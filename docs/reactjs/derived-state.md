# 派生状态

设计组件时，重要的是确定组件是**受控组件**还是**非受控组件**。

不要直接复制 props 的值到 state 中，而是去实现一个受控的组件，然后在父组件里合并两个值。

对于不受控的组件，当你想在 prop 变化（通常是 ID ）时重置 state 的话，可以选择一下几种方式：

- 建议: 重置内部所有的初始 state，使用 key 属性
- 选项一：仅更改某些字段，观察特殊属性的变化（比如 props.userID）。
- 选项二：使用 ref 调用实例方法。

## 什么时候使用派生 state

**保守使用派生 state**。大部分使用派生 state 导致的问题，不外乎两个原因：

- 直接复制 props 到 state 上；
- 如果 props 和 state 不一致就更新 state。下面的示例包含了这两种情况。

如果你只是为了缓存（memoize）基于当前 props 计算后的结果的话，你就没必要使用派生 state。尝试一下 memoization。

如果只是用来保存 props 或者和当前 state 比较之后不一致后更新 state，那你的组件应该是太频繁的更新了 state。

## 完全可控的组件 🚀

```jsx
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

不要在子组件里被动的接受 props.value 并跟踪一个临时的 state.value，
而要在父组件里管理 state.draftValue 和 state.committedValue，直接控制子组件里的值。这样数据才更加明确可预测。

## 非受控组件

另外一个选择是让组件自己存储临时的 email state。在这种情况下，组件仍然可以从 prop 接收“初始值”，但是更改之后的值就和 prop 没关系了

### 有 key 的非受控组件

**当 key 变化时， React 会创建一个新的而不是更新一个既有的组件。** Keys 一般用来渲染动态列表，但是这里也可以使用。

```jsx
<EmailInput defaultEmail={this.props.user.email} key={this.props.user.id} />
```

```jsx
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
```

每次 ID 更改，都会重新创建 EmailInput ，并将其状态重置为最新的 defaultEmail 值。使用此方法，不用为每次输入都添加 key，在整个表单上添加 key 更有位合理。每次 key 变化，表单里的所有组件都会用新的初始值重新创建。

大部分情况下，这是处理重置 state 的最好的办法。

### getDerivedStateFromProps

如果某些情况下 key 不起作用（可能是组件初始化的开销太大），一个麻烦但是可行的方案是在 getDerivedStateFromProps 观察 userID 的变化

```jsx
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // 只要当前 user 变化，
    // 重置所有跟 user 相关的状态。
    // 这个例子中，只有 email 和 user 相关。
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

### 使用实例方法重置非受控组件

更少见的情况是，即使没有合适的 key，我们也想重新创建组件。一种解决方案是给一个随机值或者递增的值当作 key，另外一种是用示例方法强制重置内部状态：

```jsx
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

然后父级组件可以使用 ref 调用这个方法。

refs 在某些情况下很有用，比如这个。但通常我们建议谨慎使用。即使是做一个演示，这个命令式的方法也是非理想的，因为这会导致两次而不是一次渲染。
