# 实施计划

- [x] 1. 项目初始化
  - 初始化 npm 项目，安装依赖（`@modelcontextprotocol/sdk`、`typescript`、`zod`）
  - 配置 `tsconfig.json`、`package.json` scripts（build、start）
  - 创建 `.env.example`
  - _需求: 9

- [x] 2. API 客户端实现（client.ts + types.ts）
  - 实现 `IntervalsClient` 类：Basic Auth 认证、GET/POST 封装、错误处理、超时控制
  - 定义核心 API 响应类型
  - _需求: 9

- [x] 3. MCP Server 入口 + 全部工具实现
  - 实现 `index.ts`：创建 MCP Server、注册工具、stdio 传输
  - 实现 8 个工具：get_athlete、get_wellness、get_power_curve、get_activities、get_activity、get_power_vs_hr、get_events、create_event
  - _需求: 1, 2, 3, 4, 5, 6, 7, 8

- [x] 4. 构建验证
  - `npm run build` 编译通过，零错误
  - _需求: 9
