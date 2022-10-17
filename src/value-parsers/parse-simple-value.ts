import {Param} from '../expander';
import {Formatter} from '../formatter';
import {hasDefinedValue, VariableWithValues} from '../util';
import {assertParamSupported} from './assert-param-supported';

export function parseSimpleValue(param: Param<unknown, unknown>, formatter: Formatter): VariableWithValues[] {
  assertParamSupported(param, formatter);

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
