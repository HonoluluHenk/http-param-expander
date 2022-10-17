import {Param} from '../expander';
import {Formatter} from '../formatter';
import {checkNonNullish, isNullish, VariableWithValues} from '../util';

export function parseArrayValues<Opts>(
  param: Readonly<Param<unknown[], Opts>>,
  formatter: Formatter,
): VariableWithValues[] {

  const values = param.value
    .filter(value => !isNullish(value))
    .map(value => formatter.formatNested(param, param.name, value))
    .filter(value => !isNullish(value))
    .map(value => checkNonNullish(value));

  if (!values.length) {
    return [];
  }

  if (param.explode) {
    const result: VariableWithValues[] = values
      .map(val => ({name: param.name, values: [val]}));
    return result;
  } else {
    const result: VariableWithValues[] =[{name: param.name, values}];
    return result;
  }
}
