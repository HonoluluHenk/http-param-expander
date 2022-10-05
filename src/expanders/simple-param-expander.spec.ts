import {PrimitivesFormatter} from '../formatters';
import {SimpleParamExpander} from './simple-param-expander';
import {testSuite} from './testSuite.spec-helper';

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
          onArrayWithEmptiesExpect: 'blue,black,brown',
        },
        exploded: {
          onEmptyArrayExpect: '',
          onArrayExpect: 'blue,black,brown',
          onArrayWithEmptiesExpect: 'blue,black,brown',
        },
      },
      object: {
        plain: {
          onEmptyObjectExpect: '',
          onObjectExpect: 'R,100,G,200,B,150',
          onObjectWithEmptiesExpect: 'R,100,G,200,B,150',
        },
        exploded: {
          onEmptyObjectExpect: '',
          onObjectExpect: 'R=100,G=200,B=150',
          onObjectWithEmptiesExpect: 'R=100,G=200,B=150',
        },
      },
      unsupported: {
        onUnsupportedExpect: 'Symbol%28unsupported%29',
      },
    },
  )
});
