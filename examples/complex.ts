// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  createLogger,
  LogLevel,
  consoleSink,
  fileSink,
  jsonFormat,
} from "../mod.ts";

const logger = createLogger({
  minimumLevel: LogLevel.INFO,
  outputFormat: jsonFormat, // A custom output format
})
  .addSink(consoleSink())
  .addSink(fileSink("file.log"));

logger.debug("Debug"); // Ignored due to the minimumLevel
logger.info("This is {type} logging in {program}", "Structured", "Deno");

// It doesn't matter what these variables are called,
const num = 1;
const array = ["a", "b", "c"];

logger.warn("Numbers work: {number} as well as arrays: {arr}", num, array);
