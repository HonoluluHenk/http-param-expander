export function isNullish(value: unknown): value is undefined | null {
  return (value === null) || (value === undefined);
}

export function checkNonNullish<T>(value: T): NonNullable<T> {
  if (isNullish(value)) {
    throw Error('Value is nullish: ' + value);
  }

  return value as NonNullable<T>;
}
