// Intervals.icu API 客户端

export class IntervalsClient {
  private baseUrl = "https://intervals.icu";
  private athleteId: string;
  private authHeader: string;

  constructor() {
    const apiKey = process.env.INTERVALS_API_KEY;
    const athleteId = process.env.INTERVALS_ATHLETE_ID;
    if (!apiKey || !athleteId) {
      throw new Error(
        "缺少环境变量：请设置 INTERVALS_API_KEY 和 INTERVALS_ATHLETE_ID"
      );
    }
    this.athleteId = athleteId;
    // Basic Auth: username="API_KEY"(字面量), password=实际的 apiKey
    this.authHeader =
      "Basic " + Buffer.from(`API_KEY:${apiKey}`).toString("base64");
  }

  get id(): string {
    return this.athleteId;
  }

  async get<T>(
    path: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v);
      }
    }

    const res = await fetch(url.toString(), {
      headers: { Authorization: this.authHeader },
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      throw new Error(
        `Intervals.icu API 错误: ${res.status} ${res.statusText} - ${await res.text()}`
      );
    }
    return res.json() as Promise<T>;
  }

  async post<T>(
    path: string,
    body: unknown,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v);
      }
    }

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      throw new Error(
        `Intervals.icu API 错误: ${res.status} ${res.statusText} - ${await res.text()}`
      );
    }
    return res.json() as Promise<T>;
  }
}
