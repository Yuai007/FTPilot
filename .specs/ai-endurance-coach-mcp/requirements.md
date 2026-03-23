# 需求文档

## 介绍

构建一个基于 Intervals.icu API 的 MCP Server，作为 AI Endurance Coach 的核心数据层。第一版聚焦骑行（Ride）场景，提供运动员数据获取和训练计划写入能力，为上层 AI 教练（Skills 层）提供结构化的训练数据支撑。

MCP Server 只负责数据获取和写入，不包含分析和决策逻辑（交给 AI 层处理）。

## 需求

### 需求 1 - 运动员基础信息获取

**用户故事：** 作为 AI 教练，我需要获取运动员的基础信息和运动设置，以便了解运动员的当前能力水平和训练配置。

#### 验收标准
1. When 调用 `get_athlete` 工具时，the MCP Server shall 返回运动员的基础信息，包括：姓名、体重、FTP、W'、Pmax、功率区间、心率区间、LTHR、Max HR。
2. When 未配置 API Key 或 Athlete ID 环境变量时，the MCP Server shall 返回明确的错误提示。

### 需求 2 - 体能状态获取

**用户故事：** 作为 AI 教练，我需要获取运动员的体能/疲劳/状态数据，以便判断当前训练负荷是否合理。

#### 验收标准
1. When 调用 `get_wellness` 工具并指定日期范围时，the MCP Server shall 返回该范围内的健康记录，包括：CTL（体能）、ATL（疲劳）、rampRate（负荷增长率）、体重、静息心率、HRV、睡眠时长、疲劳/压力/心情等主观指标。
2. When 未指定日期范围时，the MCP Server shall 默认返回最近 7 天的数据。

### 需求 3 - 功率曲线获取

**用户故事：** 作为 AI 教练，我需要获取运动员的历史最佳功率曲线，以便分析运动员的优劣势和能力变化趋势。

#### 验收标准
1. When 调用 `get_power_curve` 工具时，the MCP Server shall 返回指定时间范围的最佳功率曲线数据，包括各持续时间对应的最佳功率值。
2. When 未指定时间范围时，the MCP Server shall 默认返回过去 5 个月的功率曲线。
3. When 指定多个时间范围时（如过去 42 天 vs 过去 1 年），the MCP Server shall 返回多条曲线用于对比。

### 需求 4 - 近期活动列表获取

**用户故事：** 作为 AI 教练，我需要获取运动员的近期训练活动列表，以便回顾训练执行情况。

#### 验收标准
1. When 调用 `get_activities` 工具并指定日期范围时，the MCP Server shall 返回该范围内的骑行活动列表，包括：名称、日期、距离、时长、训练负荷（TSS）、NP、IF、平均功率、平均心率。
2. When 未指定日期范围时，the MCP Server shall 默认返回最近 30 天的活动。

### 需求 5 - 活动详情与间歇段获取

**用户故事：** 作为 AI 教练，我需要获取单次活动的详情和间歇段数据，以便分析训练质量。

#### 验收标准
1. When 调用 `get_activity` 工具并指定活动 ID 时，the MCP Server shall 返回活动详情，包括：基础指标、功率区间时间分布、心率区间时间分布。
2. When 调用 `get_activity` 工具时，the MCP Server shall 同时返回间歇段（intervals）数据，包括每个间歇段的：类型（WORK/RECOVERY）、时长、平均功率、NP、平均心率、功率区间。

### 需求 6 - 功率 vs 心率分析数据获取

**用户故事：** 作为 AI 教练，我需要获取活动的功率与心率关系数据，以便评估有氧效率和心率解耦情况。

#### 验收标准
1. When 调用 `get_power_vs_hr` 工具并指定活动 ID 时，the MCP Server shall 返回功率 vs 心率数据，包括：效率因子（power/hr）、解耦百分比（decoupling）。

### 需求 7 - 计划训练获取

**用户故事：** 作为 AI 教练，我需要获取运动员日历上的计划训练，以便了解训练安排。

#### 验收标准
1. When 调用 `get_events` 工具并指定日期范围时，the MCP Server shall 返回该范围内的计划训练事件，包括：名称、日期、类型、训练描述、目标负荷、目标时长。
2. When 未指定日期范围时，the MCP Server shall 默认返回未来 7 天的计划。

### 需求 8 - 创建计划训练

**用户故事：** 作为 AI 教练，我需要能够在运动员的日历上创建训练计划，以便将训练建议落地执行。

#### 验收标准
1. When 调用 `create_event` 工具并提供训练描述时，the MCP Server shall 在运动员日历上创建对应的计划训练事件。
2. When 创建训练时，the MCP Server shall 支持 Intervals.icu 原生训练描述格式（description 字段）。
3. When 创建成功时，the MCP Server shall 返回创建的事件详情。

### 需求 9 - MCP Server 基础设施

**用户故事：** 作为开发者，我需要 MCP Server 能够正确启动、认证和处理错误。

#### 验收标准
1. When 启动 MCP Server 时，the MCP Server shall 从环境变量读取 `INTERVALS_API_KEY` 和 `INTERVALS_ATHLETE_ID`。
2. When API 调用返回错误时，the MCP Server shall 返回结构化的错误信息，包括 HTTP 状态码和错误描述。
3. When API 调用超时时，the MCP Server shall 在 30 秒后超时并返回超时错误。
