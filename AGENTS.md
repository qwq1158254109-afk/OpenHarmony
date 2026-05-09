# AGENTS.md

## Project
项目名称：基于 OpenHarmony 的校园分布式无感身份认证系统。

## Language
默认使用中文回复用户。
代码、文件名、接口名优先使用英文。
文档说明使用中文。

## Technical Requirements
- OpenHarmony SDK 4.2+
- DevEco Studio 6.0+
- Frontend: ArkUI / ArkTS
- Backend: Rust
- Target OS: OpenHarmony 6.0+
- Must support at least two device types, such as phone and tablet, or phone and wearable.

## Architecture Rules
- 前端页面放在 frontend/entry/src/main/ets/pages。
- 公共组件放在 frontend/entry/src/main/ets/components。
- 数据模型放在 frontend/entry/src/main/ets/models。
- API 和 mock 服务放在 frontend/entry/src/main/ets/services。
- 工具函数放在 frontend/entry/src/main/ets/utils。
- Rust 后端放在 backend/。
- 项目文档放在 docs/。

## Coding Rules
- 不要把所有代码写在一个文件里。
- 不要硬编码大量业务数据到页面组件中。
- mock 数据应集中管理。
- 认证、设备、风险评估、记录管理应拆分为独立模块。
- 保留真实 OpenHarmony 分布式能力接入接口，即使当前先用 mock 实现。
- 生成代码后必须检查目录结构、导入路径和明显语法问题。

## Product Goals
系统要体现：
1. 校园身份认证。
2. 无感认证。
3. 多设备协同。
4. AI 风险评估。
5. 智能考勤、门禁、图书馆、教室签到等校园场景。
6. 比赛展示友好的 UI 和 README。