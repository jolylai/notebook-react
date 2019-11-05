# 自定义表单

## 数据格式

```js
const fields = [
  {
    name: "custom",
    type: "custom",
    label: "Plain Text",
    node: <div>Plain</div>
  },
  {
    name: "name",
    label: "名称",
    type: "input",
    placeholder: "请输入名称",
    rules: [
      {
        required: true,
        message: "请输入名称"
      }
    ]
  },
  {
    name: "size",
    label: "大小",
    type: "inputNumber",
    placeholder: "请输入大小",
    rules: [
      {
        required: true,
        message: "请输入名称"
      }
    ]
  },
  {
    name: "city",
    label: "城市",
    type: "select",
    options: [
      {
        label: "北京",
        value: 0
      }
    ]
  },
  {
    name: "fruit",
    label: "水果",
    mode: "multiple",
    type: "select",
    options: [
      {
        label: "苹果",
        value: "applue"
      },
      {
        label: "香蕉",
        value: "banana"
      }
    ]
  },
  {
    name: "slider",
    type: "slider",
    label: "Slider",
    marks: {
      0: "A",
      20: "B",
      40: "C",
      60: "D",
      80: "E",
      100: "F"
    }
  },
  {
    name: "area",
    label: "地区",
    type: "radio",
    options: ["城区", "郊区"]
  },
  {
    name: "confirm",
    label: "确认选择",
    type: "checkbox"
  },
  {
    name: "checkboxGroup",
    label: "确认选择",
    type: "checkboxGroup",
    options: ["是", "否"],
    onChange: e => console.log("e", e),
    rules: [
      {
        required: true,
        message: "请确认选择"
      }
    ]
  },
  {
    name: "custom",
    label: "自定义项",
    type: "custom",
    node: (
      <div>
        <h2>自定义表单项</h2>
      </div>
    )
  },
  {
    name: "password",
    label: "密码",
    type: "password",
    rules: [
      {
        required: true,
        message: "请输入密码"
      }
    ]
  },
  {
    name: "choosen",
    label: "是否选择",
    type: "switch",
    checkedChildren: "开",
    unCheckedChildren: "关",
    rules: [
      {
        required: true,
        message: "请输入密码"
      }
    ]
  },
  {
    name: "rate",
    label: "评分",
    type: "rate"
  },
  {
    name: "describe",
    label: "描述",
    type: "textarea",
    placeholder: "请输入描述"
  }
];
```

## 完全受控表单

```js
const mapPropsToFields = props => {
  const { data, fields } = props;
  const nameList = fields.map(field => field.name);
  const fieldProps = nameList.reduce((result, name) => {
    const value = data[name];
    if (value) {
      const curData = {
        [name]: Form.createFormField({
          // ...props.username,
          value
        })
      };
      return { ...result, ...curData };
    }
    return result;
  }, {});
  return fieldProps;
};
```

## 非受控组件

```jsx
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";

import XField from "../XField";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    xl: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    xl: { span: 20 }
  }
};

@Form.create()
export default class index extends PureComponent {
  static propTypes = {
    fields: PropTypes.array,
    onSearch: PropTypes.func,
    onReset: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    data: {},
    fields: [],
    formItemLayout,
    onSubmit() {}
  };

  getValuePropName(type) {
    switch (type) {
      case "switch":
      case "checkbox":
        return "checked";
      default:
        return "value";
    }
  }

  getFieldDecoratorOptions = (fieldProps, data) => {
    const { rules, type, name, fieldDecoratorOptions = {} } = fieldProps;

    const valuePropName = this.getValuePropName(type);
    const value = data[name];
    const initialValue = valuePropName === "checked" ? Boolean(value) : value;

    const options = {
      initialValue,
      valuePropName,
      rules: rules,
      ...fieldDecoratorOptions
    };
    return options;
  };

  render() {
    const {
      fields,
      data,
      children,
      formItemLayout,
      form: { getFieldDecorator },
      ...restProps
    } = this.props;

    return (
      <Form {...formItemLayout} {...restProps}>
        {fields.map(field => {
          const { label, name } = field;
          const options = this.getFieldDecoratorOptions(field, data);
          return (
            <Form.Item key={name} label={label}>
              {getFieldDecorator(name, options)(<XField {...field} />)}
            </Form.Item>
          );
        })}
        {children}
      </Form>
    );
  }
}
```
