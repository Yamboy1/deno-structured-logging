// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  consoleSink,
  createLogger,
  LogLevel,
} from "../mod.ts";

const logger = createLogger({
  minimumLevel: LogLevel.INFO,
  sinks: [consoleSink] // This is the default, but shown here for completeness
 });

logger.debug("Debug"); // Ignored due to the minimumLevel
logger.info("This is {type} logging in {program}", "Structured", "Deno");
logger.warning("Numbers work: {number} as well as arrays: {arr}", 1, ["a","b","c"]);
