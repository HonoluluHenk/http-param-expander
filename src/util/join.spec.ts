import {join} from './join';

describe('join', () => {
  it('returns an empty string for empty input', () => {
    const actual = join(',');

    expect(actual)
      .toEqual('');
  })

  it('joins one value', () => {
    const actual = join(',', 'hello');

    expect(actual)
      .toEqual('hello');
  })

  it('joins two values', () => {
    const actual = join(',', 'hello', 'world');

    expect(actual)
      .toEqual('hello,world');
  })

  it('joins multiple values', () => {
    const actual = join(',', '1', '2', '3', '4', '5');

    expect(actual)
      .toEqual('1,2,3,4,5');
  })

  it('joins only entries with defined value', () => {
    const actual = join(',', '', 'a', '', 'b', '');

    expect(actual)
      .toEqual('a,b');
  })

  it('foo', () => {
    const actual = join(',');

    expect(actual)
      .toEqual('');
  })

});
