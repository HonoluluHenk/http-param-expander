import {Param} from '../expander';
import {Formatter} from '../formatter';
import {StringFormatter} from '../formatters';
import {parseObjectValues} from './parse-object-values';

describe('parseObjectValues', () => {
  const formatter = new StringFormatter();

  describe('plain', () => {
    describe('with empty input', () => {
      it.each([
        true,
        false,
      ])('parses into an empty array (explode: %s)', explode => {
        const input: Param<Record<string, unknown>, unknown> = {
          name: 'foo',
          value: {},
          explode,
        }

        const actual = parseObjectValues(input, formatter);

        expect(actual)
          .toEqual([]);
      });

      it.each([
        true,
        false,
      ])('parses into an empty array (explode: %s)', explode => {
        const input: Param<Record<string, unknown> | null, unknown> = {
          name: 'foo',
          value: null,
          explode,
        }

        const actual = parseObjectValues(input, formatter);

        expect(actual)
          .toEqual([]);
      });
    });

    describe('with one entry', () => {
      it.each([
        [true, [{name: 'hello', values: ['world']}]],
        [false, [{name: 'foo', values: ['hello', 'world']}]],
      ])('parses the value into a singleton array (explode: %s)', (explode, expected) => {
        const input: Param<Record<string, unknown>, unknown> = {
          name: 'foo',
          value: {hello: 'world'},
          explode,
        }

        const actual = parseObjectValues(input, formatter);

        expect(actual)
          .toEqual(expected);
      });
    });

    describe('with multiple entries', () => {
      const param: Param<Record<string, unknown>, unknown> = {
        name: 'foo',
        explode: false,
        value: {hello: 'world', foo: 'bar', Ada: 'Lovelace'},
      }

      it.each([
        [
          true,
          [{name: 'hello', values: ['world']}, {name: 'foo', values: ['bar']}, {name: 'Ada', values: ['Lovelace']}],
        ],
        [
          false, [{name: 'foo', values: ['hello', 'world', 'foo', 'bar', 'Ada', 'Lovelace']}],
        ],
      ])('parses the values into an array in the same order (explode: %s)', (explode, expected) => {
        const input: Param<Record<string, unknown>, unknown> = {
          ...param,
          explode,
        }

        const actual = parseObjectValues(input, formatter);

        expect(actual)
          .toEqual(expected);
      });
    })

    describe('with undef values', () => {
      const param: Param<Record<string, unknown>, unknown> = {
        name: 'the-name',
        explode: false,
        value: {
          foo: 'bar',
          empty: '',
          whatever: 'baz',
          'undefined': undefined,
          'null': null,
          fruit: 'banana',
        },
      }

      it.each([
        [
          true, [
          {name: 'foo', values: ['bar']},
          {name: 'empty', values: ['']},
          {name: 'whatever', values: ['baz']},
          {name: 'fruit', values: ['banana']},
        ],
        ],
        [
          false, [
          {name: 'the-name', values: ['foo', 'bar', 'empty', '', 'whatever', 'baz', 'fruit', 'banana']},
        ],
        ],
      ])('skips undef values (explode: %s)', (explode, expected) => {
        const input: Param<Record<string, unknown>, unknown> = {
          ...param,
          explode,
        }

        const actual = parseObjectValues(input, formatter);

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

    const param: Param<Record<string, unknown>, unknown> = {
      name: 'ok',
      value: {
        'hello': 'world',
        'foo': 'bar',
      },
      explode: false,
      opts: undefined,
    }

    it.each([
      [
        true, [{name: 'hello', values: ['nest:hello->world<']}, {name: 'foo', values: ['nest:foo->bar<']}],
      ],
      [
        false, [{name: 'ok', values: ['hello', 'nest:hello->world<', 'foo', 'nest:foo->bar<']}],
      ],
    ])('calls the formatter (on values but not names) (explode: %s)', (explode, expected) => {
      const input: Param<Record<string, unknown>, unknown> = {
        ...param,
        explode,
      }

      const actual = parseObjectValues(input, formatter);

      expect(actual)
        .toEqual(expected);

    })
  });

});
