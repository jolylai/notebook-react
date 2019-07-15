# 权限

## 思路

后端返回当前用户已被授权的权限数据，前端根据返回的数据，控制对应的权限。
返回的权限数据格式为`['string']`。

## 请求权限数据

```js
import { queryPremissions } from "@/services/user";
import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/Authorized";

const GlobalModel = {
  namespace: "global",
  state: {},
  subscriptions: {
    // 只有在浏览器刷新的时候请求
    setupPermission({ dispatch }) {
      dispatch({
        type: "queryPremissions"
      });
    }
  },
  effects: {
    *queryPremissions(_, { call }) {
      const response = yield call(queryPremissions);
      if (response) {
        // 设置权限为后端返回的权限数据
        setAuthority(response);
      } else {
        // 清空权限数据
        setAuthority([]);
      }
      // 重新加载当前渲染的权限数据
      reloadAuthorized();
    }
  }
};
export default GlobalModel;
```

## 设置和获取权限

`src/utils/authority.js`

```js
const localStorageName = "serp-authority";

/**
 * @export getAuthority
 * @returns {['string']} authority
 */
export function getAuthority() {
  const authorityString = localStorage.getItem(localStorageName);

  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === "string") {
    return [authority];
  }

  if (!authority) {
    return [];
  }

  return authority;
}

/**
 * @export setAuthority
 * @param {string ['string']} authority
 * @returns undefined
 */
export function setAuthority(authority) {
  const proAuthority = typeof authority === "string" ? [authority] : authority;
  return localStorage.setItem(localStorageName, JSON.stringify(proAuthority));
}
```

## 权限组件和重载

`src/utils/Authorized.js`

```js
import RenderAuthorize from "@/components/Authorized";
import { getAuthority } from "./authority";

let Authorized = RenderAuthorize(getAuthority());

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
```

当设置了新的权限需要调用 `reloadAuthorized`方法去重载新的权限

## 按钮权限

使用`Authorized` 包裹需要配置权限的按钮

```jsx
import Authorized from "@/utils/Authorized";

// 约定的权限字段
<Authorized authority={"admin"}>
  <Button>Button</Button>
</Authorized>;
```


## 路由权限

根据路由，获取当前路由对应的权限

⭐️[pathToRegexp(`${route.path}(.*)`)](https://github.com/pillarjs/path-to-regexp#unnamed-parameters)

```js
const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // get children authority recursively
      authorities = route.authority || authorities;

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};
```

在 pages 目录下创建 `Authorized.js` 路由权限控制组件

```js
import Authorized from "@/utils/Authorized";
import { connect } from "dva";
import pathToRegexp from "path-to-regexp";
import React from "react";
import Redirect from "umi/redirect";

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      authorities = route.authority || authorities;
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
  route = {
    routes: []
  },
  location
}) => {
  const { routes = [] } = route;
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes)}
      noMatch={<Redirect to="/exception/403" />}
    >
      {children}
    </Authorized>
  );
};

export default AuthComponent;
```

配置式路由，可以配置 `.umirc.(ts|js)` 或者 `config/config.(ts|js)` 配置文件中的 `routes` ,用路由权限控制组件包裹需要控制权限的页面路由

```js {7}
export default {
  routes: [
    { path: "/", component: "./pages/index.js" },
    {
      path: '/list',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin'],
    }
  ];
};

```
