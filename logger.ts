// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import { LogLevel } from "./levels.ts";
import { Sink } from "./sinks.ts";


export interface LoggerOptions {
  minimumLevel: LogLevel;
  sinks: Sink[]
}

export class Logger {
  private minimumLevel: LogLevel;
  private sinks: Sink[] = [];

  constructor({ minimumLevel, sinks }: LoggerOptions) {
    this.minimumLevel = minimumLevel;
    this.sinks = sinks;
  }

  addSink(sink: Sink): this {
    this.sinks.push(sink);
    return this;
  }

  private log(level: LogLevel, format: string, ...args: unknown[]): void {
    if (level < this.minimumLevel) return;

    if (this.sinks.length === 0) {
      console.error(
        "[Deno Structured Logging] Warning: No sinks are provided.",
      );
    }

    for (let sink of this.sinks) {
      sink(level, format, ...args);
    }
  }

  debug(format: string, ...args: unknown[]): void {
    this.log(LogLevel.DEBUG, format, ...args);
  }

  info(format: string, ...args: unknown[]): void {
    this.log(LogLevel.INFO, format, ...args);
  }

  warning(format: string, ...args: unknown[]): void {
    this.log(LogLevel.WARNING, format, ...args);
  }

  error(format: string, ...args: unknown[]): void {
    this.log(LogLevel.ERROR, format, ...args);
  }

  critical(format: string, ...args: unknown[]): void {
    this.log(LogLevel.CRITICAL, format, ...args);
  }
}
