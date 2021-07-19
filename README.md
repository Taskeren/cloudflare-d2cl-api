# 👷 D2CL CloudFlare Worker Api

根据 D2CL 提供的数据返回挂逼信息的 CloudFlare Worker。

### 可用 Worker 列表
- https://d2cl.taskeren.cn/

### 原理
  - 根据访问的 URL 确定需要查询的 steam64ID。例如 `https://xxx.workers.dev/76561198192568442` 则为查询 `76561198192568442` 的记录。若无 steam64ID 则直接跳转到 D2CL 项目页面。
  - 通过 GitHub Raw 获取该ID的文件，若找不到（404），则返回无记录；若有记录，则返回记录内容。

#### 返回示例

所有返回均为 200 OK，且内容均为 `application/json`。

##### 无记录返回
```json5
{
    "status": 0, // 状态 0为无记录
    "message": "No cheating records exists."
}
```

##### 有记录返回
_以下为 `76561198192568442` 的返回内容。_
```json5
{
    "status": 1, // 状态 1为有记录
    "message": "智谋机炮生意\n" // 记录原因，为 D2CL 文件中的内容。
}
```