import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { IntervalsClient } from "../client.js";
import type { Activity } from "../types.js";

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
        content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      };
    }
  );
}
