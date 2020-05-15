# Deno Structured Logging

A better logger for deno, with support for structured logging.

## String formatting

DSL uses it's own form of string formatting, similar to Serilog in C#. The syntax for this is 
```ts
logger.log("Hello {name}, this is another {variable}", "First", 2);
```
where `"First"` and `2` are substituted into `{name}` and `{variable}` respectively. With the default console sink, the names don't really matter, however they help readability of the format, and with more complex sinks, for example a JSON sink, they could be used as property names or something like that.

## Available sinks

A sink is an output for DSL. For example the console sink prints to the console, or the file sink writes to a file. At this point a sink is literally just a function, so it's easy enough to create your own.

Available sinks:

- Console (with colors)
- ~~File~~ coming soon™

(c) 2020 Yamboy1. All rights reserved. MIT license.
