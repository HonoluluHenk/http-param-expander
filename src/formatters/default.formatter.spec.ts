import {Param} from '../expander';
import {DefaultFormatter} from './default.formatter';

describe('DefaultFormatter', () => {
  const formatter = new DefaultFormatter();
  const paramFixture: Param<string, unknown> = {
    name: 'foo',
    value: '',
    explode: false,
  }

  it.each([
    ['number', 123],
    ['number', 0],
    ['number', -1],
    ['boolean', true],
    ['boolean', false],
    ['BigInt', BigInt('12345')],
    ['Symbol', Symbol('Hello world')],
    ['Object', {}],
    ['Function', () => 'function'],
  ])('rejects: %s', (desc, value) => {
    const actual = formatter.supports({
      ...paramFixture,
      value,
    });

    expect(actual)
      .toBe(false);
  })

  it.each([
    'yeah!',
    '',
  ])('supports strings: %s', input => {
    expect(formatter.supports({
      ...paramFixture,
      value: input,
    }))
      .toBe(true)
  })

  it('formats simple strings', () => {
    expect(formatter.formatSimple({
      ...paramFixture,
      value: 'Hello World',
    }))
      .toEqual('Hello World');
  })

  it('formats nested simple strings', () => {
    expect(formatter.formatNested({
        ...paramFixture,
      },
      'ignored',
      'whoopdeedoo',
    ))
      .toEqual('whoopdeedoo');
  })

});
