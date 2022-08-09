import {type ExtendedPathParameterStyle} from '../path-parameter-style';
import {type PathParameterExpander} from '../path-parameter-expander';
import {MatrixParamExpander} from './matrix-param-expander';
import {DefaultEncoder} from '../encoders';
import {LabelParamExpander} from './label-param-expander';
import {type Encoder} from '../encoder';
import {FormParamExpander} from './form-param-expander';
import {SimpleParamExpander} from './simple-param-expander';

export class MultiStyleExpander {
  constructor(
    public readonly encoder: Encoder = new DefaultEncoder(),
    private readonly expanders: Record<ExtendedPathParameterStyle, PathParameterExpander> = {
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

  withExpander(style: ExtendedPathParameterStyle, encoder: PathParameterExpander): MultiStyleExpander {
    return new MultiStyleExpander(
      this.encoder,
      {
        ...this.expanders,
        [style]: encoder,
      },
    );
  }


  expandParameter(name: string, value: unknown, style: ExtendedPathParameterStyle, explode: boolean): string {
    const expander = this.expanders[style];
    if (!expander) {
      throw Error(`No expander found implemented: ${style}`);
    }

    const result = expander.expandParameter(name, value, explode);

    return result;
  }

}
