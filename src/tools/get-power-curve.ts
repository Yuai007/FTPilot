import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { PowerCurveSet } from "../types.js";

export function registerGetPowerCurve(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_power_curve",
    "Get best power curves for the athlete (Ride only). Supports multiple curves for comparison. Curve specs: 150d (past 150 days), 42d (past 42 days), 1y (past year), s0 (current season), all (all time), r.2024-01-01.2024-06-30 (date range).",
    {
      curves: z
        .string()
        .optional()
        .describe(
          "Comma-separated curve specs (default: '150d'). Examples: '42d,150d', '42d,1y', 's0,s1'"
        ),
    },
    async ({ curves }) => {
      const data = await client.get<PowerCurveSet>(
        `/api/v1/athlete/${client.id}/power-curves`,
        {
          type: "Ride",
          curves: curves ?? "150d",
        }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
