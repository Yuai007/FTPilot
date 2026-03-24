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

// Only request fields useful for AI coach analysis
const ACTIVITY_FIELDS = [
  "id", "start_date_local", "type", "name", "moving_time", "distance",
  "total_elevation_gain", "icu_training_load", "icu_intensity",
  "icu_weighted_avg_watts", "icu_average_watts", "average_heartrate",
  "max_heartrate", "average_cadence", "decoupling", "icu_atl", "icu_ctl",
  "icu_efficiency_factor", "icu_power_hr", "trainer", "icu_ftp",
].join(",");

export function registerGetActivities(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_activities",
    "List activities for a date range in descending date order. Returns all activity types (Ride, Run, etc.) so AI can assess overall training load including cross-training. Defaults to last 30 days.",
    {
      oldest: z.string().optional().describe("Start date ISO-8601 (default: 30 days ago)"),
      newest: z.string().optional().describe("End date ISO-8601 inclusive (default: today)"),
      athlete_id: z.string().optional().describe("Athlete ID to query (default: env INTERVALS_ATHLETE_ID)"),
    },
    async ({ oldest, newest, athlete_id }) => {
      const id = athlete_id ?? client.id;
      const data = await client.get<Activity[]>(
        `/api/v1/athlete/${id}/activities`,
        {
          oldest: oldest ?? daysAgo(30),
          newest: newest ?? today(),
          fields: ACTIVITY_FIELDS,
        }
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
