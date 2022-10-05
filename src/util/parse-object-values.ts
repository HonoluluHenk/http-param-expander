import {Param} from '../expander';
import {Formatter} from '../formatter';
import {hasDefinedValue} from './has-defined-value';
import {isEmptyArray} from './is-empty-array';
import {isNullish} from './is-nullish';
import {VariableWithValues} from './variable-with-values';

export function parseObjectValues<Opts>(
  param: Readonly<Param<object | null, Opts>>,
  formatter: Formatter,
): VariableWithValues[] {
  const entries = Object.entries(param.value ?? {})
    .filter(([_name, value]) => !isNullish(value))
    .map(([name, value]) => ([name, formatter.formatNested(param, name, value)] as const))
    .filter(([_name, value]) => hasDefinedValue(value));

  let varsWithVals: VariableWithValues[];

  if (!param.explode) {
    varsWithVals = [{name: param.name, values: entries.flatMap(([name, value]) => [name, value])}];
  } else {
    varsWithVals = entries.map(([name, value]) => ({name, values: [value]}));
  }

  const result = varsWithVals.filter(({values}) => !isEmptyArray(values));

  return result;
}
