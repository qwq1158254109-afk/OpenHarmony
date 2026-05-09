# 基于 OpenHarmony 的校园分布式无感身份认证系统

面向“2026年河南大学 OpenHarmony 移动应用开发大赛”的智慧校园参赛项目。系统围绕校园身份核验、无感认证、多设备协同和 AI 风险评估展开，模拟学生、教师、管理员在考勤、门禁、图书馆、教室签到等真实校园场景中的身份认证流程。

## 技术栈

- 前端：OpenHarmony SDK 4.2+、ArkUI、ArkTS
- 推荐 IDE：DevEco Studio 6.0+
- 目标系统：OpenHarmony 6.0+
- 后端：Rust、Axum、Serde、Tokio
- 数据交换：REST API + JSON
- 设备适配：手机、平板，预留智能穿戴扩展接口

## 功能模块

- 用户身份模块：学生、教师、管理员登录，角色区分和用户信息展示。
- 无感认证模块：支持二维码认证、可信设备认证、蓝牙/近场模拟认证，展示未认证、认证中、认证成功、认证失败状态。
- 分布式设备协同模块：模拟手机发起认证、平板或穿戴设备展示认证结果，接口层预留真实 OpenHarmony 分布式能力接入。
- OpenHarmony 特性模块：保留 `DistributedDeviceService`、`RemoteAuthService`、`DeviceTrustManager`，支持手机单栏和平板双栏展示思路。
- 校园场景模块：智能考勤、实验室门禁、图书馆入馆认证、教室签到和认证记录列表。
- AI 风险评估模块：根据认证时间、地点、设备可信度、失败次数、认证方式计算风险分，输出风险等级、风险原因和处理建议，检测陌生设备、夜间访问、连续失败、短时间多地认证等异常行为。
- Rust 后端服务：提供登录、认证校验、认证记录、设备绑定、风险评分和风险日志 REST API，接口使用统一返回格式。

## 竞赛技术规范符合情况

| 规范项 | 项目实现 | 符合情况 |
| --- | --- | --- |
| OpenHarmony SDK 4.2+ | `frontend/build-profile.json5` 设置兼容 SDK 4.2+ | 已满足 |
| DevEco Studio 6.0+ | README 和运行文档要求使用 DevEco Studio 6.0+ | 已满足 |
| ArkUI / ArkTS | 页面、组件、模型、服务均使用 ArkTS 编写 | 已满足 |
| Rust 后端 | `backend/` 使用 Rust + Axum 实现 REST API | 已满足 |
| OpenHarmony 6.0+ | 目标系统按 OpenHarmony 6.0+ 设计 | 已满足 |
| 两类设备适配 | 支持 phone、tablet，预留 wearable | 已满足 |
| 分布式协同思想 | 预留 `DistributedDeviceService`、`RemoteAuthService`、`DistributedAuthService` | 已满足 |
| AI 风险评估 | 规则模拟风险评分，预留前端 `AiRiskModel` 和后端 `MlRiskModel` 真实模型接口 | 已满足 |

## 目录结构

```text
project-root/
  README.md
  frontend/
    AppScope/
    entry/
      src/main/ets/
        pages/
        components/
        models/
        services/
        utils/
  backend/
    Cargo.toml
    src/
      main.rs
      routes/
      models/
      services/
      storage/
  docs/
    design.md
    api.md
    demo.md
    run.md
```

## 前端运行说明

前端工程根目录是 `frontend/`，不要直接用 DevEco Studio 打开整个仓库根目录。

1. 在 DevEco Studio 中选择 `File -> Open`，打开 `E:\project\My_project\OpenHarmony\frontend`。
2. 在 `Settings -> SDK -> OpenHarmony` 中确认已安装 API Version 20，并确认 ArkTS、JS、Native、Previewer、Toolchains 组件存在。本机 `frontend/local.properties` 应指向 `sdk.dir=E:/OpenHarmonySDK`。
3. 打开工程后执行 `File -> Sync and Refresh Project`。
4. 在运行配置中选择 `Application`，配置为 `Module: entry`、`Product: default`、`Target: default`。
5. 连接 OpenHarmony 设备或启动 OpenHarmony 模拟器后运行 `entry`。
6. 如果当前 DevEco 只有 HarmonyOS 模拟器，例如 Pura 90、Mate X7、MatePad Pro 13、MateBook Pro，可以先用于界面调试；如果 OpenHarmony 配置无法安装到 HarmonyOS 模拟器，需要临时将 `frontend/build-profile.json5` 的 `runtimeOS` 与已安装 HarmonyOS SDK 对齐，再重新同步。提交比赛工程时仍建议保持 OpenHarmony SDK API 20 配置。

常用缓存清理方式：

```powershell
cd E:\project\My_project\OpenHarmony\frontend
Remove-Item -Recurse -Force .hvigor -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force entry\build -ErrorAction SilentlyContinue
```

清理后重新执行 `File -> Sync and Refresh Project`，再运行 `entry`。

## 后端运行方式

```bash
cd backend
cargo run
```

服务默认监听：`http://127.0.0.1:8080`。

## 测试账号

| 角色 | 账号 | 密码 |
| --- | --- | --- |
| 学生 | student001 | 123456 |
| 教师 | teacher001 | 123456 |
| 管理员 | admin001 | 123456 |

## 作品亮点

- 以 ArkUI/ArkTS 构建原生 OpenHarmony 前端，页面包含比赛展示所需的数据看板和校园场景。
- 使用 Rust 后端提供 REST API，便于后续替换内存数据为数据库。
- 通过 `DistributedAuthService` 设计分布式设备协同接口，保留真实 OpenHarmony 分布式能力接入位置。
- 新增 `DistributedDeviceService`、`RemoteAuthService`、`DeviceTrustManager`，预留设备发现、远端认证和可信度评估接口。
- 设备可信度模型包含可信评分、可信等级、硬件证明、本地凭据和近场稳定性，方便后续替换为真实设备可信能力。
- AI 风险评估当前使用规则引擎模拟，覆盖认证时间、地点、设备可信度、失败次数、认证方式和短时间多地行为，代码结构预留模型推理扩展。
- 覆盖手机和平板两类设备展示，体现多端协同认证思路。

## 后续优化方向

- 接入真实 OpenHarmony 分布式数据管理、设备发现和可信互联能力。
- 将 Rust 后端持久化改为 SQLite/PostgreSQL。
- 接入校园统一身份认证、门禁硬件和蓝牙信标。
- 将规则风险评估替换为端侧轻量模型或云端推理服务。
- 增加单元测试、接口测试和端到端演示脚本。
