import {hasDefinedValue, type PossiblyDefined} from './has-defined-value';

export function appendIfDefined(separator: string, second: PossiblyDefined): string {
  if (hasDefinedValue(second)) {
    return separator + second;
  }

  return '';
}
