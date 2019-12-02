# 网络请求

更详细的 [api 文档](https://github.com/umijs/umi-request)

## 实例化通用配置

请求一般都有一些通用的配置，我们不想在每个请求里去逐个添加，例如通用的前缀、后缀、头部信息、异常处理等等，那么可以通过 extend 来新建一个 umi-request 实例，从而减少重复的代码量：

```js
import { extend } from "umi-request";

const request = extend({
  prefix: "/api/v1",
  suffix: ".json",
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data"
  },
  params: {
    token: "xxx" // 所有请求默认带上 token 参数
  },
  errorHandler: function(error) {
    /* 异常处理 */
  }
});

request
  .get("/user")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

```js
import request, { extend } from "umi-request";
import { isUrl } from "@/utils/utils";
import { notification, message } from "antd";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;

  if (response.status === 401) {
    const redirectUrl = response.headers.get("location");
    if (redirectUrl) {
      window.location = redirectUrl;
    }
    return;
  }

  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext
  });
};

/**
 * 配置request请求时的默认参数
 */
request.interceptors.request.use((url, options) => {
  return {
    // eslint-disable-next-line
    url: isUrl(url) ? url : `${baseURL}${url}`,
    options
  };
});

// 网络请求响应报错统一提示
request.interceptors.response.use(async (response, options) => {
  const { responseType } = options;
  if (responseType && responseType !== "json") {
    return response;
  }

  let data = {};
  try {
    // 当响应体中的body不能被解析为json
    data = await response.clone().json();
  } catch (error) {
    return response;
  }

  if (data.status && data.status !== 200) {
    const errMsg = data.message ? data.message : codeMessage(data.status);
    message.error(errMsg);
  }

  return response;
});

// 请求头
const headers = {
  "X-Requested-With": "XMLHttpRequest"
};

const newRequest = extend({
  errorHandler,
  headers,
  // 默认请求是否带上cookie
  credentials: "include"
});

export default newRequest;
```

## Resource

- [umi-request 网络请求之路 ](https://www.yuque.com/mayiprototeam/gfyt69/ggqy8q)
