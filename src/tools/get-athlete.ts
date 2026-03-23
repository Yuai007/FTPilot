import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IntervalsClient } from "../client.js";
import type { AthleteWithSettings } from "../types.js";

export function registerGetAthlete(server: McpServer, client: IntervalsClient) {
  server.tool(
    "get_athlete",
    "Get athlete profile including sport settings (FTP, power zones, HR zones, W', Pmax). Ride-specific settings are extracted from sportSettings array.",
    {},
    async () => {
      const data = await client.get<AthleteWithSettings>(
        `/api/v1/athlete/${client.id}`
      );

      // 从 sportSettings 中过滤出 Ride 相关的设置
      const rideSettings = data.sportSettings?.find((s) =>
        s.types?.includes("Ride")
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: data.id,
                name: data.name,
                weight: data.icu_weight ?? data.weight,
                sex: data.sex,
                city: data.city,
                country: data.country,
                timezone: data.timezone,
                resting_hr: data.icu_resting_hr,
                date_of_birth: data.icu_date_of_birth,
                ride_settings: rideSettings
                  ? {
                      ftp: rideSettings.ftp,
                      indoor_ftp: rideSettings.indoor_ftp,
                      w_prime: rideSettings.w_prime,
                      p_max: rideSettings.p_max,
                      power_zones: rideSettings.power_zones,
                      power_zone_names: rideSettings.power_zone_names,
                      sweet_spot_min: rideSettings.sweet_spot_min,
                      sweet_spot_max: rideSettings.sweet_spot_max,
                      lthr: rideSettings.lthr,
                      max_hr: rideSettings.max_hr,
                      hr_zones: rideSettings.hr_zones,
                      hr_zone_names: rideSettings.hr_zone_names,
                      warmup_time: rideSettings.warmup_time,
                      cooldown_time: rideSettings.cooldown_time,
                      mmp_model: rideSettings.mmp_model,
                    }
                  : null,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
