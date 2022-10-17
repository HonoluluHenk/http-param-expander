import {Encoder} from '../encoder';
import {URIComponentEncoder} from '../encoders';
import {VariableWithValues} from '../util';
import {formatVariablesWithValues} from './format-variables-with-values';

describe('formatVariablesWithValues', function () {
  const encoder: Encoder = new URIComponentEncoder();

  const named = true;
  const sep = ',';
  const ifemp = '=';

  function format(vars: VariableWithValues[], opts?: {
    named?: boolean,
    sep?: string,
    ifemp?: string,
  }): string {
    return formatVariablesWithValues(
      vars,
      opts?.named ?? named,
      opts?.sep ?? sep,
      opts?.ifemp ?? ifemp,
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
      .toEqual('hello=world');
  })

  it('formats a named entry with multiple values separated by listEntrySeparator', () => {
    const actual = format([
      {name: 'hello', values: ['henk', 'ada']},
    ]);

    expect(actual)
      .toEqual('hello=henk,ada');
  })

  it('formats a named entry with one empty value appending "ifmep"', () => {
    const actual = format([
        {name: 'hello', values: ['']},
      ],
      {ifemp: 'append-if-empty'},
    );

    expect(actual)
      .toEqual('helloappend-if-empty');
  })

  it('joins multiple variables using "sep"', () => {
    const actual = format([
        {name: 'hello', values: ['world']},
        {name: 'it', values: ['works', 'like', 'a', 'charm']},
      ],
      {sep: '|'});

    expect(actual)
      .toEqual('hello=world|it=works,like,a,charm');
  })

  it('includes undefined values', () => {
    const actual = format([
      {name: 'it', values: ['includes', '', 'empty', '', 'values']},
    ]);

    expect(actual)
      .toEqual('it=includes,,empty,,values');
  })

  it('encodes name and value', () => {
    const actual = format([
      {name: 'foo/bar', values: ['20%']},
    ]);

    expect(actual)
      .toEqual('foo%2Fbar=20%25');
  })

});
