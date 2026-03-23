#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { registerGetAthlete } from "./tools/get-athlete.js";
import { registerGetWellness } from "./tools/get-wellness.js";
import { registerGetPowerCurve } from "./tools/get-power-curve.js";
import { registerGetActivities } from "./tools/get-activities.js";
import { registerGetActivity } from "./tools/get-activity.js";
import { registerGetPowerVsHr } from "./tools/get-power-vs-hr.js";
import { registerGetEvents } from "./tools/get-events.js";
import { registerCreateEvent } from "./tools/create-event.js";
import { IntervalsClient } from "./client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const coachPrompt = readFileSync(join(__dirname, "..", "skills", "coach.md"), "utf-8");

const server = new McpServer({
  name: "ftpilot",
  version: "1.0.0",
});

const client = new IntervalsClient();

// 注册工具
registerGetAthlete(server, client);
registerGetWellness(server, client);
registerGetPowerCurve(server, client);
registerGetActivities(server, client);
registerGetActivity(server, client);
registerGetPowerVsHr(server, client);
registerGetEvents(server, client);
registerCreateEvent(server, client);

// 注册 AI 教练 prompt
server.prompt(
  "coach",
  "AI Endurance Coach - 基于你的训练数据提供专业的功率训练指导",
  { question: z.string().optional().describe("你的问题，如：今天该怎么练？") },
  ({ question }) => ({
    messages: [
      { role: "user" as const, content: { type: "text" as const, text: coachPrompt } },
      { role: "user" as const, content: { type: "text" as const, text: question ?? "今天该怎么练？" } },
    ],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
