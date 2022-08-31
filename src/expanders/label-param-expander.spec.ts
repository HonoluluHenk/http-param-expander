import {URIComponentEncoder} from '../encoders/uri-component-encoder';
import {LabelParamExpander} from './label-param-expander';
import {testSuite} from './testSuite.spec-helper';

describe('LabelParamExpander', () => {
  testSuite(
    () => new LabelParamExpander(new URIComponentEncoder()),
    {
      paramName: 'nameIgnored',
      simple: 'blue',
      array: ['blue', 'black', 'brown'],
      object: {'R': 100, 'G': 200, 'B': 150},
      unsupported: Symbol('unsupported'),
    },
    {
      notExploded: {
        onNullish: actual => expect(actual).toEqual(''),
        onEmptyValue: actual => expect(actual).toEqual('.'),
        onSimpleValue: actual => expect(actual).toEqual('.blue'),
        onArray: actual => expect(actual).toEqual('.blue.black.brown'),
        onObject: actual => expect(actual).toEqual('.R.100.G.200.B.150'),
        onUnsupported: actual => expect(actual).toEqual('.Symbol(unsupported)'),
      },
      exploded: {
        onNullish: actual => expect(actual).toEqual(''),
        onEmptyValue: actual => expect(actual).toEqual('.'),
        onSimpleValue: actual => expect(actual).toEqual('.blue'),
        onArray: actual => expect(actual).toEqual('.blue.black.brown'),
        onObject: actual => expect(actual).toEqual('.R=100.G=200.B=150'),
        onUnsupported: actual => expect(actual).toEqual('.Symbol(unsupported)'),
      },
    },
  )
});
