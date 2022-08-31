import {AbstractExpander} from './abstract-expander';

export type assertion = (actual: unknown) => void;

export function testSuite(
  expanderFactory: () => AbstractExpander,
  values: {
    paramName: string,
    simple: string;
    array: string[];
    object: Record<string, unknown>;
    unsupported: unknown;
  },
  assertions: {
    notExploded: {
      onNullish: assertion,
      onEmptyValue: assertion,
      onSimpleValue: assertion,
      onArray: assertion,
      onObject: assertion,
      onUnsupported: assertion,
    },
    exploded: {
      onNullish: assertion,
      onEmptyValue: assertion,
      onSimpleValue: assertion,
      onArray: assertion,
      onObject: assertion,
      onUnsupported: assertion,
    }
  },
) {

  const expander = expanderFactory();

  describe('not exploded', () => {
    const explode = false;

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expand({name: values.paramName, value: param, explode});

      assertions.notExploded.onNullish(actual);
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expand({name: values.paramName, value: param, explode});

      assertions.notExploded.onEmptyValue(actual);
    });

    it('expands a simple value', () => {
      const actual = expander.expand({name: values.paramName, value: values.simple, explode});

      assertions.notExploded.onSimpleValue(actual);
    });

    it('expands an array', () => {
      const actual = expander.expand({name: values.paramName, value: values.array, explode});

      assertions.notExploded.onArray(actual);
    });

    it('expands an object', () => {
      const actual = expander.expand({name: values.paramName, value: values.object, explode});

      assertions.notExploded.onObject(actual);
    });

    it('expands unsupported', () => {
      const actual = expander.expand({name: values.paramName, value: values.unsupported, explode});

      assertions.notExploded.onUnsupported(actual);

    });

  });

  describe('exploded', () => {
    const explode = true;

    it.each([
      null,
      undefined,
    ])('returns nothing for nullish: %s', (param) => {
      const actual = expander.expand({name: values.paramName, value: param, explode});

      assertions.exploded.onNullish(actual);
    });

    it.each([
      '',
      [],
      {},
    ])('expands to just the parameter name on empty value: %s', (param) => {
      const actual = expander.expand({name: values.paramName, value: param, explode});

      assertions.exploded.onEmptyValue(actual);
    });

    it('expands a simple value', () => {
      const actual = expander.expand({name: values.paramName, value: values.simple, explode});

      assertions.exploded.onSimpleValue(actual);
    });

    it('expands an array', () => {
      const actual = expander.expand({name: values.paramName, value: values.array, explode});

      assertions.exploded.onArray(actual);
    });

    it('expands an object', () => {
      const actual = expander.expand({name: values.paramName, value: values.object, explode});

      assertions.exploded.onObject(actual);
    });

    it('expands unsupported', () => {
      const actual = expander.expand({name: values.paramName, value: values.unsupported, explode});

      assertions.exploded.onUnsupported(actual);

    });

  });
}
