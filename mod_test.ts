import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.51.0/testing/asserts.ts";
import { Spy, spy } from "https://deno.land/x/mock@v0.3.0/spy.ts";

import { createLogger, textFormat, jsonFormat } from "./mod.ts";
import { SinkFunction, LogEntry, LogLevel } from "./types.ts";

Deno.test("addSink", () => {
  const logger = createLogger({ outputFormat: "[{level}] {message}" });
  const sink: Spy<void> = spy();

  logger.addSink(sink);
  logger.info("foo");

  // The sink has been run once
  assertEquals(sink.calls, [
    {
      args: [{
        level: LogLevel.INFO,
        format: "foo",
        message: "foo",
        formattedMessage: "[INFO] foo",
        variables: {},
      }],
      self: { sinkFunc: sink, outputFormat: "[{level}] {message}" },
    },
  ]);
});

Deno.test("addSink with overriding format", () => {
  const logger = createLogger({ outputFormat: "[{level}] {message}" });
  const sink: Spy<void> = spy();

  logger.addSink(sink);
  logger.addSink(sink, "{message} [{level}]");
  logger.info("foo");

  // The sink has been run once
  assertEquals(sink.calls, [
    {
      args: [{
        level: LogLevel.INFO,
        format: "foo",
        message: "foo",
        formattedMessage: "[INFO] foo",
        variables: {},
      }],
      self: { sinkFunc: sink, outputFormat: "[{level}] {message}" },
    },
    {
      args: [{
        level: LogLevel.INFO,
        format: "foo",
        message: "foo",
        formattedMessage: "foo [INFO]",
        variables: {},
      }],
      self: { sinkFunc: sink, outputFormat: "{message} [{level}]" },
    },
  ]);
});

Deno.test("minimumLevel", () => {
  const logger = createLogger(
    { minimumLevel: LogLevel.INFO, outputFormat: "[{level}] {message}" },
  );
  const sink: Spy<void> = spy();

  logger.addSink(sink);
  logger.debug("foo");
  logger.info("foo");

  // The sink has been run once
  assertEquals(sink.calls, [
    {
      args: [{
        level: LogLevel.INFO,
        format: "foo",
        message: "foo",
        formattedMessage: "[INFO] foo",
        variables: {},
      }],
      self: { sinkFunc: sink, outputFormat: "[{level}] {message}" },
    },
  ]);
});

Deno.test("textFormat", () => {
  const logger = createLogger({ outputFormat: textFormat });
  const sink: Spy<void> = spy();

  const NativeDate = globalThis.Date;
  class FakeDate {
    toISOString() {
      return "0000-00-00T-00:00:00.0000Z";
    }
  }
  globalThis.Date = FakeDate as DateConstructor;
  //
  // Date is now mocked
  //
  logger.addSink(sink);
  logger.info("foo");
  //
  // Date is now restored
  //
  globalThis.Date = NativeDate

  assertEquals(sink.calls, [
    {
      args: [{
        level: LogLevel.INFO,
        format: "foo",
        message: "foo",
        formattedMessage: "[0000-00-00T-00:00:00.0000Z INFO] foo",
        variables: {},
      }],
      self: { sinkFunc: sink, outputFormat: textFormat },
    },
  ]);
});

Deno.test("jsonFormat", () => {
  const logger = createLogger({ outputFormat: jsonFormat });
  const sink: Spy<void> = spy();

  const NativeDate = globalThis.Date;
  class FakeDate {
    toISOString() {
      return "0000-00-00T-00:00:00.0000Z";
    }
  }
  globalThis.Date = FakeDate as DateConstructor;
  //
  // Date is now mocked
  //
  logger.addSink(sink);
  logger.info("{foo}", "bar");
  //
  // Date is now restored
  //
  globalThis.Date = NativeDate

  assertEquals(sink.calls, [
    {
      args: [{
        level: LogLevel.INFO,
        format: "{foo}",
        message: "bar",
        formattedMessage: '{"message":"bar","level":"INFO","timestamp":"0000-00-00T-00:00:00.0000Z","data":{"foo":"bar"}}',
        variables: {"foo": "bar"},
      }],
      self: { sinkFunc: sink, outputFormat: jsonFormat },
    },
  ]);
});