import {Encoder} from '../encoder';
import {isNullish, isUndefArray, VariableWithValues} from '../util';

export function formatVariablesWithValues(
  vars: VariableWithValues[],
  named: boolean,
  sep: string,
  ifemp: string,
  encoder: Encoder,
): string {

  const result = vars
    .map(removeNullishValues)
    .filter(onlyVariablesWithValues)
    .map(v => formatVariable(v, named, ifemp, encoder))
    .join(sep);

  return result;
}

function removeNullishValues(variable: VariableWithValues): VariableWithValues {
  return {
    name: variable.name,
    values: variable.values
      .filter(v => !isNullish(v)),
  }
}

function onlyVariablesWithValues(variable: VariableWithValues): boolean {
  return !isUndefArray(variable.values);
}

function formatVariable(
  param: VariableWithValues,
  named: boolean,
  ifemp: string,
  encoder: Encoder,
): string {

  const joinedValues = param.values
    .map(v => encoder.encode(v))
    .join(',');

  if (named) {
    const varName = encoder.encode(param.name);
    if (joinedValues) {
      return varName + '=' + joinedValues;
    } else {
      return varName + ifemp;
    }
  } else {
    return joinedValues;
  }
}

