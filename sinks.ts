// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  yellow,
  gray,
  white,
  red,
  bold,
} from "https://deno.land/std@0.51.0/fmt/colors.ts";
import { Format } from "./format.ts";
import { LogLevel } from "./levels.ts";

/** An output for the logger, sometimes known as a handler */
export type Sink = (
  level: LogLevel,
  format: Format,
) => void;

/** The default console sink */
export const consoleSink: Sink = (
  level: LogLevel,
  format: Format,
) => {
  const message = `[${new Date().toISOString()} ${
    LogLevel[level]
  }] ${format.output}`;

  const color = ({
    [LogLevel.DEBUG]: gray,
    [LogLevel.INFO]: white,
    [LogLevel.WARNING]: yellow,
    [LogLevel.ERROR]: red,
    [LogLevel.CRITICAL]: (str: string) => bold(red(str)),
  })[level] ?? white;

  console.log(color(message));
};
