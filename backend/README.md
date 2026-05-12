# 后端启动与接口测试

本后端为“基于 OpenHarmony 的校园分布式无感身份认证系统”提供 Rust/Axum Mock API。接口返回统一 JSON：

```json
{
  "success": true,
  "code": "OK",
  "message": "xxx",
  "data": {}
}
```

## 启动

```powershell
cd E:\project\My_project\OpenHarmony\backend
cargo run
```

服务默认监听：

```text
http://0.0.0.0:8080
```

本机调试可继续使用 `http://127.0.0.1:8080`。模拟器访问宿主机后端时，前端会自动尝试 `http://10.0.2.2:8080`。

检查服务：

```powershell
curl.exe http://127.0.0.1:8080
curl.exe http://127.0.0.1:8080/health
```

## 已有接口

```powershell
curl.exe -X POST http://127.0.0.1:8080/api/login -H "Content-Type: application/json" -d "{\"account\":\"student001\",\"password\":\"123456\",\"role\":\"student\"}"
curl.exe -X POST http://127.0.0.1:8080/api/auth/verify -H "Content-Type: application/json" -d "{\"user_id\":\"u-student-001\",\"method\":\"trusted_device\",\"scene\":\"classroom_checkin\",\"location\":\"综合教学楼 A203\",\"device_id\":\"phone-001\"}"
curl.exe http://127.0.0.1:8080/api/auth/records
curl.exe -X POST http://127.0.0.1:8080/api/device/bind -H "Content-Type: application/json" -d "{\"user_id\":\"u-student-001\",\"device_name\":\"Campus Watch\",\"device_type\":\"wearable\",\"trusted\":false}"
curl.exe "http://127.0.0.1:8080/api/risk/score?user_id=u-student-001&device_id=phone-001&location=综合教学楼A203"
curl.exe http://127.0.0.1:8080/api/risk/logs
```

## 新增校园业务接口

### 学生认证模块

```powershell
curl.exe "http://127.0.0.1:8080/api/student/certifications?student_id=student001"
curl.exe -X POST http://127.0.0.1:8080/api/student/verify -H "Content-Type: application/json" -d "{\"student_id\":\"student001\",\"name\":\"李明\"}"
```

### 设备绑定模块

```powershell
curl.exe "http://127.0.0.1:8080/api/devices?user_id=u-student-001"
```

仍保留原设备绑定接口：

```powershell
curl.exe -X POST http://127.0.0.1:8080/api/device/bind -H "Content-Type: application/json" -d "{\"user_id\":\"u-student-001\",\"device_name\":\"OpenHarmony Tablet Pro\",\"device_type\":\"tablet\",\"trusted\":true}"
```

### 无感认证权限模块

```powershell
curl.exe "http://127.0.0.1:8080/api/auth/permissions?user_id=u-student-001"
curl.exe -X POST http://127.0.0.1:8080/api/auth/permissions/update -H "Content-Type: application/json" -d "{\"id\":\"perm-003\",\"enabled\":true}"
```

### 通行记录模块

```powershell
curl.exe "http://127.0.0.1:8080/api/passage/records?student_id=student001"
curl.exe "http://127.0.0.1:8080/api/passage/records?risk=high"
```

### 校园终端设备模块

```powershell
curl.exe http://127.0.0.1:8080/api/terminals
curl.exe -X POST http://127.0.0.1:8080/api/terminals/register -H "Content-Type: application/json" -d "{\"name\":\"南门闸机\",\"location\":\"校园南门\",\"terminal_type\":\"access_gate\"}"
curl.exe http://127.0.0.1:8080/api/terminals/realtime-auth
```

### 管理员考勤模块

```powershell
curl.exe http://127.0.0.1:8080/api/admin/attendance
curl.exe "http://127.0.0.1:8080/api/admin/attendance?college=计算机"
```

### 黑名单模块

```powershell
curl.exe http://127.0.0.1:8080/api/admin/blacklist
curl.exe -X POST http://127.0.0.1:8080/api/admin/blacklist/add -H "Content-Type: application/json" -d "{\"student_id\":\"student099\",\"name\":\"测试学生\",\"reason\":\"连续认证失败\",\"risk_level\":\"medium\"}"
curl.exe -X POST http://127.0.0.1:8080/api/admin/blacklist/remove -H "Content-Type: application/json" -d "{\"id\":\"bl-001\"}"
```

### 门禁规则模块

```powershell
curl.exe http://127.0.0.1:8080/api/admin/access-rules
curl.exe -X POST http://127.0.0.1:8080/api/admin/access-rules/update -H "Content-Type: application/json" -d "{\"id\":\"rule-002\",\"enabled\":false}"
```
