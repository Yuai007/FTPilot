import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Event } from "../types.js";

export function registerCreateEvent(server: McpServer, client: IntervalsClient) {
  server.tool(
    "create_event",
    "Create a planned workout or event on the athlete's calendar. Use Intervals.icu native workout description format for the description field (e.g. '- 10m 55%\\n- 3x8m 95% 5m 55%\\n- 10m 55%').",
    {
      start_date_local: z.string().describe("Event date ISO-8601 (e.g. '2024-06-15')"),
      name: z.string().describe("Event name"),
      description: z.string().describe("Workout description in Intervals.icu format"),
      type: z.string().optional().describe("Activity type (default: 'Ride')"),
      category: z
        .string()
        .optional()
        .describe(
          "Event category: WORKOUT, RACE_A, RACE_B, RACE_C, NOTE (default: 'WORKOUT')"
        ),
      moving_time: z
        .number()
        .optional()
        .describe("Planned duration in seconds (optional)"),
      athlete_id: z.string().optional().describe("Athlete ID to create event for (default: env INTERVALS_ATHLETE_ID)"),
    },
    async ({ start_date_local, name, description, type, category, moving_time, athlete_id }) => {
      const id = athlete_id ?? client.id;
      // Intervals.icu API requires datetime format (e.g. '2024-06-15T00:00:00')
      const startDate = start_date_local.includes("T") ? start_date_local : `${start_date_local}T00:00:00`;
      const body: Record<string, unknown> = {
        start_date_local: startDate,
        name,
        description,
        type: type ?? "Ride",
        category: category ?? "WORKOUT",
      };
      if (moving_time !== undefined) body.moving_time = moving_time;

      const data = await client.post<Event>(
        `/api/v1/athlete/${id}/events`,
        body,
        { upsertOnUid: "false" }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
