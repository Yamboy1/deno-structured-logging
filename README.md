# Deno Structured Logging

A better logger for deno, with support for structured logging.

## Simple Example
```ts
import { createLogger } from "https://denolib.com/yamboy1/deno-structured-logging/mod.ts";
const logger = createLogger();

logger.debug("Debug");
logger.info("Info");
logger.warning("Warning");
logger.error("Error");
logger.critical("Critical");
```

## More complex example
```ts
import {
  consoleSink,
  createLogger,
  LogLevel,
} from "https://denolib.com/yamboy1/deno-structured-logging/mod.ts";

const logger = createLogger({
  minimumLevel: LogLevel.INFO,
  sinks: [consoleSink] // This is the default, but shown here for completeness
 });

logger.debug("Debug"); // Ignored due to the minimumLevel
logger.info("This is {type} logging in {program}", "Structured", "Deno");
logger.warning("Numbers work: {number} as well as arrays: {arr}", 1, ["a","b","c"]);
```

## String formatting

DSL uses it's own form of string formatting, similar to Serilog in C#. The syntax for this is 
```ts
logger.log("Hello {name}, this is another {variable}", "First", 2);
```
where `"First"` and `2` are substituted into `{name}` and `{variable}` respectively. With the default console sink, the names don't really matter however they help readability of the format and with more complex sinks, for example a JSON sink, they could be used as property names.

## Available sinks

A sink is an output for DSL. For example the console sink prints to the console, or the file sink writes to a file. At this point a sink is literally just a function, so it's easy enough to create your own.

Available sinks:

- Console (with colors)
- ~~File~~ coming soon™
