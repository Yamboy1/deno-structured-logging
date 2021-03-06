// Copyright 2020 Yamboy1. All rights reserved. MIT license.

export * from "./sinks.ts";
export * from "./types.ts";

import { LogEntry, LogLevel, SinkFunction } from "./types.ts";
import { parseLogEntry } from "./parser.ts";

export interface LoggerOptions {
  /** Minimum log level, any logs under this level will be ignored. Defaults to LogLevel.INFO */
  minimumLevel: LogLevel;
  /** Output format for text logs */
  outputFormat: string;
}

/** The default text output format */
export const textFormat = "[{timestamp} {level}] {message}";

/** A json output format */
export const jsonFormat =
  '{"message":"{message}","level":"{level}","timestamp":"{timestamp}","data":{params}}';

/** Create a new Logger */
export function createLogger(
  {
    minimumLevel = LogLevel.DEBUG,
    outputFormat = textFormat,
  }: Partial<LoggerOptions> = {},
): Logger {
  return new LoggerImpl({
    minimumLevel,
    outputFormat,
  });
}

export type LogFunction = (format: string, ...args: unknown[]) => void;

interface Sink {
  sinkFunc: SinkFunction;
  outputFormat: string;
}

/** THe main logger class */
export interface Logger {
  /** Add a sink */
  addSink(sinkFunc: SinkFunction, outputFormat?: string): this;

  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
  critical: LogFunction;
}

class LoggerImpl implements Logger {
  private readonly minimumLevel: LogLevel;
  private readonly outputFormat: string;
  private sinks: Sink[] = [];

  constructor({ minimumLevel, outputFormat }: LoggerOptions) {
    this.minimumLevel = minimumLevel;
    this.outputFormat = outputFormat;
  }

  addSink(
    sinkFunc: SinkFunction,
    outputFormat: string = this.outputFormat,
  ): this {
    this.sinks.push({
      sinkFunc,
      outputFormat,
    });
    return this;
  }

  private log(level: LogLevel, format: string, ...args: unknown[]): void {
    if (level < this.minimumLevel) return;

    if (this.sinks.length === 0) {
      // TODO(yamboy1): revisit this idea

      // console.error(
      //   "[INTERNAL] Warning: No sinks are provided.",
      // );
      return;
    }

    for (let sink of this.sinks) {
      const parsed = parseLogEntry(
        level,
        format,
        sink.outputFormat,
        ...args,
      );
      sink.sinkFunc(parsed);
    }
  }

  debug(format: string, ...args: unknown[]): void {
    this.log(LogLevel.DEBUG, format, ...args);
  }

  info(format: string, ...args: unknown[]): void {
    this.log(LogLevel.INFO, format, ...args);
  }

  warn(format: string, ...args: unknown[]): void {
    this.log(LogLevel.WARN, format, ...args);
  }

  error(format: string, ...args: unknown[]): void {
    this.log(LogLevel.ERROR, format, ...args);
  }

  critical(format: string, ...args: unknown[]): void {
    this.log(LogLevel.CRITICAL, format, ...args);
  }
}
