import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Event } from "../types.js";

export function registerGetEvents(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_events",
    "List events (planned workouts, notes, races etc.) on the athlete's calendar. Defaults to next 7 days (today + 6 days inclusive).",
    {
      oldest: z.string().optional().describe("Start date ISO-8601 (default: today)"),
      newest: z.string().optional().describe("End date ISO-8601 inclusive (default: 6 days from now)"),
      athlete_id: z.string().optional().describe("Athlete ID to query (default: env INTERVALS_ATHLETE_ID)"),
    },
    async ({ oldest, newest, athlete_id }) => {
      const id = athlete_id ?? client.id;
      const params: Record<string, string> = {};
      if (oldest) params.oldest = oldest;
      if (newest) params.newest = newest;

      const data = await client.get<Event[]>(
        `/api/v1/athlete/${id}/events`,
        params
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
