import {URITemplateCompatibleEncoder} from '../encoders';
import {Formatter} from '../formatter';
import {FOO_RESERVED_CHARACTERS} from '../reserved-characters';
import {BasicExpander} from './basic-expander';

export const SIMPLE_PARAM_RESERVED_CHARACTERS = FOO_RESERVED_CHARACTERS + '';

export class SimpleParamExpander<Opts = unknown> extends BasicExpander<Opts> {

  constructor(formatter: Formatter) {
    super(
      {
        encoder: new URITemplateCompatibleEncoder({reservedCharacters: SIMPLE_PARAM_RESERVED_CHARACTERS}),
        formatter: formatter,
      },
      'skip',
      {
        variable: '',
        assignment: '=',
        listEntry: ',',
      });
  }
}
