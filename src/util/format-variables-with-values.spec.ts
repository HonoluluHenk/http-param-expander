import {Encoder} from '../encoder';
import {URIComponentEncoder} from '../encoders/uri-component-encoder';
import {formatVariablesWithValues} from './format-variables-with-values';
import {VariableWithValues} from './variable-with-values';

describe('formatVariablesWithValues', function () {
  const variableSeparator = ';';
  const listEntrySeparator = ',';
  const assignmentSeparator = '=';

  const encoder: Encoder = new URIComponentEncoder();

  function format(vars: VariableWithValues[]): string {
    return formatVariablesWithValues(
      vars,
      variableSeparator,
      listEntrySeparator,
      assignmentSeparator,
      encoder,
    );
  }

  it('formats an empty array to the empty string', () => {
    const actual = format([]);

    expect(actual)
      .toEqual('');
  });

  it('formats a named entry with no values to the empty string', () => {
    const actual = format([
      {name: 'hello', values: []},
    ]);

    expect(actual)
      .toEqual('');
  });

  it('formats a named entry with one value', () => {
    const actual = format([
      {name: 'hello', values: ['world']},
    ]);

    expect(actual)
      .toEqual(';hello=world');
  })

  it('formats a named entry with multiple values separated by listEntrySeparator', () => {
    const actual = format([
      {name: 'hello', values: ['henk', 'ada']},
    ]);

    expect(actual)
      .toEqual(';hello=henk,ada');
  })

  it('formats a named entry with one empty value to just the name', () => {
    const actual = format([
      {name: 'hello', values: ['']},
    ]);

    expect(actual)
      .toEqual(';hello');
  })

  it('joins multiple variables', () => {
    const actual = format([
      {name: 'hello', values: ['world']},
      {name: 'it', values: ['works', 'like', 'a', 'charm']},
    ]);

    expect(actual)
      .toEqual(';hello=world;it=works,like,a,charm');
  })

  it('includes undefined values', () => {
    const actual = format([
      {name: 'it', values: ['includes', '', 'empty', '', 'values']},
    ]);

    expect(actual)
      .toEqual(';it=includes,,empty,,values');
  })

  it('encodes name and value', () => {
    const actual = format([
      {name: 'foo/bar', values: ['20%']},
    ]);

    expect(actual)
      .toEqual(';foo%2Fbar=20%25');
  })

});
