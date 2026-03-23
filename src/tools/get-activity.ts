import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Activity } from "../types.js";

// Extract only coach-relevant fields from a full activity object
function pickActivityFields(a: Activity) {
  return {
    id: a.id,
    start_date_local: a.start_date_local,
    type: a.type,
    name: a.name,
    moving_time: a.moving_time,
    elapsed_time: a.elapsed_time,
    distance: a.distance,
    total_elevation_gain: a.total_elevation_gain,
    icu_training_load: a.icu_training_load,
    icu_intensity: a.icu_intensity,
    icu_variability_index: a.icu_variability_index,
    icu_efficiency_factor: a.icu_efficiency_factor,
    icu_power_hr: a.icu_power_hr,
    icu_weighted_avg_watts: a.icu_weighted_avg_watts,
    icu_average_watts: a.icu_average_watts,
    average_heartrate: a.average_heartrate,
    max_heartrate: a.max_heartrate,
    average_cadence: a.average_cadence,
    average_speed: a.average_speed,
    calories: a.calories,
    icu_ftp: a.icu_ftp,
    icu_joules: a.icu_joules,
    icu_joules_above_ftp: a.icu_joules_above_ftp,
    decoupling: a.decoupling,
    icu_atl: a.icu_atl,
    icu_ctl: a.icu_ctl,
    trainer: a.trainer,
    icu_zone_times: a.icu_zone_times,
    icu_hr_zone_times: a.icu_hr_zone_times,
    icu_intervals: a.icu_intervals,
    icu_groups: a.icu_groups,
  };
}

export function registerGetActivity(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_activity",
    "Get a single activity with full details including intervals (work/recovery segments), zone times, decoupling, efficiency factor, and power/HR data.",
    {
      id: z.string().describe("Activity ID (e.g. 'i12345' or 'o12345')"),
    },
    async ({ id }) => {
      const data = await client.get<Activity>(
        `/api/v1/activity/${id}`,
        { intervals: "true" }
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(pickActivityFields(data), null, 2) }],
      };
    }
  );
}
