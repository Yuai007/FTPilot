import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { PowerVsHRPlot } from "../types.js";

export function registerGetPowerVsHr(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_power_vs_hr",
    "Get detailed power vs heart rate analysis for an activity. Includes efficiency factor, decoupling percentage, first/second half comparison, and bucketed power/HR series data.",
    {
      id: z.string().describe("Activity ID"),
    },
    async ({ id }) => {
      const data = await client.get<PowerVsHRPlot>(
        `/api/v1/activity/${id}/power-vs-hr`
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
