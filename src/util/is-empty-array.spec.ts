import {isEmptyArray} from './is-empty-array';

describe('isEmptyArray', () => {
  it('accepts an empty array', () => {
    expect(isEmptyArray([]))
      .toBe(true);
  })
  it('rejects a non-empty array', () => {
    expect(isEmptyArray([0, 1]))
      .toBe(false);
  })
})
