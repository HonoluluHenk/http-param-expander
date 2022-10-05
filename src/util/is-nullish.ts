export function isNullish(value: unknown): value is undefined | null {
  return (value === null) || (value === undefined);
}
