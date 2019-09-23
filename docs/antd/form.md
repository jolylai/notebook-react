# Form

## 三等分

```jsx
import React from "react";
import { Input, Form, Row, Col } from "antd";

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

const Download = props => {
  const { form, onDownload } = props;
  const { getFieldDecorator, validateFields } = form;

  const handleDownload = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        onDownload(values);
      }
    });
  };

  return (
    <Form {...formItemLayout} onSubmit={handleDownload}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="网店名称">
            {getFieldDecorator("username", {
              initialValue: "",
              rules: [{ required: true, message: "请选择网店！" }]
            })(<Input type="password" />)}
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item {...formLargeItemLayout} label="网店单号">
            {getFieldDecorator("password")(<Input type="password" />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

Download.defaultProps = {
  onDownload() {}
};

export default Form.create()(Download);
```
