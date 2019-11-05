# 多环境配置

`umi` 允许在 `.umirc.js` 或 `config/config.js` （二选一，.umirc.js 优先）中进行配置，支持 ES6 语法。

企业开发中通常会区分多个不同的环境，比如开发环境，测试环境，正式环境。不同个环境中需要请求不同的接口。

## UMI_ENV

创建不同环境的配置文件，这里我们区分开发（dev）、测试（qa）、生产（prod）三种不同的环境

在不同的环境下我们需要不同的配置，这时我们可以在 config 文件夹中创建不同环境下使用的配置文件，比如我们需要 `dev`, `qa`, `prod`,三个不同的环境，这时可以在根目录下的 config 文件夹中创建
分别创建`config.js` ,`config.qa.js` ,`config.prod.js`

开发环境配置文件

```js
// .umirc.js 或者 config/config.js
export default {
  define: {
    DOMAIN: "http://dev"
  }
};
```

测试环境配置文件

```js
// .umirc.qa.js 或者 config/config.qa.js
export default {
  define: {
    DOMAIN: "http://qa"
  }
};
```

生产环境配置文件

```js
// .umirc.prod.js 或者 config/config.prod.js
export default {
  define: {
    DOMAIN: "http://prod"
  }
};
```

配置 `package.json`

```json
{
  "scripts": {
    "start": "umi dev",
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

- 执行`yarn start` 这时 `DOMAI` 是 `http://dev`
- 执行`yarn qa` 这时 `DOMAI` 是 `http://qa`
- 执行`yarn prod` 这时 `DOMAI` 是 `http://prod`

本地配置文件

```js
// .umirc.local.js  或者 config/config.local.js
export default {
  define: {
    DOMAIN: "http://local"
  }
};
```

`.umirc.local.js` 是本地的配置文件，不要提交到 `git`，所以通常需要配置到 `.gitignore`。如果存在，会和 `.umirc.js` 合并后再返回。

如果存在 `.umirc.local.js` 或者 `config/config.local.js` 且有定义 `DOMAIN`, 这时是`.umirc.local.js` 或者 `config/config.local.js`中定义的值

## cross-env

自定义环境变量，这里我们定义 `ENV_TAG` 环境变量

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
    "/api/": {
      target: "http://****",
      changeOrigin: true
    }
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
