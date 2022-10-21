import {PrimitivesFormatter, StringFormatter} from '../formatters';
import {MatrixParamExpander} from './matrix-param-expander';
import {FixtureName, TestFixture, testSuite} from './testSuite.spec-helper';

describe('MatrixParamExpander', () => {
  testSuite(
    () => new MatrixParamExpander(new PrimitivesFormatter()),
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
        onEmptyValueExpect: ';color',
        onSimpleValueExpect: ';color=blue',
      },
      array: {
        plain: {
          onEmptyArrayExpect: '',
          onArrayExpect: ';color=blue,black,brown',
          onArrayWithEmptiesExpect: ';color=blue,,black,brown',
        },
        exploded: {
          onEmptyArrayExpect: '',
          onArrayExpect: ';color=blue;color=black;color=brown',
          onArrayWithEmptiesExpect: ';color=blue;color;color=black;color=brown',
        },
      },
      object: {
        plain: {
          onEmptyObjectExpect: '',
          onObjectExpect: ';color=R,100,G,200,B,150',
          onObjectWithEmptiesExpect: ';color=R,100,magenta,,G,200,B,150',
        },
        exploded: {
          onEmptyObjectExpect: '',
          onObjectExpect: ';R=100;G=200;B=150',
          onObjectWithEmptiesExpect: ';R=100;magenta;G=200;B=150',
        },
      },
      unsupported: {
        onUnsupportedExpect: ';color=Symbol%28unsupported%29',
      },
    },
  );

  const expander = new MatrixParamExpander(new StringFormatter());

  it.each([
    ['who', false, ';who=fred'],
    ['who', true, ';who=fred'],
    ['empty', false, ';empty'],
    ['empty', true, ';empty'],
    ['x', false, ';x=1024'],
    ['x', true, ';x=1024'],
    ['undefNull', false, ''],
    ['undefNull', true, ''],
    ['undefUndefined', false, ''],
    ['undefUndefined', true, ''],
    ['hello', false, ';hello=Hello%20World%21'],
    ['hello', true, ';hello=Hello%20World%21'],
    ['list', false, ';list=red,green,blue'],
    ['list', true, ';list=red;list=green;list=blue'],
    ['keys', false, ';keys=semi,%3B,dot,.,comma,%2C'],
    ['keys', true, ';semi=%3B;dot=.;comma=%2C'],
    // not implemented:
    // ['half', true, ';who=fred'],
  ] as const)('formats "%s" (explode: %s) to: %s', (name: FixtureName, explode: boolean, expected: string) => {
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
