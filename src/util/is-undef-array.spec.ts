import {isUndefArray} from './is-undef-array';

describe('isUndefArray', () => {
  it('accepts an empty array', () => {
    expect(isUndefArray([]))
      .toBe(true);
  })

  it('rejects a non-empty array', () => {
    expect(isUndefArray([0, 1]))
      .toBe(false);
  })
});
