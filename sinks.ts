// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  yellow,
  gray,
  red,
  bold,
  blue,
} from "https://deno.land/std@0.51.0/fmt/colors.ts";
import { LogEntry, LogLevel, SinkFunction } from "./types.ts";

/** A function that changes the color of a string in the terminal, generally from std/fmt/colors.ts */
export type ColorFunction = (str: string) => string;

/** Options for the console sink */
export interface ConsoleOptions {
  /** Whether colors should be enabled*/
  enableColors: boolean;
  /** Color overrides for the sink */
  colorOptions: Partial<ColorOptions>;
}

/** Color overrides for the console sink */
export interface ColorOptions {
  debug: ColorFunction;
  info: ColorFunction;
  warn: ColorFunction;
  error: ColorFunction;
  critical: ColorFunction;
}

/** A console sink (with colors) */
export function consoleSink({
  enableColors = true,
colorOptions: {
    debug = gray,
    info = blue,
    warn = yellow,
    error = red,
    critical = (str: string) => bold(red(str))
  } = {},
}: Partial<ConsoleOptions> = {}): SinkFunction {
  return ({ level, formattedMessage }: LogEntry) => {
    let color;
    if (enableColors) {
      color = ({
        [LogLevel.DEBUG]: debug,
        [LogLevel.INFO]: info,
        [LogLevel.WARN]: warn,
        [LogLevel.ERROR]: error,
        [LogLevel.CRITICAL]: critical,
      })[level] ?? ((x: string) => x);
    } else {
      color = (x: string) => x;
    }

    console.log(color(formattedMessage));
  };
}

/** A basic sink to write to a file */
export function fileSink(filename: string): SinkFunction {
  const file = Deno.openSync(filename, { create: true, append: true });
  const encoder = new TextEncoder();

  addEventListener("unload", () => file.close());

  return ({ formattedMessage }: LogEntry) => {
    file.writeSync(encoder.encode(formattedMessage + "\n"));
  };
}
