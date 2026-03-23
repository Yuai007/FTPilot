// Intervals.icu API 响应类型定义（只定义 MCP 工具需要的字段）

export interface SportSettings {
  id: number;
  types: string[];
  ftp: number;
  indoor_ftp: number;
  w_prime: number;
  p_max: number;
  power_zones: number[];
  power_zone_names: string[];
  sweet_spot_min: number;
  sweet_spot_max: number;
  lthr: number;
  max_hr: number;
  hr_zones: number[];
  hr_zone_names: string[];
  threshold_pace: number;
  pace_zones: number[];
  pace_zone_names: string[];
  warmup_time: number;
  cooldown_time: number;
  mmp_model: PowerModel | null;
}

export interface PowerModel {
  type: string;
  criticalPower: number;
  wPrime: number;
  pMax: number;
  ftp: number;
}

export interface AthleteWithSettings {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  weight: number;
  sex: string;
  city: string;
  country: string;
  timezone: string;
  icu_resting_hr: number;
  icu_weight: number;
  icu_date_of_birth: string;
  measurement_preference: string;
  sportSettings: SportSettings[];
}

export interface Wellness {
  id: string; // 日期，如 "2024-01-01"
  ctl: number;
  atl: number;
  rampRate: number;
  weight: number;
  restingHR: number;
  hrv: number;
  hrvSDNN: number;
  sleepSecs: number;
  sleepScore: number;
  sleepQuality: number;
  avgSleepingHR: number;
  soreness: number;
  fatigue: number;
  stress: number;
  mood: number;
  motivation: number;
  spO2: number;
  vo2max: number;
  comments: string;
  sportInfo: SportInfo[];
}

export interface SportInfo {
  type: string;
  eftp: number;
  wPrime: number;
  pMax: number;
}

export interface Activity {
  id: string;
  start_date_local: string;
  type: string;
  name: string;
  description: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  icu_training_load: number;
  icu_intensity: number;
  icu_variability_index: number;
  icu_efficiency_factor: number;
  icu_power_hr: number;
  icu_weighted_avg_watts: number;
  icu_average_watts: number;
  average_heartrate: number;
  max_heartrate: number;
  average_cadence: number;
  average_speed: number;
  calories: number;
  icu_ftp: number;
  icu_joules: number;
  icu_joules_above_ftp: number;
  decoupling: number;
  icu_atl: number;
  icu_ctl: number;
  icu_zone_times: ZoneTime[];
  icu_hr_zone_times: number[];
  pace_zone_times: number[];
  trainer: boolean;
  device_watts: boolean;
  tags: string[];
  icu_intervals?: Interval[];
  icu_groups?: IntervalGroup[];
}

export interface ZoneTime {
  id: string;
  secs: number;
}

export interface Interval {
  id: number;
  type: string; // "WORK" | "RECOVERY"
  start_index: number;
  end_index: number;
  moving_time: number;
  elapsed_time: number;
  distance: number;
  average_watts: number;
  weighted_average_watts: number;
  min_watts: number;
  max_watts: number;
  average_watts_kg: number;
  intensity: number;
  training_load: number;
  joules: number;
  zone: number;
  average_heartrate: number;
  min_heartrate: number;
  max_heartrate: number;
  average_cadence: number;
  average_speed: number;
  total_elevation_gain: number;
  decoupling: number;
  label: string;
  group_id: string;
}

export interface IntervalGroup {
  id: string;
  count: number;
  moving_time: number;
  distance: number;
  average_watts: number;
  weighted_average_watts: number;
  average_heartrate: number;
  average_cadence: number;
}

export interface PowerCurveSet {
  list: PowerCurveData[];
}

export interface PowerCurveData {
  id: string;
  label: string;
  start_date_local: string;
  end_date_local: string;
  days: number;
  weight: number;
  secs: number[];
  values: number[];
  watts_per_kg: number[];
  activity_id: string[];
  powerModels: PowerModel[];
}

export interface PowerVsHRPlot {
  bucketSize: number;
  warmup: number;
  cooldown: number;
  elapsedTime: number;
  hrLag: number;
  powerHr: number;
  powerHrFirst: number;
  powerHrSecond: number;
  decoupling: number;
  powerHrZ2: number;
  medianCadenceZ2: number;
  avgCadenceZ2: number;
  start: number;
  mid: number;
  end: number;
  series: Bucket[];
}

export interface Bucket {
  start: number;
  secs: number;
  watts: number;
  hr: number;
  cadence: number;
}

export interface Event {
  id: number;
  start_date_local: string;
  category: string;
  type: string;
  name: string;
  description: string;
  indoor: boolean;
  color: string;
  moving_time: number;
  icu_training_load: number;
  icu_intensity: number;
  target: string;
  joules: number;
  distance: number;
  tags: string[];
  load_target: number;
  time_target: number;
  distance_target: number;
  workout_doc: Record<string, unknown>;
}
