import {Param} from '../expander';
import {Formatter} from '../formatter';
import {hasDefinedValue, VariableWithValues} from '../util';

export function parseSimpleValue(param: Param<unknown, unknown>, formatter: Formatter): VariableWithValues[] {
  const formatted = formatter.formatSimple(param);

  if (!hasDefinedValue(formatted)) {
    return [];
  }

  const result = [
    {
      name: param.name,
      values: [formatted],
    },
  ];

  return result
}
