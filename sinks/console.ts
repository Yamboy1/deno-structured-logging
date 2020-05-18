// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import {
  yellow,
  gray,
  white,
  red,
  bold,
} from "https://deno.land/std@0.51.0/fmt/colors.ts";
import { Format } from "../format.ts";
import { LogLevel } from "../levels.ts";
import { Sink } from "./types.ts"

export function consoleSink(): Sink {
  return new ConsoleSink();
}


/** The default console sink */
export class ConsoleSink implements Sink {
  run(level: LogLevel, format: Format) {
    const msg = `[${new Date().toISOString()} ${LogLevel[level]}] ${format.output}`;

    const color = ({
      [LogLevel.DEBUG]: gray,
      [LogLevel.INFO]: white,
      [LogLevel.WARN]: yellow,
      [LogLevel.ERROR]: red,
      [LogLevel.CRITICAL]: (str: string) => bold(red(str)),
    })[level] ?? white;

    console.log(color(msg));
  }
};
