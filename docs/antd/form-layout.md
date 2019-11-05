# 表单样式

## 三等分

```js
import React from "react";
import { Input, Form, Row, Col, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const formLargeItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

class FormLayout extends React.PureComponent {
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="用户名">
              {getFieldDecorator("username")(<Input />)}
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item {...formLargeItemLayout} label="密码">
              {getFieldDecorator("password")(<Input type="password" />)}
            </Form.Item>
          </Col>
          <Col offset={8} span={16}>
            <Form.Item colon={false} label=" ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(FormLayout);
```
