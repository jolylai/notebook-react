# Select

## defaultProps

```js
const defaultSelectProps = {
  allowClear: true,
  showSearch: true,
  placeholder: "请选择",
  optionFilterProp: "children",
  filterOption: (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
};
```
