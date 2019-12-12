# Upload

## Form 中使用 Upload

以下例子不一定能运行，只提供下思路，下次用到再整理

```jsx
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

## 半受控组件

```jsx
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Upload, Icon, Modal, message } from "antd";
import { isUrl } from "utils";

export default class XUpload extends PureComponent {
  static propTypes = {};

  static defaultProps = {
    listType: "picture-card",
    onChange() {}
  };

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  acceptImageType = ["image/jpeg", "image/png"];

  // 图片预览
  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl || file.url,
      previewVisible: true
    });
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false
    });
  };

  // 效验文件
  handleBeforeUpload = file => {
    const isJpgOrPng = this.acceptImageType.includes(file.type);
    if (!isJpgOrPng) {
      message.error("只能上传 .jpg .png .jpeg 格式的图片!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小需小于 2M!");
    }
    return isJpgOrPng && isLt2M;
  };

  checkFileStatus = file => {
    // 文件效验不通过
    if (file.status == null) return false;

    if (file.status === "done") {
      message.success(`${file.name} 上传成功`);
    } else if (file.status === "error") {
      message.error(`${file.name} 上传失败`);
    } else if (file.status === "removed") {
      message.success(`${file.name} 删除成功`);
    }
    return true;
  };

  handleFormValueChange = fileList => {
    const { onChange } = this.props;
    const value = fileList.map(file => file.url).filter(Boolean);
    onChange(value);
  };

  handleChange = ({ file, fileList }) => {
    // 获取服务器响应的文件URL
    let newFileList = fileList.map(file => {
      if (file.response && file.response.status) {
        file.url = file.response.body.fileUrl;
      }
      return file;
    });

    // 去除文件类型效验不通过的文件
    const status = this.checkFileStatus(file);
    if (!status) {
      newFileList = newFileList.filter(fileItem => fileItem.uid != file.uid);
    }

    this.setState({ fileList: newFileList });
    this.handleFormValueChange(newFileList);
  };

  renderUploadBtn = disabled => {
    return (
      <div>
        <Icon type={disabled ? "stop" : "plus"} style={{ fontSize: "32px" }} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
  };

  render() {
    const { disabled, action, name, onChange, ...restProps } = this.props;
    const { previewImage, previewVisible, fileList } = this.state;

    const uploadProps = {
      action: isUrl(action) ? action : DOMAIN + "/common/file/upload",
      showUploadList: {
        showPreviewIcon: !disabled,
        showRemoveIcon: !disabled
      },
      beforeUpload: this.handleBeforeUpload,
      onPreview: this.handlePreview,
      onChange: this.handleChange,
      fileList: fileList,
      ...restProps
    };

    return (
      <div>
        <Upload {...uploadProps}>{this.renderUploadBtn(disabled)}</Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="img" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
```

## 自定义请求

```js
/* eslint no-console:0 */
import React from "react";
import ReactDOM from "react-dom";
import Upload from "rc-upload";
import axios from "axios";

const uploadProps = {
  action: "/upload.do",
  multiple: false,
  data: { a: 1, b: 2 },
  headers: {
    Authorization: "$prefix $token"
  },
  onStart(file) {
    console.log("onStart", file, file.name);
  },
  onSuccess(ret, file) {
    console.log("onSuccess", ret, file.name);
  },
  onError(err) {
    console.log("onError", err);
  },
  onProgress({ percent }, file) {
    console.log("onProgress", `${percent}%`, file.name);
  },
  customRequest({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) {
    // EXAMPLE: post form-data with 'axios'
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          );
        }
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
      })
      .catch(onError);

    return {
      abort() {
        console.log("upload progress is aborted.");
      }
    };
  }
};

const Test = () => {
  return (
    <div
      style={{
        margin: 100
      }}
    >
      <div>
        <Upload {...uploadProps}>
          <button>开始上传</button>
        </Upload>
      </div>
    </div>
  );
};

ReactDOM.render(<Test />, document.getElementById("__react-content"));
```
