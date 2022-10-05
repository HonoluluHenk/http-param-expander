import {isNullish} from './is-nullish';

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
