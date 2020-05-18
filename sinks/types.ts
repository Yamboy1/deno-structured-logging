import { LogLevel } from "../levels.ts";
import { Format } from "../format.ts"

export interface Sink {
  run(level: LogLevel, format: Format): void
}