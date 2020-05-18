/** A parsed format */
export interface Format {
  /** The original format string */
  format: string;
  /** The parsed string */
  output: string;
  /** A map of raw variables from the string */
  variables: Map<string, unknown>;
}

/** Parse a string format with variables */
export const parseFormat = (format: string, ...args: unknown[]): Format => {
  const variables = new Map<string, unknown>();

  const output = format.replace(/\{(.*?)\}/g, (_, p1: string) => {
    const arg = args.shift();
    variables.set(p1, arg);
    return `${arg}` || "";
  });

  return {
    format,
    output,
    variables,
  };
};
