import {URITemplateCompatibleEncoder} from '../encoders';
import {Formatter} from '../formatter';
import {FOO_RESERVED_CHARACTERS} from '../reserved-characters';
import {BasicExpander} from './basic-expander';

export const LABEL_PARAM_RESERVED_CHARACTERS = FOO_RESERVED_CHARACTERS + '';

export class LabelParamExpander extends BasicExpander {

  constructor(formatter: Formatter) {
    super(
      {
        encoder: new URITemplateCompatibleEncoder({reservedCharacters: LABEL_PARAM_RESERVED_CHARACTERS}),
        formatter: formatter,
      },
      'prefix',
      {
        variable: '.',
        assignment: '=',
        listEntry: '.',
      });
  }

}
