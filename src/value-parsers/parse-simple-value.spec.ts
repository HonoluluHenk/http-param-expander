import {Param} from '../expander';
import {Formatter} from '../formatter';
import {PrimitivesFormatter} from '../formatters';
import {parseSimpleValue} from './parse-simple-value';

describe('parse-simple-vaplue', () => {
  // PrimitivesFormatter supports undef values (e.g.: undefined)
  const formatter = new PrimitivesFormatter();

  const paramFixture: Param<unknown, undefined> = {
    name: 'hello',
    value: undefined,
    explode: false,
    opts: undefined,
  }

  class FixtureFormatter implements Formatter {
    public supports(_param: Readonly<Param<unknown, unknown>>): boolean {
      return true;
    }

    public formatSimple(param: Readonly<Param<unknown, unknown>>): string | null | undefined {
      return `formatted: ${String(param.value)}`;
    }

    public formatNested(
      _param: Readonly<Param<unknown, unknown>>,
      _name: string,
      _value: unknown
    ): string | null | undefined {
      throw Error('not implemented');
    }

  }

  describe('with undef value', () => {
    const param: Param<unknown, undefined> = {
      ...paramFixture,
      value: undefined,
    }

    it('returns an empty array', () => {
      const actual = parseSimpleValue(param, formatter);

      expect(actual)
        .toEqual([]);
    })

    it('calls the formatter', () => {
      const actual = parseSimpleValue(param, new FixtureFormatter());

      expect(actual)
        .toEqual([
          {
            name: 'hello',
            values: ['formatted: undefined'],
          },
        ])
    })
  });

  describe('with defined value', () => {
    const param: Param<unknown, undefined> = {
      ...paramFixture,
      value: 'world',
    }

    it('returns an array with the value', () => {
      const actual = parseSimpleValue(param, formatter);

      expect(actual)
        .toEqual([
          {
            name: 'hello',
            values: ['world'],
          },
        ])
    })


    it('calls the formatter', () => {
      const actual = parseSimpleValue(param, new FixtureFormatter());

      expect(actual)
        .toEqual([
          {
            name: 'hello',
            values: ['formatted: world'],
          },
        ])
    })
  });

});
