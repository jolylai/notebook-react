# Dva

## 模板

```js
import { query } from "../services/login";

export default {
  namespace: "name",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/") {
        }
      });
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
```

## subscriptions

({ dispatch, history }, done) => unlistenFunction

```js
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
  }
```

::: tip

- `setupHistory`, `setupRequestCancel`, `setup` 都会订阅，命名建议以 setup 开头
- 建议拆分成多个订阅，这样代码结构更加清晰
  :::

## 多任务调度

有的时候，我们可能会希望多个任务以另外一些方式执行，比如：

- 并行，若干个任务之间不存在依赖关系，并且后续操作对它们的结果无依赖
- 竞争，若干个任务之间，只要有一个执行完成，就进入下一个环节
- 子任务，若干个任务，并行执行，但必须全部做完之后，下一个环节才继续执行

### 并行

```js
const [result1, result2]  = yield all([
  call(service1, param1),
  call(service2, param2)
])
```

把多个要并行执行的东西放在一个数组里，就可以并行执行，等所有的都结束之后，进入下个环节，类似 promise.all 的操作

### 竞争

```js
const { data, timeout } = yield race({
  data: call(service, 'some data'),
  timeout: call(delay, 1000)
});

if (data)
  put({type: 'DATA_RECEIVED', data});
else
  put({type: 'TIMEOUT_ERROR'});
```

这个例子比较巧妙地用一个延时一秒的空操作来跟一个网络请求竞争，如果到了一秒，请求还没结束，就让它超时。

这个类似于 Promise.race 的作用。

## 扩展 modal

安装

```bash
$ yarn add dva-model-extend
```

用这种写法能大大简化 model 中的代码

```js
import modelExtend from "dva-model-extend";

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10
    }
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      };
    }
  }
});
```

## dva-logger

安装 `dva-logger`

```bash
$ yarn add dva-logger --dev
```

在 `src` 目录下新建 `app.js`，内容如下：

```js
/* eslint-disable */
import { message } from "antd";

const plugins = [];

// 非生产环境添加 logger
if (process.env.NODE_ENV !== "production") {
  plugins.push(
    require("dva-logger")({
      collapsed: true
    })
  );
}

export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      message.error(e.message);
    }
  },
  plugins
};
```
