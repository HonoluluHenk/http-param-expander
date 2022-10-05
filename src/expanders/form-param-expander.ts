import {URITemplateCompatibleEncoder} from '../encoders';
import {Formatter} from '../formatter';
import {FOO_RESERVED_CHARACTERS} from '../reserved-characters';
import {BasicExpander} from './basic-expander';

export const FORM_PARAM_RESERVED_CHARACTERS = FOO_RESERVED_CHARACTERS + '';

export class FormParamExpander extends BasicExpander {

  constructor(formatter: Formatter) {
    super(
      {
        encoder: new URITemplateCompatibleEncoder({reservedCharacters: FORM_PARAM_RESERVED_CHARACTERS}),
        formatter: formatter,
      },
      'prefix',
      {
        variable: '&',
        assignment: '=',
        listEntry: ',',
      });
  }

}
