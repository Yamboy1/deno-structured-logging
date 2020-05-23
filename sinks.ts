// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  yellow,
  gray,
  red,
  bold,
  blue,
} from "https://deno.land/std@0.51.0/fmt/colors.ts";
import { LogEntry, LogLevel, SinkFunction } from "./types.ts";

/** A console sink (with colors) */
export function consoleSink(): SinkFunction {
  return ({ level, formattedMessage }: LogEntry) => {
    const color = ({
      [LogLevel.DEBUG]: gray,
      [LogLevel.INFO]: blue,
      [LogLevel.WARN]: yellow,
      [LogLevel.ERROR]: red,
      [LogLevel.CRITICAL]: (str: string) => bold(red(str)),
    })[level] ?? ((x) => x);

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
