import {Param} from '../expander';
import {Formatter} from '../formatter';
import {PrimitivesFormatter} from '../formatters';
import {parseObjectValues} from './parse-object-values';

describe('parseObjectValues', () => {
  const formatter = new PrimitivesFormatter();

  describe('plain', () => {
    const paramFixture: Param<Record<string, unknown>, unknown> = {
      name: 'foo',
      value: {},
      explode: false,
      opts: undefined,
    }

    describe('with empty input', () => {
      it.each([
        true,
        false,
      ])('parses into an empty array (explode: %s)', explode => {
        const param: Param<Record<string, unknown>, unknown> = {
          ...paramFixture,
          value: {},
        }

        const input: Param<Record<string, unknown>, unknown> = {
          ...param,
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
        const param: Param<Record<string, unknown> | null, unknown> = {
          ...paramFixture,
          value: null,
        }

        const input: Param<Record<string, unknown> | null, unknown> = {
          ...param,
          explode,
        }

        const actual = parseObjectValues(input, formatter);

        expect(actual)
          .toEqual([]);
      });
    });

    describe('with one entry', () => {
      const param: Param<Record<string, unknown>, unknown> = {
        ...paramFixture,
        value: {hello: 'world'},
      }

      it.each([
        [true, [{name: 'hello', values: ['world']}]],
        [false, [{name: 'foo', values: ['hello', 'world']}]],
      ])('parses the value into a singleton array (explode: %s)', (explode, expected) => {
        const input: Param<Record<string, unknown>, unknown> = {
          ...param,
          explode,
        }

        const actual = parseObjectValues(input, formatter);

        expect(actual)
          .toEqual(expected);
      });
    });

    describe('with multiple entries', () => {
      const param: Param<Record<string, unknown>, unknown> = {
        ...paramFixture,
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
        ...paramFixture,
        value: {
          foo: 'bar',
          empty: '',
          whatever: 'baz',
          otherEmpty: '',
          fruit: 'banana',
        },
      }

      it.each([
        [
          true,
          [{name: 'foo', values: ['bar']}, {name: 'whatever', values: ['baz']}, {name: 'fruit', values: ['banana']}],
        ],
        [
          false, [{name: 'foo', values: ['foo', 'bar', 'whatever', 'baz', 'fruit', 'banana']}],
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
    const formatter: Formatter = new class implements Formatter<unknown> {
      public formatNested(param: Readonly<Param<unknown, unknown>>, name: string, value: unknown): string {
        return `nest:${name}->${value}<`;
      }

      public formatSimple(param: Readonly<Param<unknown, unknown>>): string {
        return `simple:${param.name}->${param.value}<`;
      }

      public supports(param: Readonly<Param<unknown, unknown>>): boolean {
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
