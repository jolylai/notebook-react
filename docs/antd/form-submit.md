# 表单提交

```jsx
import React from "react";
import { Input, Form, Button } from "antd";

class FormSubmit extends React.PureComponent {
  static defaultProps = {
    onSubmit() {}
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, onSubmit } = this.props;
    const { validateFields, validateFieldsAndScroll } = form;

    validateFields((error, values) => {
      if (!error) {
        onSubmit(values);
      }
    });

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="用户名">
          {getFieldDecorator("username"})(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator("password")(<Input type="password" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(FormSubmit);
```

使用`onSubmit`可以在填写完表单后可以直接按回车键提交表单，这在用于查询条件填写时非常好用，但需要阻止表单的默认方法，不然会刷新浏览器
