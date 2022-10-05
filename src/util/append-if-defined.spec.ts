import {appendIfDefined} from './append-if-defined';

describe('appendIfDefined', () => {

  it('appends if the second value is non-empty', () => {
    const actual = appendIfDefined('=', '123');

    expect(actual)
      .toEqual('=123');
  })

  it.each([
    undefined,
    null,
    '',
  ])('returns a blank string for not defined second parameter: %s', input => {
    const actual = appendIfDefined('=', input);

    expect(actual)
      .toEqual('');
  })

});
