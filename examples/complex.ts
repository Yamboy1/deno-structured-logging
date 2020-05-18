// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  consoleSink,
  createLogger,
  LogLevel,
} from "../mod.ts";

const logger = createLogger({
  minimumLevel: LogLevel.INFO,
  sinks: [consoleSink], // This is the default, but shown here for completeness
});

logger.debug("Debug"); // Ignored due to the minimumLevel
logger.info("This is {type} logging in {program}", "Structured", "Deno");

// It doesn't matter what these variables are called,
const num = 1;
const array = ["a", "b", "c"];

logger.warn("Numbers work: {number} as well as arrays: {arr}", num, array);
