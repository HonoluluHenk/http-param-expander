import {StringFormatter} from '../formatters';
import {FormParamExpander} from './form-param-expander';
import {testSuite} from './testSuite.spec-helper';

describe('FormParamExpander', () => {
  testSuite(
    () => new FormParamExpander(new StringFormatter()),
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
        onEmptyValueExpect: '?color=',
        onSimpleValueExpect: '?color=blue',
      },
      array: {
        plain: {
          onEmptyArrayExpect: '',
          onArrayExpect: '?color=blue,black,brown',
          onArrayWithEmptiesExpect: '?color=blue,,black,brown',
        },
        exploded: {
          onEmptyArrayExpect: '',
          onArrayExpect: '?color=blue&color=black&color=brown',
          onArrayWithEmptiesExpect: '?color=blue&color=&color=black&color=brown',
        },
      },
      object: {
        plain: {
          onEmptyObjectExpect: '',
          onObjectExpect: '?color=R,100,G,200,B,150',
          onObjectWithEmptiesExpect: '?color=R,100,magenta,,G,200,B,150',
        },
        exploded: {
          onEmptyObjectExpect: '',
          onObjectExpect: '?R=100&G=200&B=150',
          onObjectWithEmptiesExpect: '?R=100&magenta=&G=200&B=150',
        },
      },
      unsupported: {
        onUnsupportedExpect: '?color=Symbol%28unsupported%29',
      },
    },
  );

});
