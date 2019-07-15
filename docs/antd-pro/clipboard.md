# 复制到黏贴板

## 安装

[copy-to-clipboard](https://github.com/sudodoki/copy-to-clipboard)

```bash
$ yarn add copy-to-clipboard
```

## 使用

```js
import copy from "copy-to-clipboard";

copy("Text");

// Copy with options
copy("Text", {
  debug: true,
  message: "Press #{key} to copy"
});

// 判断是否复制成功
const isCopySuccess = copy("Text");
if (isCopySuccess) {
  message.success("复制成功！");
}
```

## 简易封装

```js
import copy from "copy-to-clipboard";
import { message } from "antd";

const copyToClipboard = (text, options) => {
  const isCopySuccess = copy(text, options);
  if (isCopySuccess) {
    message.success(options.successMsg || "复制成功！");
  } else {
    message.error(options.failMsg || "复制失败！");
  }
};

export default copyToClipboard;
```
