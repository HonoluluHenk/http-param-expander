import {Param} from '../expander';
import {VariableWithValues} from '../util';

export function parseUnsupportedValues(param: Param<unknown, unknown>): VariableWithValues[] {
  const result = [
    {
      name: param.name,
      values: [String(param.value)],
    },
  ];

  return result;
}
