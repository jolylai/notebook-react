# Upload

## Form 中使用 Upload

以下例子不一定能运行，只提供下思路，下次用到再整理

```js
import React from "react";
import { Form, Upload } from "antd";

@Form.create()
class UploadDemo extends React.PureComponent {
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Form.Item {...formItemLayout} label="上传主图">
          {getFieldDecorator("imageUrl", {
            rules: [{ required: true, message: "请上传主图" }],
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(<Upload {...uploadProps} />)}
        </Form.Item>
      </Form>
    );
  }
}
```
