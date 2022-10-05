/**
 * As per RFC-6570: a defined value is "not undef" (in JavaScript this means: not nullish) and not the empty string.
 */
import {isNullish} from './is-nullish';

export type PossiblyDefined = string | '' | null | undefined;

export function hasDefinedValue(value: PossiblyDefined): boolean {
  return !isNullish(value) && value !== '';
}
