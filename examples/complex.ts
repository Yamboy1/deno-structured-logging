// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import { green } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import {
  createLogger,
  LogLevel,
  consoleSink,
  fileSink,
  jsonFormat,
  textFormat,
} from "../mod.ts";

const logger = createLogger({
  minimumLevel: LogLevel.INFO,
  outputFormat: textFormat, // You can customise the default output format
})
  .addSink(consoleSink({
    colorOptions: { info: green } // You can customise the log level colors
  }))
  .addSink(fileSink("log.ndjson"), jsonFormat); // You can set a custom format per sink

logger.debug("Debug"); // Ignored due to the minimumLevel
logger.info("This is {type} logging in {program}", "Structured", "Deno");

// It doesn't matter what these variables are called,
const num = 1;
const array = ["a", "b", "c"];

logger.warn("Numbers work: {number} as well as arrays: {arr}", num, array);