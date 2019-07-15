# memoization

一个列表在用户输入查询条件时显示匹配的项

```jsx
// PureComponents 只会在 state 或者 prop 的值修改时才会再次渲染。
// 通过对 state 和 prop 的 key 做浅比较（ shallow comparison ）来确定有没有变化。
class Example extends PureComponent {
  // state 只需要保存 filter 的值：
  state = {
    filterText: ""
  };

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // PureComponent 的 render 只有
    // 在 props.list 或 state.filterText 变化时才会调用
    const { list } = this.props;
    const filteredList = list.filter(item =>
      item.text.includes(this.state.filterText)
    );

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {filteredList.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
```

只有在过滤很大的列表时，这样做的效率不是很好。当有 prop 改变时 PureComponent 不会阻止再次渲染。

```jsx
import memoize from "memoize-one";

class Example extends Component {
  // state 只需要保存当前的 filter 值：
  state = { filterText: "" };

  // 在 list 或者 filter 变化时，重新运行 filter：
  filter = memoize((list, filterText) =>
    list.filter(item => item.text.includes(filterText))
  );

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // 计算最新的过滤后的 list。
    // 如果和上次 render 参数一样，`memoize-one` 会重复使用上一次的值。
    const filteredList = this.filter(this.props.list, this.state.filterText);

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {filteredList.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
```

## useMemo

使用 react hooks 的 useMemo 实现

```jsx
import React, { useMemo, useState } from "react";

function Example(props) {
  const { list } = props;
  const [filterText, setFilterText] = useState("");
  const filteredList = useMemo(
    (list, filterText) => list.filter(item => item.text.includes(filterText)),
    [list, filterText]
  );
  return (
    <Fragment>
      <input onChange={setFilterText} value={filterText} />
      <ul>
        {filteredList.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </Fragment>
  );
}
```
