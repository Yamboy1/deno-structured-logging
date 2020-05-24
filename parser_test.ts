import { assertEquals } from "https://deno.land/std@0.51.0/testing/asserts.ts";

import { parseLogEntry } from "./parser.ts";
import { LogLevel } from "./types.ts";

Deno.test("parseLogEntry outputFormat", () => {
  const NativeDate = globalThis.Date;
  class FakeDate {
    toISOString() {
      return "0000-00-00T-00:00:00.0000Z";
    }
  }
  //
  // Date is now mocked
  //
  globalThis.Date = FakeDate as DateConstructor;
  const log = parseLogEntry(
    LogLevel.INFO,
    "foo",
    "[{timestamp} {level}] {message} {params}",
  );
  //
  // Date is now restored
  //
  globalThis.Date = NativeDate;

  assertEquals(log, {
    format: "foo",
    formattedMessage: "[0000-00-00T-00:00:00.0000Z INFO] foo {}",
    level: LogLevel.INFO,
    message: "foo",
    variables: {},
  });
});

Deno.test("parseLogEntry format", () => {
  const log = parseLogEntry(
    LogLevel.INFO,
    "{foo} {bar}",
    "{message}",
    "bar",
    "foo",
  );

  assertEquals(log, {
    format: "{foo} {bar}",
    formattedMessage: "bar foo",
    level: LogLevel.INFO,
    message: "bar foo",
    variables: { "bar": "foo", "foo": "bar" },
  });
});
