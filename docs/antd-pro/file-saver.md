# 文件导出

## 安装 file-saver

```bash
$ yarn add file-saver
```

## 设置 responseType

设置响应类型为`blob`,这里使用的是 [umi-request](https://github.com/umijs/umi-request)

```js
export async function downloadTempExcel() {
  return request("/refundFile/downloadTempExcel", {
    responseType: "blob"
  });
}
```

## 配置一些常用的格式类型

[MIME 参考手册](http://www.w3school.com.cn/media/media_mimeref.asp)

```js
import { saveAs } from "file-saver";

export function saveAsExcel(data, fileName) {
  const blobData = new Blob([data], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
  });
  saveAs(blobData, fileName);
}

export function saveAsPPT(data, fileName) {
  const blobData = new Blob([data], {
    type:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=utf-8"
  });
  saveAs(blobData, fileName);
}
```

## 图片下载

```js
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

先检查服务器是否支持跨域请求，如果支持则使用 blob URLs 保存数据，如果不支持跨域则使用 `a[download]`
