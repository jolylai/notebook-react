# Keep Alive

## 安装

```bash
$ yarn add umi-plugin-cache-route

# 执行初始化命令
$ umi keepalive
```

在配置中使用

```js
export default {
  plugins: [
    [
      "umi-plugin-cache-route",
      {
        keepalive: ["route path", "route path"]
      }
    ]
  ]
};
```

## 路由配置

### 配置式路由

直接在路由配置的时候，写明 keepAlive: true

```js
export default {
  plugins: [["umi-plugin-cache-route"]],
  routes: [
    {
      path: "/",
      component: "../layouts/index",
      routes: [
        {
          path: "/list",
          component: "./list",
          keepAlive: true
        },
        {
          path: "/item",
          component: "./item"
        }
      ]
    }
  ]
};
```

### 约定式路由

直接配置 keepalive 属性

```js
export default {
  plugins: [
    [
      "umi-plugin-cache-route",
      {
        keepalive: ["/list"]
      }
    ]
  ]
};
```

### 清除路由

被标记 keepAlive: true 和被配置 keepalive:['/list'] 的路由都会被一直保持，你可以在你觉得不需要的时候，使用 dropByCacheKey 手动解除

```js
import { dropByCacheKey } from "umi";

export default () => {
  const clearCache = () => {
    dropByCacheKey("/list");
  };
  return (
    <Card>
      <Button onClick={clearCache}>clear list page cache</Button>
    </Card>
  );
};
```

## 参考资源

- [知乎](https://zhuanlan.zhihu.com/p/82700889)
- [掘金](https://juejin.im/post/5d7edee9f265da03a9506701)
