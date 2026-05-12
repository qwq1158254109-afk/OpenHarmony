# 运行说明

## 环境要求

- DevEco Studio 6.0+
- OpenHarmony SDK 4.2+
- Rust stable 1.75+
- Windows、macOS 或 Linux 均可运行后端

## 前端

1. 打开 DevEco Studio。
2. 选择 `Open Project`，打开项目中的 `frontend/` 目录。
3. 在 SDK Manager 中确认已安装 OpenHarmony SDK 4.2 或更高版本。
4. 选择 `entry` 模块。
5. 运行到 OpenHarmony 手机模拟器或真机。
6. 使用测试账号登录后，访问首页、无感认证、记录、设备管理和管理员页。

## 后端

```bash
cd backend
cargo run
```

启动成功后会看到：

```text
Campus auth backend listening on http://0.0.0.0:8080
```

前端在本机预览时会访问 `http://127.0.0.1:8080`；在模拟器中会自动尝试 `http://10.0.2.2:8080` 访问宿主机后端。
如果运行到真机，请确保电脑和设备在同一局域网，并将 `frontend/entry/src/main/ets/services/ApiClient.ets` 中的后端地址调整为电脑局域网 IP，例如 `http://192.168.1.23:8080`。

## 接口验证

```bash
curl -X POST http://127.0.0.1:8080/api/login \
  -H "Content-Type: application/json" \
  -d "{\"account\":\"student001\",\"password\":\"123456\",\"role\":\"student\"}"
```

## 演示建议

1. 学生账号登录，展示 Dashboard。
2. 进入无感认证页，分别演示可信设备认证和蓝牙/近场认证。
3. 切换到记录页，筛选成功、失败和高风险记录。
4. 打开设备管理页，添加平板设备并设置为可信设备。
5. 使用管理员账号登录，展示认证总量、异常认证和最近异常记录。
