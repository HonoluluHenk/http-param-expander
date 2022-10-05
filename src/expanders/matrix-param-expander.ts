import {URITemplateCompatibleEncoder} from '../encoders';
import {Formatter} from '../formatter';
import {FOO_RESERVED_CHARACTERS} from '../reserved-characters';
import {BasicExpander} from './basic-expander';

export const MATRIX_PARAM_RESERVED_CHARACTERS = FOO_RESERVED_CHARACTERS + '';

export class MatrixParamExpander<Opts = unknown> extends BasicExpander<Opts> {

  constructor(formatter: Formatter) {
    super(
      {
        encoder: new URITemplateCompatibleEncoder({reservedCharacters: MATRIX_PARAM_RESERVED_CHARACTERS}),
        formatter: formatter,
      },
      'prefix',
      {
        variable: ';',
        assignment: '=',
        listEntry: ',',
      });
  }
}
