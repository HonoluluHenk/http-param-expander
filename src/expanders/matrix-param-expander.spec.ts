import {MatrixParamExpander} from './matrix-param-expander';
import {URIComponentEncoder} from '../encoders/uri-component-encoder';

describe('MatrixParamExpander', () => {
  const encoder = new URIComponentEncoder();
  const expander = new MatrixParamExpander(encoder);
  const name = 'color';

  const string = 'blue';
  const array = ['blue', 'black', 'brown'];
  const object = {'R': 100, 'G': 200, 'B': 150};
  const unsupported: any = Symbol('unsupported');

  describe('not exploded', () => {
    const explode = false;

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expand({name, value: param, explode});

      expect(actual)
        .toEqual('');
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expand({name, value: param, explode});

      expect(actual)
        .toEqual(';color');
    });

    it('expands a simple value', () => {
      const actual = expander.expand({name, value: string, explode});

      expect(actual)
        .toEqual(';color=blue');
    });

    it('expands an array', () => {
      const actual = expander.expand({name, value: array, explode});

      expect(actual)
        .toEqual(';color=blue,black,brown');
    });

    it('expands an object', () => {
      const actual = expander.expand({name, value: object, explode});

      expect(actual)
        .toEqual(';color=R,100,G,200,B,150');
    });

    it('expands unsupported', () => {
      const actual = expander.expand({name, value: unsupported, explode});

      expect(actual)
        .toEqual(';color=Symbol(unsupported)');

    });

  });

  describe('exploded', () => {
    const explode = true;

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expand({name, value: param, explode});

      expect(actual)
        .toEqual('');
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expand({name, value: param, explode});

      expect(actual)
        .toEqual(';color');
    });

    it('expands a simple value', () => {
      const actual = expander.expand({name, value: string, explode});

      expect(actual)
        .toEqual(';color=blue');
    });

    it('expands an array', () => {
      const actual = expander.expand({name, value: array, explode});

      expect(actual)
        .toEqual(';color=blue;color=black;color=brown');
    });

    it('expands an object', () => {
      const actual = expander.expand({name, value: object, explode});

      expect(actual)
        .toEqual(';R=100;G=200;B=150');
    });

    it('expands unsupported', () => {
      const actual = expander.expand({name, value: unsupported, explode});

      expect(actual)
        .toEqual(';color=Symbol(unsupported)');

    });

  });
});
