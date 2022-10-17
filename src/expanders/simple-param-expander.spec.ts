import {PrimitivesFormatter, StringFormatter} from '../formatters';
import {SimpleParamExpander} from './simple-param-expander';
import {FixtureName, TestFixture, testSuite} from './testSuite.spec-helper';

describe('SimpleParamExpander', () => {
  testSuite(
    () => new SimpleParamExpander(new PrimitivesFormatter()),
    {
      paramName: 'color',
      simple: 'blue',
      array: ['blue', 'black', 'brown'],
      arrayWithEmpties: ['blue', '', 'black', null, 'brown', undefined],
      object: {'R': 100, 'G': 200, 'B': 150},
      objectWithEmpties: {'R': 100, 'magenta': '', 'G': 200, 'null': null, 'B': 150, 'undefined': undefined},
      unsupported: Symbol('unsupported'),
    },
    {
      nullish: {
        onNullishExpect: '',
      },
      simple: {
        onEmptyValueExpect: '',
        onSimpleValueExpect: 'blue',
      },
      array: {
        plain: {
          onEmptyArrayExpect: '',
          onArrayExpect: 'blue,black,brown',
          onArrayWithEmptiesExpect: 'blue,,black,brown',
        },
        exploded: {
          onEmptyArrayExpect: '',
          onArrayExpect: 'blue,black,brown',
          onArrayWithEmptiesExpect: 'blue,,black,brown',
        },
      },
      object: {
        plain: {
          onEmptyObjectExpect: '',
          onObjectExpect: 'R,100,G,200,B,150',
          onObjectWithEmptiesExpect: 'R,100,magenta,,G,200,B,150',
        },
        exploded: {
          onEmptyObjectExpect: '',
          onObjectExpect: 'R=100,G=200,B=150',
          onObjectWithEmptiesExpect: 'R=100,magenta,G=200,B=150',
        },
      },
      unsupported: {
        onUnsupportedExpect: 'Symbol%28unsupported%29',
      },
    },
  );

  const expander = new SimpleParamExpander(new StringFormatter());

  it.each([
    ['var',  false, 'value'],
    ['var',  true, 'value'],
    ['hello',  false, 'Hello%20World%21'],
    ['hello',  true, 'Hello%20World%21'],
    ['empty',  false, ''],
    ['empty',  true, ''],
    ['undefNull',  false, ''],
    ['undefNull',  true, ''],
    ['undefUndefined',  false, ''],
    ['undefUndefined',  true, ''],
    ['list',  false, 'red,green,blue'],
    ['list',  true, 'red,green,blue'],
    ['keys',  false, 'semi,%3B,dot,.,comma,%2C'],
    ['keys',  true, 'semi=%3B,dot=.,comma=%2C'],
    // not implemented:
    // ['half', TextFixtures.half, true, ';who=fred'],
  ] as const)('formats "%s" using %s (explode: %s) to: %s', (name: FixtureName, explode: boolean, expected: string) => {
    const actual = expander.expand({
      name,
      value: TestFixture[name],
      explode,
      opts: undefined,
    });

    expect(actual)
      .toEqual(expected);

  })
});
