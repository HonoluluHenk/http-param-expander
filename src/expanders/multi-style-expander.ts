import {type ExtendedParameterStyle} from '../parameter-style';
import {Parameter, type ParameterExpander} from '../parameter-expander';
import {MatrixParamExpander} from './matrix-param-expander';
import {LabelParamExpander} from './label-param-expander';
import {type Encoder} from '../encoder';
import {FormParamExpander} from './form-param-expander';
import {SimpleParamExpander} from './simple-param-expander';
import {URIComponentEncoder} from '../encoders/uri-component-encoder';

export class MultiStyleExpander {
  constructor(
    public readonly encoder: Encoder = new URIComponentEncoder(),
    private readonly expanders: Record<ExtendedParameterStyle, ParameterExpander> = {
      matrix: new MatrixParamExpander(encoder),
      label: new LabelParamExpander(encoder),
      form: new FormParamExpander(encoder),
      simple: new SimpleParamExpander(encoder),
      spaceDelimited: new SimpleParamExpander(encoder),
      pipeDelimited: new SimpleParamExpander(encoder),
      deepObject: new SimpleParamExpander(encoder),
    },
  ) {
    // nop
  }

  withExpander(style: ExtendedParameterStyle, encoder: ParameterExpander): MultiStyleExpander {
    return new MultiStyleExpander(
      this.encoder,
      {
        ...this.expanders,
        [style]: encoder,
      },
    );
  }


  expandParameter(param: Readonly<Parameter>, style: ExtendedParameterStyle): string {
    const expander = this.expanders[style];
    if (!expander) {
      throw Error(`No expander found implemented: ${style}`);
    }

    const result = expander.expand(param);

    return result;
  }

}
