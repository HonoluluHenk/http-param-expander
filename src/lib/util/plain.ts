import {isNullish} from './nullish';

export type Class = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any[]): any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInstanceOfObject(value: unknown, classToBeTreatedAsPlain?: Class): boolean {
  if (typeof value !== 'object') {
    return false;
  }
  if (isNullish(value)) {
    return false;
  }

  const foo: object = value;

  if (classToBeTreatedAsPlain) {
    return foo instanceof classToBeTreatedAsPlain;
  }

  const result = foo.constructor === Object;

  return result;
}

export function isPlain(
  value: unknown,
): value is (string | number | boolean | bigint | symbol) {
  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'bigint':
    case 'symbol':
      return true;
    case 'undefined':
    case 'function':
    case 'object':
      return false;
  }
}
