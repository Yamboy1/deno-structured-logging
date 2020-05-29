# Deno Structured Logging

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/Yamboy1/deno-structured-logging/master/mod.ts)
[![deno.land](https://img.shields.io/badge/deno.land-0.4.1-blue)](https://deno.land/x/deno_structured_logging@0.4.1)

A better logger for deno, with support for structured logging.

## Planned features for v1
- [ ] Allow environment variables to control loglevels [#1][i1]
- [ ] Customisable timestamp formats [#2][i2]
- [ ] Proper serialisation of objects [#3][i3]
- [ ] Async support in sinks [#4][i4]
- [ ] More built-in sinks [#5][i5]
- [ ] Better / more complete documentation [#6][i6]
- [ ] Filtering logs per sink [#7][i7]

## Simple Example
```ts
import { createLogger, consoleSink } from "https://deno.land/x/deno_structured_logging@0.4.1/mod.ts";

const logger = createLogger().addSink(consoleSink());

logger.debug("Debug");
logger.info("Info");
logger.warn("Warn");
logger.error("Error");
logger.critical("Critical");
```
![Simple Example](./assets/simple.png)

## More complex example
```ts
import { green } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import {
  createLogger,
  LogLevel,
  consoleSink,
  fileSink,
  jsonFormat,
  textFormat,
} from "https://deno.land/x/deno_structured_logging@0.4.1/mod.ts";

const logger = createLogger({
  minimumLevel: LogLevel.INFO,
  outputFormat: textFormat, // You can customise the default output format
})
  .addSink(consoleSink({
    colorOptions: { info: green }, // You can customise the log level colors
  }))
  .addSink(fileSink("log.ndjson"), jsonFormat); // You can set a custom format per sink

logger.debug("Debug"); // Ignored due to the minimumLevel
logger.info("This is {type} logging in {program}", "Structured", "Deno");

// It doesn't matter what these variables are called,
const num = 1;
const array = ["a", "b", "c"];

logger.warn("Numbers work: {number} as well as arrays: {arr}", num, array);
```
![Complex Example](./assets/complex.png)

## String formatting

DSL uses it's own form of string formatting, similar to Serilog in C#. The syntax for this is 
```ts
logger.info("Hello {name}, this is another {variable}", "First", 2);
```
where `"First"` and `2` are substituted into `{name}` and `{variable}` respectively. With the default console sink, the names don't really matter however they help readability of the format and with more complex formats, for example a JSON format, they could be used as property names.

## Available sinks

A sink is an output for DSL. For example the console sink prints to the console, or the file sink writes to a file. At this point a sink is literally just a function, so it's easy enough to create your own.

Available sinks:

- Console Sink (with colors)
- File Sink
- More coming soon

[i1]: https://github.com/Yamboy1/deno-structured-logging/issues/1
[i2]: https://github.com/Yamboy1/deno-structured-logging/issues/2
[i3]: https://github.com/Yamboy1/deno-structured-logging/issues/3
[i4]: https://github.com/Yamboy1/deno-structured-logging/issues/4
[i5]: https://github.com/Yamboy1/deno-structured-logging/issues/5
[i6]: https://github.com/Yamboy1/deno-structured-logging/issues/6
[i7]: https://github.com/Yamboy1/deno-structured-logging/issues/7
