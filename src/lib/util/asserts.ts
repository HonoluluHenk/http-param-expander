export function asserts(condition: unknown, message: () => string): asserts condition {
  if (condition) {
    return;
  }

  const msg = message();
  throw Error(msg);
}
