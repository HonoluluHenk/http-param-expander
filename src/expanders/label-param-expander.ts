import {AbstractExpander} from './abstract-expander';
import {type Encoder} from '../encoder';
import {Parameter} from '../parameter-expander';

export class LabelParamExpander extends AbstractExpander {

  constructor(
    encoder: Encoder,
  ) {
    super(encoder);
  }

  expand(param: Readonly<Parameter>): string {
    if (param.value === null || param.value === undefined) {
      return '';
    }

    if (this.isEmpty(param.value)) {
      return `.`;
    }

    if (this.isPlain(param.value)) {
      return this.expandPlain(param.value);
    }

    if (Array.isArray(param.value)) {
      const arr = param.value;
      const prefix = `.`;
      if (param.explode) {
        const result = this.flattenArray(prefix, arr, '');

        return result;
      } else {
        const result = `${prefix}${this.flattenArray('', arr, '.')}`;

        return result;
      }
    }

    if (typeof param.value === 'object') {
      const obj = param.value;
      if (param.explode) {
        const result = `${this.flattenObjectExploded(obj, '.', '=', '')}`;
        return result;
      } else {
        const result = `.${this.flattenArray('', this.flattenObjectEntries(obj), '.')}`;
        return result;
      }
    }

    // unsupported value type, best effort
    return this.expandPlain(param.value);
  }

  private expandPlain(value: unknown): string {
    return `.${this.encodeValue(String(value))}`;
  }
}
