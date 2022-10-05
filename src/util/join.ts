import {hasDefinedValue} from './has-defined-value';

export function join(separator: string, ...strings: string[]): string {
  return strings
    .filter(hasDefinedValue)
    .join(separator);
}
