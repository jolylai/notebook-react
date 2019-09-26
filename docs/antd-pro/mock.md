# Mock

## JSON Server

> [JSON-server](https://github.com/typicode/json-server): Get a full fake REST API with zero coding in less than 30 seconds (seriously)

安装 JSON Server

```bash
$ npm install -g json-server
```

创建 `db.json` 文件

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

启动 JSON Server

```bash
$ json-server --watch db.json
```

- `--port 8080`: 修改监听端口，默认 3000 端口

访问 `http://localhost:3000/posts/1`, 你可以得到以下数据

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

## REST Client

> vscode 插件： [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### Content-Type

```
Content-Type: application/json
Content-Type: application/xml
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Type: image/png
Content-Type: application/x-www-form-urlencoded
```

### Restful

```
@domain = http://localhost:3001

###
GET @domain
    ?page=2
    &pageSize=10

###
POST {{domain}}/notes HTTP/1.1
content-type: application/json
Authorization: token xxx

{
  "id": 9
}
```

### GraphQL

```
POST https://api.github.com/graphql
Content-Type: application/json
Authorization: Bearer xxx
X-REQUEST-TYPE: GraphQL

query ($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    name
    fullName: nameWithOwner
    description
    diskUsage
    forkCount
    stargazers(first: 5) {
        totalCount
        nodes {
            login
            name
        }
    }
    watchers {
        totalCount
    }
  }
}

{
    "name": "vscode-restclient",
    "owner": "Huachao"
}
```
