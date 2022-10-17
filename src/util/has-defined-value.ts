import {isNullish} from './is-nullish';

export type PossiblyDefined = string | null | undefined;

/**
 * As per RFC-6570: a defined value is "not undef" (in JavaScript this means: non-nullish).
 *
 * From the RFC: "A variable value that is a string of length zero is not considered
 *    undefined; it has the defined value of an empty string."
 */
export function hasDefinedValue(value: PossiblyDefined): value is string {
  return !isNullish(value);
}
