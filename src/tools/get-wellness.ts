import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Wellness } from "../types.js";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function registerGetWellness(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_wellness",
    "Get wellness records (CTL, ATL, ramp rate, weight, resting HR, HRV, sleep, fatigue, stress, mood etc.) for a date range. Defaults to last 7 days.",
    {
      oldest: z.string().optional().describe("Start date ISO-8601 (default: 7 days ago)"),
      newest: z.string().optional().describe("End date ISO-8601 inclusive (default: today)"),
      athlete_id: z.string().optional().describe("Athlete ID to query (default: env INTERVALS_ATHLETE_ID)"),
    },
    async ({ oldest, newest, athlete_id }) => {
      const id = athlete_id ?? client.id;
      const data = await client.get<Wellness[]>(
        `/api/v1/athlete/${id}/wellness`,
        {
          oldest: oldest ?? daysAgo(7),
          newest: newest ?? today(),
        }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
