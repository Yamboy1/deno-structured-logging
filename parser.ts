import { LogLevel, LogEntry } from "./types.ts";

export function parseLogEntry(
  level: LogLevel,
  format: string,
  outputFormat: string,
  ...args: unknown[]
): LogEntry {
  const variables: any = {};

  const message = format.replace(/\{([^{]*?)\}/g, (_, p1: string) => {
    const arg = args.shift();
    variables[p1] = arg;
    return `${arg}` || "";
  });

  const formattedMessage = outputFormat.replace(
    /\{([^{]*?)\}/g,
    (_, p1: string) => {
      if (p1 === "timestamp") return new Date().toISOString();
      if (p1 === "level") return LogLevel[level];
      if (p1 === "message") return message;
      if (p1 === "params") return JSON.stringify(variables);
      return `{${p1}}`;
    },
  );

  return {
    level,
    format,
    message,
    formattedMessage,
    variables,
  };
}
