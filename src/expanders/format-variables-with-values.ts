import {Encoder} from '../encoder';
import {isNullish, VariableWithValues} from '../util';

export function formatVariablesWithValues(
  vars: VariableWithValues[],
  named: boolean,
  sep: string,
  ifemp: string,
  encoder: Encoder,
): string {

  const result = vars
    .map(removeNullishValuesFromVariable)
    .filter(onlyVariablesWithValues)
    .map(v => formatVariable(v, named, ifemp, encoder))
    .join(sep);

  return result;
}

function removeNullishValuesFromVariable(variable: VariableWithValues): VariableWithValues {
  return {
    name: variable.name,
    values: variable.values
      .filter(v => !isNullish(v)),
  }
}

function onlyVariablesWithValues(variable: VariableWithValues): boolean {
  return variable.values.length !== 0;
}

function formatVariable(
  param: VariableWithValues,
  named: boolean,
  ifemp: string,
  encoder: Encoder,
): string {

  const varValue = param.values
    .map(v => encoder.encode(v))
    .join(',');

  if (named) {
    const varName = encoder.encode(param.name);
    return formatNamed(varName, varValue, ifemp);
  } else {
    return varValue;
  }
}

function formatNamed(name: string, value: string, ifemp: string) {
  if (value) {
    return `${name}=${value}`;
  } else {
    return `${name}${ifemp}`;
  }
}
