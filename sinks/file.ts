import { Sink } from "./types.ts";
import { LogLevel } from "../levels.ts";
import { Format } from "../format.ts";

export function fileSink(filename: string): Sink {
  return new FileSink(filename);
}

class FileSink implements Sink {
  private encoder = new TextEncoder();

  constructor(private filename: string) {}

  run(level: LogLevel, format: Format): void {
    const msg = `[${new Date().toISOString()} ${LogLevel[level]}] ${format.output}\n`;

    Deno.writeFileSync(this.filename, this.encoder.encode(msg), { append: true });
  }

}
