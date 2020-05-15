// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import { LogLevel } from "./levels.ts";
import { Logger, LoggerOptions } from "./logger.ts";
import { Sink, consoleSink } from "./sinks.ts";

export { LogLevel };
export { Sink, consoleSink };

/** Create a new Logger */
export function createLogger({ minimumLevel, sinks }: Partial<LoggerOptions> = {}) {
  return new Logger({
    minimumLevel: minimumLevel ?? LogLevel.DEBUG,
    sinks: sinks ?? [consoleSink],
  })
}
