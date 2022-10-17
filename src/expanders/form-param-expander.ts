import {URITemplateCompatibleEncoder} from '../encoders';
import {Formatter} from '../formatter';
import {BasicExpander} from './basic-expander';

export class FormParamExpander<Opts = unknown> extends BasicExpander<Opts> {

  constructor(formatter: Formatter) {
    super({
      encoder: new URITemplateCompatibleEncoder({allowedChars: 'U'}),
      formatter: formatter,
      expansion: {
        first: '?',
        sep: '&',
        named: true,
        ifemp: '=',
        allow: 'U',
      },
    });
  }

}
