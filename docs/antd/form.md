# Form

## 三等分

```jsx
import React from "react";
import {
  Select,
  Input,
  DatePicker,
  Button,
  Form,
  Row,
  Col,
  Tooltip,
  Icon
} from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

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
    <div>
      <h3>退款申请</h3>
      <Form {...formItemLayout} onSubmit={handleDownload}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="网店名称">
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请选择网店！" }]
              })(
                <Select style={{ width: "100%" }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item {...formLargeItemLayout} label="网店单号">
              <div style={{ position: "relative" }}>
                {getFieldDecorator("password")(<Input type="password" />)}
                <Tooltip
                  title={
                    <div>
                      <div>(1) 支持输入多个网店单号，不区分大小写</div>
                      <div>(2) 多个网店单号用逗号隔开</div>
                    </div>
                  }
                >
                  <Icon
                    type="exclamation-circle"
                    style={{ position: "absolute", right: -18, top: 14 }}
                  />
                </Tooltip>
              </div>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="网店下单时间">
              {getFieldDecorator("d")(<RangePicker />)}
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                下载网店订单
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

Download.defaultProps = {
  onDownload() {}
};

export default Form.create()(Download);
```
