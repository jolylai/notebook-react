# Field

根据 props 中的 type 属性渲染不同的表单基础组件，props 中的其他属性为要渲染的组件的属性

```jsx
import * as React from "react";
import PropTypes from "prop-types";
import {
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  Switch,
  Rate,
  Slider
} from "antd";
import XUpload from "../XUpload";

const defaultSelectProps = {
  allowClear: true,
  showSearch: true,
  placeholder: "请选择",
  optionFilterProp: "children",
  filterOption: (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
};

class Field extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  // Input
  renderInput = props => {
    return <Input {...props} />;
  };

  // InputNumber
  renderInputNumber = props => {
    return <InputNumber {...props} />;
  };

  // Textarea
  renderTextArea = props => {
    return <Input.TextArea {...props} />;
  };

  // Select
  renderSelect = props => {
    const { options = [], ...restSelectProps } = props;
    return (
      <Select {...defaultSelectProps} {...restSelectProps}>
        {options.map(item => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    );
  };

  // Radio
  renderRadio = props => {
    return <Radio.Group {...props}></Radio.Group>;
  };

  // Checkbox
  renderCheckbox = props => {
    return <Checkbox {...props} />;
  };

  // CheckBox Group
  renderCheckboxGroup = props => {
    return <Checkbox.Group {...props} />;
  };

  // Password
  renderPassword = props => {
    return <Input.Password {...props} />;
  };

  // Switch
  renderSwitch = props => {
    return <Switch {...props}></Switch>;
  };

  // Rate
  renderRate = props => {
    return <Rate {...props}></Rate>;
  };

  // Slider
  renderSlider = props => {
    return <Slider {...props}></Slider>;
  };

  // Upload
  renderUpload = props => {
    return <XUpload {...props}></XUpload>;
  };

  // 自定义表单项
  renderCustom = props => {
    const { node } = props;
    return <React.Fragment>{node}</React.Fragment>;
  };

  // 渲染表单项
  renderField = fieldProps => {
    const { type, ...props } = fieldProps;
    switch (type) {
      case "input":
        return this.renderInput(props);
      case "inputNumber":
        return this.renderInputNumber(props);
      case "textarea":
        return this.renderTextArea(props);
      case "select":
        return this.renderSelect(props);
      case "radio":
        return this.renderRadio(props);
      case "checkbox":
        return this.renderCheckbox(props);
      case "checkboxGroup":
        return this.renderCheckboxGroup(props);
      case "password":
        return this.renderPassword(props);
      case "switch":
        return this.renderSwitch(props);
      case "rate":
        return this.renderRate(props);
      case "slider":
        return this.renderSlider(props);
      case "upload":
        return this.renderUpload(props);
      case "custom":
        return this.renderCustom(props);
      default:
        return null;
    }
  };

  render() {
    return this.renderField(this.props);
  }
}

export default Field;
```

## 思考

- 在组件中同时引入了多个组件，如果在项目中大量应用会不会产生性能问题
- 可不可以用`react-loadable`优化
