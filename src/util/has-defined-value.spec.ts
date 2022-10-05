import {hasDefinedValue} from './has-defined-value';

describe('hasDefinedValue', function () {
  it('accepts a non-empty string', () => {
    const actual = hasDefinedValue('asdf');

    expect(actual)
      .toBe(true);
  })

  it('rejects an empty string', () => {
    const actual = hasDefinedValue('');

    expect(actual)
      .toBe(false);
  })

  it('rejects null', () => {
    const actual = hasDefinedValue(null);

    expect(actual)
      .toBe(false);
  })

  it('rejects undefined', () => {
    const actual = hasDefinedValue(undefined);

    expect(actual)
      .toBe(false);
  })
});
