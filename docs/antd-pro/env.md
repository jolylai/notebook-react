# 多环境配置

## cross-env

配置 `package.json`

```json {3}
{
  "scripts": {
    "dev": "cross-env MOCK=none ENV_TAG=dev umi dev"
  }
}
```

启动项目

```bash
$ yarn run dev
```

这时你在项目中的所有的 js 文件中可以通过以下命令获取到自己定义的变量

```js
const { NODE_ENV, TEST, ENV_TAG } = process.env;

let baseURL = "/api";

if (ENV_TAG === "dev") {
  baseURL = "http://serp-dev.linesum.com/api";
}

if (ENV_TAG === "qa") {
  baseURL = "/api";
}

if (ENV_TAG === "production") {
  baseURL = "/api";
}

export default {
  // 通过 webpack 的 DefinePlugin 传递给代码，值会自动做 JSON.stringify 处理。
  define: {
    baseURL
  }
};
```

## 不同 config 文件

在不同的环境下我们需要不同的配置，这时我们可以在 config 文件夹中创建不同环境下使用的配置文件，比如我们需要 `dev`, `qa`, `prod`,三个不同的换件，这时可以在根目录下的 config 文件夹中创建
分别创建`config.dev.js` ,`config.qa.js` ,`config.prod.js`

配置 `package.json`

```json {3,4,5}
{
  "scripts": {
    "dev": "cross-env UMI_ENV=dev umi dev",
    "qa": "cross-env UMI_ENV=qa umi dev",
    "prod": "cross-env UMI_ENV=prod umi build"
  }
}
```

这时我们使用不同环境时只需要执行对应的命名就可以了

```bash
# dev 环境
$ yarn run dev

# qa 环境
$ yarn run qa

# prod 环境
$ yarn run prod
```

## config 文件

可以根据以下面的代码为模板配置不同环境，更多的配置可以参考[官方文档](https://umijs.org/config/)

```js
import os from "os";
import slash from "slash2";
import defaultSettings from "./defaultSettings";
import webpackPlugin from "./plugin.config";
import pageRouter from "./router.config";
const { pwa, primaryColor } = defaultSettings;

const { NODE_ENV, TEST } = process.env;

const plugins = [
  [
    "umi-plugin-react",
    {
      antd: true,
      dva: {
        hmr: true
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: "zh-CN",
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true
      },
      dynamicImport: {
        loadingComponent: "./components/PageLoading/index",
        webpackChunkName: true,
        level: 3
      },
      pwa: pwa
        ? {
            workboxPluginMode: "InjectManifest",
            workboxOptions: {
              importWorkboxFrom: "local"
            }
          }
        : false,
      ...(!TEST && os.platform() === "darwin"
        ? {
            dll: {
              include: ["dva", "dva/router", "dva/saga", "dva/fetch"],
              exclude: ["@babel/runtime", "netlify-lambda"]
            },
            hardSource: false
          }
        : {})
    }
  ],
  [
    "umi-plugin-pro-block",
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true
    }
  ]
];

const uglifyJSOptions =
  NODE_ENV === "production"
    ? {
        uglifyOptions: {
          // remove console.* except console.error
          compress: {
            drop_console: true,
            pure_funcs: ["console.error"]
          }
        }
      }
    : {};
export default {
  // add for transfer to umi
  plugins,
  define: {
    baseURL: "http://****"
  },
  block: {
    defaultGitUrl: "https://github.com/ant-design/pro-blocks"
  },
  treeShaking: true,
  targets: {
    ie: 11
  },
  // 路由配置
  routes: pageRouter,
  theme: {
    "primary-color": primaryColor
  },
  proxy: {
    '/api/': {
      target: 'http://****',
      changeOrigin: true,
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes("node_modules") ||
        context.resourcePath.includes("ant.design.pro.less") ||
        context.resourcePath.includes("global.less")
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace(".less", "");
        const arr = slash(antdProPath)
          .split("/")
          .map(a => a.replace(/([A-Z])/g, "-$1"))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
      }

      return localName;
    }
  },
  manifest: {
    basePath: "/"
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin
};
```
