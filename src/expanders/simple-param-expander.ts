import {URITemplateCompatibleEncoder} from '../encoders';
import {Formatter} from '../formatter';
import {RFC6570_RESERVED} from '../reserved-characters';
import {BasicExpander} from './basic-expander';

export const SIMPLE_PARAM_RESERVED_CHARACTERS = RFC6570_RESERVED + '';

export class SimpleParamExpander<Opts = unknown> extends BasicExpander<Opts> {

  constructor(formatter: Formatter) {
    super(
      {
        encoder: new URITemplateCompatibleEncoder({allowedChars: 'U'}),
        formatter: formatter,
        expansion: {
          first: '',
          sep: ',',
          named: false,
          ifemp: '',
          allow: 'U',
        }
      });
  }

}
