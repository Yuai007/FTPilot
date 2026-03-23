import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Activity } from "../types.js";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function registerGetActivities(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_activities",
    "List activities for a date range in descending date order. Returns all activity types (Ride, Run, etc.) so AI can assess overall training load including cross-training. Defaults to last 30 days.",
    {
      oldest: z.string().optional().describe("Start date ISO-8601 (default: 30 days ago)"),
      newest: z.string().optional().describe("End date ISO-8601 inclusive (default: today)"),
    },
    async ({ oldest, newest }) => {
      const data = await client.get<Activity[]>(
        `/api/v1/athlete/${client.id}/activities`,
        {
          oldest: oldest ?? daysAgo(30),
          newest: newest ?? today(),
        }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
