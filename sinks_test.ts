import {
  blue,
  gray,
  yellow,
  red,
  bold,
} from "https://deno.land/std@0.51.0/fmt/colors.ts";
import { assertEquals } from "https://deno.land/std@0.51.0/testing/asserts.ts";
import { Spy, spy } from "https://deno.land/x/mock@v0.3.0/spy.ts";
import { consoleSink, fileSink } from "./sinks.ts";
import { LogLevel } from "./types.ts";

Deno.test("consoleSink colors", () => {
  const log: Spy<void> = spy();
  const nativeConsole = console;
  (console as any) = { log };
  //
  // console.log is now mocked
  //
  const sink = consoleSink();
  for (const level in LogLevel) {
    let num;
    if (num = Number(level)) {
      sink({
        format: "foo",
        formattedMessage: "foo",
        level: num,
        message: "foo",
        variables: {},
      });
    }
  }
  //
  // console.log is restored
  //
  console = nativeConsole;

  assertEquals(log.calls.map((x) => x.args[0]), [
    gray("foo"),
    blue("foo"),
    yellow("foo"),
    red("foo"),
    bold(red("foo")),
  ]);
});

Deno.test("consoleSink colors disabled", () => {
  const log: Spy<void> = spy();
  const nativeConsole = console;
  (console as any) = { log };
  //
  // console.log is now mocked
  //
  const sink = consoleSink({ enableColors: false });
  for (const level in LogLevel) {
    let num;
    if (num = Number(level)) {
      sink({
        format: "foo",
        formattedMessage: "foo",
        level: num,
        message: "foo",
        variables: {},
      });
    }
  }
  //
  // console.log is restored
  //
  console = nativeConsole;

  assertEquals(log.calls.map((x) => x.args[0]), Array(5).fill("foo"));
});

Deno.test("consoleSink custom colors", () => {
  const log: Spy<void> = spy();
  const nativeConsole = console;
  (console as any) = { log };
  //
  // console.log is now mocked
  //
  const sink = consoleSink({
    colorOptions: {
      debug: red,
      info: gray,
      warn: (x: string) => bold(red(x)),
      error: blue,
      critical: yellow,
    },
  });

  for (const level in LogLevel) {
    let num;
    if (num = Number(level)) {
      sink({
        format: "foo",
        formattedMessage: "foo",
        level: num,
        message: "foo",
        variables: {},
      });
    }
  }
  //
  // console.log is restored
  //
  console = nativeConsole;

  assertEquals(log.calls.map((x) => x.args[0]), [
    red("foo"),
    gray("foo"),
    bold(red("foo")),
    blue("foo"),
    yellow("foo"),
  ]);
});

Deno.test("fileSink", () => {
  const sink = fileSink("./test.log");
  sink({
    format: "foo",
    formattedMessage: "foo",
    level: LogLevel.INFO,
    message: "foo",
    variables: {},
  });

  const data = Deno.readTextFileSync("./test.log");
  Deno.removeSync("./test.log");
  assertEquals(data, "foo\n");
});
