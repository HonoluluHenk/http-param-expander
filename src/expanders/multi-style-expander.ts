import {ExtendedPathParameterStyle} from '../path-parameter-style';
import {ExpanderOpts} from '../path-parameter-expander';
import {MatrixParamExpander} from './matrix-param-expander';
import {DefaultEncoder} from '../encoders/default-encoder';
import {LabelParamExpander} from './label-param-expander';
import {Encoder} from '../encoder';
import {FormParamExpander} from './form-param-expander';
import {SimpleParamExpander} from './simple-param-expander';

export class MultiStyleExpander {
  constructor(
    public readonly opts: ExpanderOpts,
    public readonly encoder: Encoder = new DefaultEncoder(opts),
  ) {
  }

  expandParameter(name: string, value: unknown, style: ExtendedPathParameterStyle): string {
    switch (style) {
      case 'matrix':
        return new MatrixParamExpander(this.opts, this.encoder)
          .expandParameter(name, value);
      case 'label':
        return new LabelParamExpander(this.opts, this.encoder)
          .expandParameter(name, value);
      case 'form':
        return new FormParamExpander(this.opts, this.encoder)
          .expandParameter(name, value);
      case 'simple':
        return new SimpleParamExpander(this.opts, this.encoder)
          .expandParameter(name, value);
      case 'spaceDelimited':
        return `FIXME: implement: ${style}, name:${name}`;
      case 'pipeDelimited':
        return `FIXME: implement: ${style}, name:${name}`;
      case 'deepObject':
        return `FIXME: implement: ${style}, name:${name}`;
      default:
        return `FIXME: implement extended style: ${style}, name:${name}`;
    }
  }

}
