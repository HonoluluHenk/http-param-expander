import {BasicExpander} from './basic-expander';

// noinspection HttpUrlsUsage
export const TestFixture = {
  count: ['one', 'two', 'three'],
  dom: ['example', 'com'],
  dub: 'me/too',
  hello: 'Hello World!',
  half: '50%',
  var: 'value',
  who: 'fred',
  base: 'http://example.com/home/',
  path: '/foo/bar',
  list: ['red', 'green', 'blue'],
  keys: {semi: ';', dot: '.', comma: ','},
  v: '6',
  x: '1024',
  y: '768',
  empty: '',
  empty_keys: {},
  undefNull: null,
  undefUndefined: undefined,
} as const;
export type FixtureName = keyof typeof TestFixture;

export interface Opts {
  enableTestingFormatter: boolean
}

export function testSuite(
  expanderFactory: () => BasicExpander<Opts>,
  values: {
    paramName: string,
    simple: unknown;
    array: unknown[];
    arrayWithEmpties: unknown[];
    object: Record<string | number | symbol, unknown>;
    objectWithEmpties: Record<string | number | symbol, unknown>;
    unsupported: unknown;
  },
  expectations: {
    nullish: {
      onNullishExpect: string,
    }
    simple: {
      onEmptyValueExpect: string,
      onSimpleValueExpect: string,
    }
    array: {
      plain: {
        onEmptyArrayExpect: string,
        onArrayExpect: string,
        onArrayWithEmptiesExpect: string,
      },
      exploded: {
        onEmptyArrayExpect: string,
        onArrayExpect: string,
        onArrayWithEmptiesExpect: string,
      }
    }
    object: {
      plain: {
        onEmptyObjectExpect: string,
        onObjectExpect: string,
        onObjectWithEmptiesExpect: string,
      },
      exploded: {
        onEmptyObjectExpect: string,
        onObjectExpect: string,
        onObjectWithEmptiesExpect: string,
      }
    }
    unsupported: {
      onUnsupportedExpect: string,
    }
  },
) {

  const expander = expanderFactory();

  describe('nullish', () => {
    const ignored = false;

    it.each([
      null,
      undefined,
    ])('expands nullish %s to the empty string', input => {
      const actual = expander.expand({name: values.paramName, value: input, explode: ignored});

      expect(actual)
        .toEqual(expectations.nullish.onNullishExpect);
    });
  });

  describe('simple', () => {
    const ignored = false;

    it(`expands the empty simple value to '${expectations.simple.onEmptyValueExpect}'`, () => {
      const actual = expander.expand({name: values.paramName, value: '', explode: ignored});

      expect(actual)
        .toEqual(expectations.simple.onEmptyValueExpect);
    });

    it(`expands the simple value ${values.simple} to ${expectations.simple.onSimpleValueExpect}`, () => {
      const actual = expander.expand({name: values.paramName, value: values.simple, explode: ignored});

      expect(actual)
        .toEqual(expectations.simple.onSimpleValueExpect);
    });

  });

  describe('array', () => {
    describe('plain', () => {
      const explode = false;

      it(`expands the empty array to ${expectations.array.plain.onEmptyArrayExpect}`, () => {
        const actual = expander.expand({name: values.paramName, value: [], explode});

        expect(actual)
          .toEqual(expectations.array.plain.onEmptyArrayExpect);
      });

      it(`expands the array ${values.array} to ${expectations.array.plain.onArrayExpect}`, () => {
        const actual = expander.expand({name: values.paramName, value: values.array, explode});

        expect(actual)
          .toEqual(expectations.array.plain.onArrayExpect);
      });

      it(`expands an array containing empties ${values.arrayWithEmpties} to ${expectations.array.plain.onArrayWithEmptiesExpect}`,
        () => {
          const actual = expander.expand({name: values.paramName, value: values.arrayWithEmpties, explode});

          expect(actual)
            .toEqual(expectations.array.plain.onArrayWithEmptiesExpect);
        });
    });

    describe('exploded', () => {
      const explode = true;

      it(`expands the empty array to ${expectations.array.exploded.onEmptyArrayExpect}`, () => {
        const actual = expander.expand({name: values.paramName, value: [], explode});

        expect(actual)
          .toEqual(expectations.array.exploded.onEmptyArrayExpect);
      });

      it(`expands the array ${values.array} to ${expectations.array.exploded.onArrayExpect}`, () => {
        const actual = expander.expand({name: values.paramName, value: values.array, explode});

        expect(actual)
          .toEqual(expectations.array.exploded.onArrayExpect);
      });

      it(`expands array containing empties ${values.arrayWithEmpties} to ${expectations.array.exploded.onArrayWithEmptiesExpect}`,
        () => {
          const actual = expander.expand({name: values.paramName, value: values.arrayWithEmpties, explode});

          expect(actual)
            .toEqual(expectations.array.exploded.onArrayWithEmptiesExpect);
        });

    });
  });

  describe('object', () => {
    describe('plain', () => {
      const explode = false;

      it('expands an empty object', () => {
        const actual = expander.expand({name: values.paramName, value: {}, explode});

        expect(actual)
          .toEqual(expectations.object.plain.onEmptyObjectExpect);
      });

      it(`expands the object ${JSON.stringify(values.object)} to ${expectations.object.plain.onObjectExpect}`, () => {
        const actual = expander.expand({name: values.paramName, value: values.object, explode});

        expect(actual)
          .toEqual(expectations.object.plain.onObjectExpect);
      });

      it(`expands the object with empties ${JSON.stringify(values.objectWithEmpties)} to ${expectations.object.plain.onObjectWithEmptiesExpect}`,
        () => {
          const actual = expander.expand({name: values.paramName, value: values.objectWithEmpties, explode});

          expect(actual)
            .toEqual(expectations.object.plain.onObjectWithEmptiesExpect);
        });
    });

    describe('exploded', () => {
      const explode = true;

      it('expands an empty object', () => {
        const actual = expander.expand({name: values.paramName, value: {}, explode});

        expect(actual)
          .toEqual(expectations.object.exploded.onEmptyObjectExpect);
      });

      it(`expands the object ${JSON.stringify(values.object)} to ${expectations.object.exploded.onObjectExpect}`,
        () => {
          const actual = expander.expand({name: values.paramName, value: values.object, explode});

          expect(actual)
            .toEqual(expectations.object.exploded.onObjectExpect);
        });

      it(`expands the object with empties ${JSON.stringify(values.objectWithEmpties)} to ${expectations.object.exploded.onObjectWithEmptiesExpect}`,
        () => {
          const actual = expander.expand({name: values.paramName, value: values.objectWithEmpties, explode});

          expect(actual)
            .toEqual(expectations.object.exploded.onObjectWithEmptiesExpect);
        });

    });
  })

  describe('unsupported', () => {
    const ignored = false;

    it(`expands ${String(values.unsupported)} to the stringified version: ${expectations.unsupported.onUnsupportedExpect}`,
      () => {
        const actual = expander.expand({name: values.paramName, value: values.unsupported, explode: ignored});

        expect(actual)
          .toEqual(expectations.unsupported.onUnsupportedExpect);

      });

  });
}
