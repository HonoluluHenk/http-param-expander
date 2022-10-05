import {Param} from '../expander';
import {Formatter} from '../formatter';
import {hasDefinedValue} from './has-defined-value';
import {isEmptyArray} from './is-empty-array';
import {isNullish} from './is-nullish';
import {VariableWithValues} from './variable-with-values';

export function parseArrayValues<Opts>(
  param: Readonly<Param<unknown[], Opts>>,
  formatter: Formatter,
): VariableWithValues[] {

  const values = param.value
    .filter(value => !isNullish(value))
    .map(value => formatter.formatNested(param, param.name, value))
    .filter(hasDefinedValue);

  let varsWithVals: VariableWithValues[];

  if (!param.explode) {
    varsWithVals = [{name: param.name, values}];
  } else {
    varsWithVals = values
      .map(val => ({name: param.name, values: [val]}));
  }

  const result = varsWithVals.filter(({values}) => !isEmptyArray(values));

  return result;
}
