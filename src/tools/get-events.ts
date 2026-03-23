import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Event } from "../types.js";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function registerGetEvents(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_events",
    "List events (planned workouts, notes, races etc.) on the athlete's calendar. Defaults to next 7 days (today + 6 days inclusive).",
    {
      oldest: z.string().optional().describe("Start date ISO-8601 (default: today)"),
      newest: z.string().optional().describe("End date ISO-8601 inclusive (default: 6 days from now)"),
    },
    async ({ oldest, newest }) => {
      const params: Record<string, string> = {};
      if (oldest) params.oldest = oldest;
      if (newest) params.newest = newest;
      // 不传 oldest/newest 时，API 默认行为就是 today + 6 days

      const data = await client.get<Event[]>(
        `/api/v1/athlete/${client.id}/events`,
        params
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
