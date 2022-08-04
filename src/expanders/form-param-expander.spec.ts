import {URIEncodingEncoder} from '../encoders/uri-encoding-encoder';
import {FormParamExpander} from './form-param-expander';

describe('FormParamExpander', () => {
  const encoder = new URIEncodingEncoder();

  const paramName = 'color';

  const string = 'blue';
  const array = ['blue', 'black', 'brown'];
  const object = {'R': 100, 'G': 200, 'B': 150};
  const unsupported: any = Symbol('unsupported');

  describe('not exploded', () => {
    const explode = false;
    const allowReserved = false;
    const expander = new FormParamExpander({explode, allowReserved}, encoder);

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expandParameter(paramName, param);

      expect(actual)
        .toEqual('');
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expandParameter(paramName, param);

      expect(actual)
        .toEqual('color=');
    });

    it('expands a simple value', () => {
      const actual = expander.expandParameter(paramName, string);

      expect(actual)
        .toEqual('color=blue');
    });

    it('expands an array', () => {
      const actual = expander.expandParameter(paramName, array);

      expect(actual)
        .toEqual('color=blue,black,brown');
    });

    it('expands an object', () => {
      const actual = expander.expandParameter(paramName, object);

      expect(actual)
        .toEqual('color=R,100,G,200,B,150');
    });

    it('expands unsupported', () => {
      const actual = expander.expandParameter(paramName, unsupported);

      expect(actual)
        .toEqual('color=Symbol(unsupported)');

    });

  });

  describe('exploded', () => {
    const explode = true;
    const allowReserved = false;
    const expander = new FormParamExpander({explode, allowReserved}, encoder);

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expandParameter(paramName, param);

      expect(actual)
        .toEqual('');
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expandParameter(paramName, param);

      expect(actual)
        .toEqual('color=');
    });

    it('expands a simple value', () => {
      const actual = expander.expandParameter(paramName, string);

      expect(actual)
        .toEqual('color=blue');
    });

    it('expands an array', () => {
      const actual = expander.expandParameter(paramName, array);

      expect(actual)
        .toEqual('color=blue&color=black&color=brown');
    });

    it('expands an object', () => {
      const actual = expander.expandParameter(paramName, object);

      expect(actual)
        .toEqual('R=100&G=200&B=150');
    });

    it('expands unsupported', () => {
      const actual = expander.expandParameter(paramName, unsupported);

      expect(actual)
        .toEqual('color=Symbol(unsupported)');

    });

  });
});
