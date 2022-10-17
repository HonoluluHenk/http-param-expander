import {checkNonNullish, isNullish} from './is-nullish';

describe('is-nullish', () => {

  describe('isNullish', () => {
    it('accepts undefined', () => {
      expect(isNullish(undefined))
        .toBe(true);
    })

    it('accepts null', () => {
      expect(isNullish(null))
        .toBe(true);
    })

    it.each([
      '',
      'asdf',
      0,
      1,
      NaN,
      Number.MAX_VALUE,
      Number.MIN_VALUE,
      true,
      false,
      [],
      ['asdf'],
      {},
      {foo: 'bar'},
      BigInt('1'),
      () => 'function',
      Symbol('symbol'),
    ])('rejects everything else: %s', input => {
      expect(isNullish(input))
        .toBe(false);
    })

  })

  describe('checkNonNullish', () => {
    it('rejects nullish values', () => {
      expect(() => checkNonNullish(null))
        .toThrow('Value is nullish: null');

      expect(() => checkNonNullish(undefined))
        .toThrow('Value is nullish: undefined');
    })

    it.each([
      0,
      1,
      -1,
      NaN,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      '',
      'asdf',
      String.fromCharCode(0),
      Symbol(),
      {},
      {'foo': 'bar'},
      new Date(),
      [],
      ['asdf'],
      BigInt('0'),
      true,
      false,
      () => 'a function',
    ])('Accepts Non-Nullish value: %p', input => {
      expect(() => checkNonNullish(input))
        .not.toThrow();
    })
  });

});
