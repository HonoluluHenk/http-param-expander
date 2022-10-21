import {isInstanceOfObject, isPlain} from './plain';

describe('is-plain', () => {
  describe('isInstanceOfObject', () => {
    it.each([
      undefined,
      null,
    ])('rejects nullish: %s', input => {
      expect(isInstanceOfObject(input))
        .toBe(false);
    })

    it.each([
      'hello',
      '',
      123,
      0,
      -1,
      true,
      false,
      BigInt('12345'),
      Symbol('Hello world'),
    ])('rejects non-object value: %s', input => {
      expect(isInstanceOfObject(input))
        .toBe(false);
    });

    it.each([
      {},
      {hello: 'world'},
    ])('accepts plain objects: %s', input => {
      expect(isInstanceOfObject(input))
        .toBe(true);
    })

    it('accepts class with matching clazz param', () => {
      expect(isInstanceOfObject(new Date(), Date))
        .toBe(true);
    })

    it('rejects class without clazz param', () => {
      expect(isInstanceOfObject(new Date()))
        .toBe(false);
    })

    it('rejects class with differing clazz param', () => {
      class Foo {
      }

      expect(isInstanceOfObject(new Date(), Foo))
        .toBe(false);
    })
  });

  describe('isPlain', () => {
    [
      ['string', 'hello'],
      ['string', ''],
      ['number', 123],
      ['number', 0],
      ['number', -1],
      ['boolean', true],
      ['boolean', false],
      ['BigInt', BigInt('12345')],
      ['Symbol', Symbol('Hello world')],
    ].forEach(([desc, param]) =>
      it(`returns true for primitive ${String(desc)}: ${String(param)}`, () => {
        expect(isPlain(param))
          .toBe(true);
      }),
    );

    [
      ['undefined', undefined],
      ['null', null],
      ['plain object (empty)', {}],
      ['plain object (with values)', {asdf: 'hello', fdsa: 'world'}],
      ['function', () => -1],
      ['Class-Instances', new Date()],
    ].forEach(([desc, param]) =>
      it(`returns false for ${desc}: ${param}`, () => {
        expect(isPlain(param))
          .toBe(false);
      }),
    );
  })

});

