import {AbstractExpander} from './abstract-expander';
import {type Encoder} from '../encoder';
import {Parameter} from '../path-parameter-expander';

export class FormParamExpander extends AbstractExpander {

  constructor(
    encoder: Encoder,
  ) {
    super(encoder);
  }

  expand(param: Readonly<Parameter>): string {
    const encodedName = this.encodeName(param.name);
    if (param.value === null || param.value === undefined) {
      return '';
    }

    if (this.isEmpty(param.value)) {
      return `${encodedName}=`;
    }

    if (this.isPlain(param.value)) {
      return this.expandPlain(encodedName, param.value);
    }

    if (Array.isArray(param.value)) {
      const arr = param.value;
      const prefix = `${encodedName}=`;
      if (param.explode) {
        const result = this.flattenArray(prefix, arr, '&');

        return result;
      } else {
        const result = `${prefix}${this.flattenArray('', arr, ',')}`;

        return result;
      }
    }

    if (typeof param.value === 'object') {
      const obj = param.value;
      if (param.explode) {
        const result = `${this.flattenObjectExploded(obj, '', '=', '&')}`;
        return result;
      } else {
        const result = `${encodedName}=${this.flattenArray('', this.flattenObjectEntries(obj), ',')}`;
        return result;
      }
    }

    // unsupported value type, best effort
    return this.expandPlain(encodedName, param.value);
  }

  protected expandPlain(encodedName: string, value: unknown) {
    return `${encodedName}=${this.encodeValue(String(value))}`;
  }
}
