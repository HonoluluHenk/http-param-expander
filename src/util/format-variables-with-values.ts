import {Encoder} from '../encoder';
import {isEmptyArray} from './is-empty-array';
import {join} from './join';
import {VariableWithValues} from './variable-with-values';

export type VariableNameFormat = 'prefix' | 'skip';

export function formatVariablesWithValues(
  vars: VariableWithValues[],
  variableNameFormat: VariableNameFormat,
  variableSeparator: string,
  listEntrySeparator: string,
  assignmentSeparator: string,
  encoder: Encoder,
): string {

  const format = formatFor(variableNameFormat, variableSeparator, listEntrySeparator, assignmentSeparator, encoder);

  const result = vars
    .filter(({values}) => !isEmptyArray(values))
    .map(format)
    .join('');

  return result;
}

function formatFor(
  variableNameFormat: VariableNameFormat,
  variableSeparator: string,
  listEntrySeparator: string,
  assignmentSeparator: string,
  encoder: Encoder,
): (param: VariableWithValues) => string {
  return function format(param: { name: string, values: Array<string> }): string {
    const varName = variableNameFormat === 'prefix'
      ? encoder.encode(param.name)
      : '';

    const joinedValues = param.values
      // FIXME: remove this filter from parse-*-values?
      // .filter(v => hasDefinedValue(v))
      .map(v => encoder.encode(v))
      .join(listEntrySeparator);

    const variable = join(assignmentSeparator, varName, joinedValues);

    return `${variableSeparator}${variable}`;
  }

}

