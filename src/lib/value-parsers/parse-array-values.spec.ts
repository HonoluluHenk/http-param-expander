import {Param} from '../expander';
import {Formatter} from '../formatter';
import {PrimitivesFormatter} from '../formatters';
import {parseArrayValues} from './parse-array-values';

describe('parseArrayValues', () => {
  const formatter = new PrimitivesFormatter();

  describe('plain', () => {
    const paramFixture: Param<string[], unknown> = {
      name: 'foo',
      value: [],
      explode: false,
      opts: undefined,
    }

    describe('with empty input', () => {
      const param: Param<string[], unknown> = {
        ...paramFixture,
        value: [],
      }

      it.each([
        true,
        false,
      ])('parses into an empty array (explode: %s)', explode => {
        const input: Param<string[], unknown> = {
          ...param,
          explode,
        }

        const actual = parseArrayValues(input, formatter);

        expect(actual)
          .toEqual([]);
      });
    });

    describe('with one entry', () => {
      const param: Param<string[], unknown> = {
        ...paramFixture,
        value: ['bar'],
      }

      it.each([
        true,
        false,
      ])('parses the value into a singleton array (explode: %s)', explode => {
        const input: Param<string[], unknown> = {
          ...param,
          explode,
        }

        const actual = parseArrayValues(input, formatter);

        expect(actual)
          .toEqual([
            {
              name: 'foo',
              values: ['bar'],
            },
          ]);
      });
    });

    describe('with multiple entries', () => {
      const param: Param<string[], unknown> = {
        ...paramFixture,
        value: ['bar', 'baz', 'banana'],
      }

      it.each([
        [
          true, [{name: 'foo', values: ['bar']}, {name: 'foo', values: ['baz']}, {name: 'foo', values: ['banana']}],
        ],
        [
          false, [{name: 'foo', values: ['bar', 'baz', 'banana']}],
        ],
      ])('parses the values into an array in the same order (explode: %s)', (explode, expected) => {
        const input: Param<string[], unknown> = {
          ...param,
          explode,
        }

        const actual = parseArrayValues(input, formatter);

        expect(actual)
          .toEqual(expected);
      });
    })

    describe('with undef values', () => {
      const param: Param<(string | null | undefined)[], unknown> = {
        ...paramFixture,
        value: ['bar', '', 'baz', null, 'banana', undefined, 'end'],
      }

      it.each([
        [
          true, [
          {name: 'foo', values: ['bar']},
          {name: 'foo', values: ['']},
          {name: 'foo', values: ['baz']},
          {name: 'foo', values: ['banana']},
          {name: 'foo', values: ['end']},
        ],
        ],
        [
          false, [
          {name: 'foo', values: ['bar', '', 'baz', 'banana', 'end']},
        ],
        ],
      ])('skips undef values', (explode, expected) => {
        const input: Param<(string | null | undefined)[], unknown> = {
          ...param,
          explode,
        }

        const actual = parseArrayValues(input, formatter);

        expect(actual)
          .toEqual(expected);
      });
    });

  });

  describe('with custom formatter', () => {
    const formatter: Formatter = new class implements Formatter {
      public formatNested(param: Param<unknown, unknown>, name: string, value: unknown): string {
        return `nest:${name}->${value}<`;
      }

      public formatSimple(param: Param<unknown, unknown>): string {
        return `simple:${param.name}->${param.value}<`;
      }

      public supports(param: Param<unknown, unknown>): boolean {
        return param.name === 'ok';
      }
    }

    const param: Param<string[], unknown> = {
      name: 'ok',
      value: ['foo', 'bar'],
      explode: false,
      opts: undefined,
    }

    it.each([
      [
        true, [{name: 'ok', values: ['nest:ok->foo<']}, {name: 'ok', values: ['nest:ok->bar<']}],
      ],
      [
        false, [{name: 'ok', values: ['nest:ok->foo<', 'nest:ok->bar<']}],
      ],
    ])('calls the formatter', (explode, expected) => {
      const input: Param<string[], unknown> = {
        ...param,
        explode,
      }

      const actual = parseArrayValues(input, formatter);

      expect(actual)
        .toEqual(expected);

    })
  });

});
