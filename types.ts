/** A sink is like an output, sometimes known as a handler */
export type SinkFunction = (logEntry: LogEntry) => void;


/** Logging levels */
export enum LogLevel {
  "DEBUG" = 10,
  "INFO" = 20,
  "WARN" = 30,
  "ERROR" = 40,
  "CRITICAL" = 50,
}

/** A parsed log entry */
export interface LogEntry {
  /** The original format string */
  format: string;
  /** THe LogLevel of this entry */
  level: LogLevel;
  /** The parsed log */
  message: string;
  /** The parsed log formatted according to outputFormat */
  formattedMessage: string;
  /** A map of raw variables from the string */
  variables: Map<string, unknown>;
}
