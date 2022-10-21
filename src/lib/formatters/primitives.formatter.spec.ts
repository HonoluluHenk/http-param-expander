// noinspection MagicNumberJS

import {PrimitivesFormatter} from './primitives.formatter';

describe('PrimitivesFormatter', () => {

  const REJECTED_VALUES = [
    Symbol('a Symbol'),
    () => 'a function',
    {foo: 'an object'},
    null,
  ];

  const paramFixture = {
    name: 'ignored',
    // ignored:
    explode: false,
  }

  const converter = new PrimitivesFormatter();

  describe('supports', () => {
    it.each([
      'foo',
      '',
      123,
      0,
      true,
      false,
      BigInt(123),
      BigInt(0),
      undefined,
    ])('accepts: %s', (input) => {
      const actual = converter.supports({
        value: input,
        ...paramFixture,
      });

      expect(actual)
        .toBe(true);
    })

    it.each(REJECTED_VALUES)('rejects: %s', (input) => {
      const actual = converter.supports({
        value: input,
        ...paramFixture,
      });

      expect(actual)
        .toBe(false);
    })
  });

  describe('formatting', () => {

    describe('undefined', () => {
      it('passes through "undefined"', () => {
        const actual = converter.formatSimple({
          value: undefined,
          ...paramFixture,
        });

        expect(actual)
          .toBeUndefined()
      })
    })

    describe('string', () => {
      it('just returns the input', () => {
        const actual = converter.formatSimple({
          value: 'yeah!',
          ...paramFixture,
        });

        expect(actual)
          .toEqual('yeah!')
      })
    })

    describe('number', () => {
      it('formats an integer without groupings', () => {
        const actual = converter.formatSimple({
          value: 123456,
          ...paramFixture,
        });

        expect(actual)
          .toEqual('123456')
      })

      it('formats a large integer in normal notation', () => {
        const actual = converter.formatSimple({
          value: Number.MAX_SAFE_INTEGER,
          ...paramFixture,
        });

        expect(actual)
          .toEqual('9007199254740991')
      })

      it('formats a decimal in an appropriate machine number format', () => {
        const actual = converter.formatSimple({
          value: 0.123456789,
          ...paramFixture,
        });

        expect(actual)
          .toEqual('0.123456789')
      })

    })

    describe('boolean', () => {
      it('formats "true"', () => {
        const actual = converter.formatSimple({
          value: true,
          ...paramFixture,
        });

        expect(actual)
          .toEqual('true')
      })
      it('formats "false"', () => {
        const actual = converter.formatSimple({
          value: false,
          ...paramFixture,
        });

        expect(actual)
          .toEqual('false')
      })
    });

    describe('bigint', () => {
      it('formats a BigInt', () => {
        const actual = converter.formatSimple({
          value: BigInt('100000000000000000000000000000000'),
          ...paramFixture,
        });

        expect(actual)
          .toEqual('100000000000000000000000000000000')
      })

    })

    describe('illegal values', () => {
      it.each(REJECTED_VALUES)('throws for unsupported values: %s', input => {
        expect(() => converter.formatSimple({
          value: input,
          ...paramFixture,
        })).toThrow('not supported')
      })

    })
  })

});
