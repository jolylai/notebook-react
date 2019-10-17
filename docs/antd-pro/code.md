# 代码规范

## 格式化代码

安装依赖

```bash
$ yarn add --dev prettier pretty-quick husky
```

`package.json` 中添加

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  }
}
```

这样就能在代码预本地提交时将代码格式化

::: tip git hooks

- `pre-commit`，预本地提交。通常会在该提交之前，进行一些语法和 lint 的检测。
- `pre-push`，预远程提交。通常会在该提交之前，运行一些测试。

:::
