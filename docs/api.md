# 后端 API 文档

默认地址：`http://127.0.0.1:8080`

## 统一返回格式

所有接口统一返回：

```json
{
  "success": true,
  "code": "OK",
  "message": "operation message",
  "data": {}
}
```

错误示例：

```json
{
  "success": false,
  "code": "LOGIN_FAILED",
  "message": "密码错误",
  "data": null
}
```

## POST /api/login

用户登录。

请求：

```json
{
  "account": "student001",
  "password": "123456",
  "role": "student"
}
```

响应 `data`：

```json
{
  "success": true,
  "message": "login success",
  "user": {
    "id": "u-student-001",
    "account": "student001",
    "name": "李明",
    "role": "student",
    "college": "计算机与信息工程学院",
    "department": "软件工程 2301 班"
  }
}
```

## POST /api/auth/verify

提交认证校验。认证完成后后端会自动生成认证记录和风险日志。

请求：

```json
{
  "user_id": "u-student-001",
  "method": "trusted_device",
  "scene": "classroom_checkin",
  "location": "综合教学楼 A203",
  "device_id": "phone-001"
}
```

响应 `data.record.risk`：

```json
{
  "risk_score": 18,
  "risk_level": "low",
  "risk_reason": "认证环境稳定，风险较低",
  "suggestion": "允许认证通过，记录本次认证行为用于后续画像。",
  "abnormal_types": []
}
```

## GET /api/auth/records

获取认证记录列表。

可选查询参数：

- `result=success`
- `result=failed`
- `risk=low`
- `risk=medium`
- `risk=high`

## POST /api/device/bind

绑定设备。

请求：

```json
{
  "user_id": "u-student-001",
  "device_name": "OpenHarmony Phone",
  "device_type": "phone",
  "trusted": true
}
```

响应会包含设备可信评分：

```json
{
  "trust_score": 82,
  "trust_level": "high"
}
```

## GET /api/risk/score

获取风险评分。

查询参数：

- `user_id`
- `device_id`
- `location`
- `failed_count`
- `method`：`trusted_device`、`qrcode`、`nearby_bluetooth`

示例：

```text
GET /api/risk/score?user_id=u-student-001&device_id=phone-001&location=实验室&failed_count=2&method=nearby_bluetooth
```

## GET /api/risk/logs

获取风险日志列表，用于管理员异常认证看板和审计展示。
