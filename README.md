# FTPilot

Your AI-powered endurance cycling coach — an MCP Server built on [Intervals.icu](https://intervals.icu) data.

> FTP + Pilot = FTPilot 🚴‍♂️

English | [中文](README.zh-CN.md)
## Features

**8 MCP Tools:**

| Tool | Description |
|------|-------------|
| `get_athlete` | Athlete profile (FTP, power zones, HR zones, W', Pmax) |
| `get_wellness` | Fitness status (CTL / ATL / Form, HRV, sleep, fatigue, etc.) |
| `get_power_curve` | Best power curves (supports multi-period comparison) |
| `get_activities` | Recent activity list |
| `get_activity` | Activity details + interval data |
| `get_power_vs_hr` | Power vs heart rate decoupling analysis |
| `get_events` | Planned workouts on calendar |
| `create_event` | Create workout plans (Intervals.icu native format) |

**1 MCP Prompt:**

| Prompt | Description |
|--------|-------------|
| `coach` | AI endurance coach — professional power training guidance based on your data |

## Installation

### Prerequisites

1. Sign up at [Intervals.icu](https://intervals.icu) and connect your Garmin / Strava / etc.
2. Get your API Key: Log in → Settings → Developer Settings → API Key
3. Get your Athlete ID: The `i`-prefixed ID in the URL after login (e.g. `i12345`), or check Settings

### Configure MCP Client

#### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "ftpilot": {
      "command": "npx",
      "args": ["-y", "ftpilot"],
      "env": {
        "INTERVALS_API_KEY": "your-api-key",
        "INTERVALS_ATHLETE_ID": "your-athlete-id"
      }
    }
  }
}
```

## Usage

Once configured, the AI can directly call tools to access your training data.

### AI Coach Mode

Use the built-in `coach` prompt for a professional power training coach experience:

- "How should I train today?" — Suggestions based on CTL/ATL/Form and recent training
- "Analyze my last ride" — Interval quality, HR decoupling, efficiency factor
- "Plan my training for next week" — Based on power curve and fitness status
- "What's wrong with my power curve?" — Strengths/weaknesses analysis with targeted training

### AI Coach Features

- **Risk Control**: Mandatory rest/recovery when Form < -25, abnormal HRV, or consecutive high-intensity days
- **Structured Output**: Fixed format (assessment → recommendation → specific workout → notes)
- **Concrete Numbers**: All suggestions include specific power values and durations based on your FTP
- **HR Decoupling Analysis**: Prioritizes aerobic training when decoupling > 10%

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `INTERVALS_API_KEY` | ✅ | Intervals.icu API Key |
| `INTERVALS_ATHLETE_ID` | ✅ | Athlete ID (e.g. `i12345`) |

## Local Development

```bash
git clone https://github.com/Yuai007/FTPilot.git
cd FTPilot
npm install
cp .env.example .env  # Fill in your API Key and Athlete ID
npm run build
npm start
```

## License

[MIT](LICENSE)
