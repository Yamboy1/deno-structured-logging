// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  yellow,
  gray,
  white,
  red,
  bold,
} from "https://deno.land/std/fmt/colors.ts";
import { LogLevel } from "./levels.ts";

/* An output for the logger, sometimes known as a handler */
export type Sink = (
  level: LogLevel,
  format: string,
  ...args: unknown[]
) => void;

/* A console sink with colors */
export const consoleSink: Sink = (
  level: LogLevel,
  format: string,
  ...args: unknown[]
) => {
  const message = format.replace(/\{.*?\}/g, () => `${args.shift()}` || "");
  const timestamp = `[${new Date().toISOString()} ${LogLevel[level]}]`;

  let color;
  switch (level) {
    case LogLevel.DEBUG:
      color = gray;
      break;
    case LogLevel.INFO:
      color = white;
      break;
    case LogLevel.WARNING:
      color = yellow;
      break;
    case LogLevel.ERROR:
      color = red;
      break;
    case LogLevel.CRITICAL:
      color = (str: string) => bold(red(str));
      break;
    default:
      color = white;
      break;
  }

  console.log(color(`${timestamp} ${message}`));
};
