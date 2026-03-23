# FTPilot

你的 AI 功率训练教练 — 基于 [Intervals.icu](https://intervals.icu) 数据的 MCP Server。

> FTP + Pilot = FTPilot 🚴‍♂️

## 功能

**8 个 MCP 工具**：

| 工具 | 说明 |
|------|------|
| `get_athlete` | 运动员信息（FTP、功率区间、心率区间、W'、Pmax） |
| `get_wellness` | 体能状态（CTL / ATL / Form、HRV、睡眠、疲劳等） |
| `get_power_curve` | 历史最佳功率曲线（支持多时间段对比） |
| `get_activities` | 近期活动列表 |
| `get_activity` | 活动详情 + 间歇段数据 |
| `get_power_vs_hr` | 功率 vs 心率解耦分析 |
| `get_events` | 日历上的计划训练 |
| `create_event` | 创建训练计划（Intervals.icu 原生格式） |

**1 个 MCP Prompt**：

| Prompt | 说明 |
|--------|------|
| `coach` | AI 耐力运动教练 — 基于你的训练数据提供专业的功率训练指导 |

## 安装

### 前置条件

1. 注册 [Intervals.icu](https://intervals.icu) 账号并连接你的 Garmin / Strava 等设备
2. 获取 API Key：登录 Intervals.icu → Settings → Developer Settings → API Key
3. 获取 Athlete ID：登录后 URL 中的 `i` 开头的 ID（如 `i12345`），或在 Settings 页面查看

### 配置 MCP 客户端

#### Claude Desktop

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）：

```json
{
  "mcpServers": {
    "ftpilot": {
      "command": "npx",
      "args": ["-y", "ftpilot"],
      "env": {
        "INTERVALS_API_KEY": "你的API Key",
        "INTERVALS_ATHLETE_ID": "你的Athlete ID"
      }
    }
  }
}
```

## 使用

配置完成后，AI 可以直接调用工具获取你的训练数据。

### AI 教练模式

使用内置的 `coach` prompt，AI 会扮演专业的功率训练教练：

- "今天该怎么练？" — 基于 CTL/ATL/Form 和近期训练给出建议
- "帮我分析上次骑行" — 分析间歇质量、心率解耦、效率因子
- "帮我制定下周训练计划" — 基于功率曲线和体能状态制定计划
- "我的功率曲线有什么问题？" — 分析优劣势，给出针对性训练方向

### AI 教练特性

- **强制风控**：Form < -25、HRV 异常、连续高强度等情况下，只推荐休息或恢复骑
- **结构化输出**：固定格式（训练判断 → 建议 → 具体训练 → 注意事项）
- **具体数字**：所有建议基于你的 FTP，给出具体功率值和时间
- **心率解耦分析**：解耦 > 10% 时优先安排有氧训练

## 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `INTERVALS_API_KEY` | ✅ | Intervals.icu API Key |
| `INTERVALS_ATHLETE_ID` | ✅ | 运动员 ID（如 `i12345`） |

## 本地开发

```bash
git clone https://github.com/Yuai007/FTPilot.git
cd ftpilot
npm install
cp .env.example .env  # 填入你的 API Key 和 Athlete ID
npm run build
npm start
```

## License

MIT
