import {URIComponentEncoder} from '../encoders/uri-component-encoder';
import {FormParamExpander} from './form-param-expander';
import {testSuite} from './testSuite.spec-helper';

describe('FormParamExpander', () => {
  testSuite(
    () => new FormParamExpander(new URIComponentEncoder()),
    {
      paramName: 'color',
      simple: 'blue',
      array: ['blue', 'black', 'brown'],
      object: {'R': 100, 'G': 200, 'B': 150},
      unsupported: Symbol('unsupported'),
    },
    {
      notExploded: {
        onNullish: actual => expect(actual).toEqual(''),
        onEmptyValue: actual => expect(actual).toEqual('color='),
        onSimpleValue: actual => expect(actual).toEqual('color=blue'),
        onArray: actual => expect(actual).toEqual('color=blue,black,brown'),
        onObject: actual => expect(actual).toEqual('color=R,100,G,200,B,150'),
        onUnsupported: actual => expect(actual).toEqual('color=Symbol(unsupported)'),
      },
      exploded: {
        onNullish: actual => expect(actual).toEqual(''),
        onEmptyValue: actual => expect(actual).toEqual('color='),
        onSimpleValue: actual => expect(actual).toEqual('color=blue'),
        onArray: actual => expect(actual).toEqual('color=blue&color=black&color=brown'),
        onObject: actual => expect(actual).toEqual('R=100&G=200&B=150'),
        onUnsupported: actual => expect(actual).toEqual('color=Symbol(unsupported)'),
      },
    },
  );

});
