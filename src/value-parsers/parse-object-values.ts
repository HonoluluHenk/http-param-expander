import {Param} from '../expander';
import {Formatter} from '../formatter';
import {checkNonNullish, hasDefinedValue, isNullish, VariableWithValues} from '../util';

export function parseObjectValues<Opts>(
  param: Readonly<Param<object | null, Opts>>,
  formatter: Formatter,
): VariableWithValues[] {
  const entries = Object.entries(param.value ?? {})
    .filter(([_name, value]) => hasDefinedValue(value))
    // FIXME: error out if formatter does not support the value
    .map(([name, value]) => ([name, formatter.formatNested(param, name, value)] as const))
    .filter(([_name, value]) => !isNullish(value))
    .map(([name, value]) => ([name, checkNonNullish(value)]));

  if (!entries.length) {
    return [];
  }

  if (param.explode) {
    const result = entries
      .map(([name, value]) => ({name, values: [value]}));
    return result;
  } else {
    const result = [{name: param.name, values: entries.flatMap(([name, value]) => [name, value])}];

    return result;
  }
}
