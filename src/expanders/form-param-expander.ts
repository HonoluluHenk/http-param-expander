import {ExpanderOpts} from '../path-parameter-expander';
import {AbstractExpander} from './abstract-expander';
import {Encoder} from '../encoder';

export class FormParamExpander extends AbstractExpander {

  constructor(
    opts: Readonly<ExpanderOpts>,
    encoder: Encoder,
  ) {
    super(opts, encoder);
  }

  expandParameter(name: string, value: unknown): string {
    const encodedName = this.encodeName(name);
    if (value === null || value === undefined) {
      return '';
    }

    if (this.isEmpty(value)) {
      return `${encodedName}=`;
    }

    if (this.isPlain(value)) {
      return this.expandPlain(encodedName, value);
    }

    if (Array.isArray(value)) {
      const arr = value;
      const prefix = `${encodedName}=`;
      if (this.opts.explode) {
        const result = this.flattenArray(prefix, arr, '&');

        return result;
      } else {
        const result = `${prefix}${this.flattenArray('', arr, ',')}`;

        return result;
      }
    }

    if (typeof value === 'object') {
      const obj = value;
      if (this.opts.explode) {
        const result = `${this.flattenObjectExploded(obj, '', '=', '&')}`;
        return result;
      } else {
        const result = `${encodedName}=${this.flattenArray('', this.flattenObjectEntries(obj), ',')}`;
        return result;
      }
    }

    // unsupported value type, best effort
    return this.expandPlain(encodedName, value);
  }

  protected expandPlain(encodedName: string, value: unknown) {
    return `${encodedName}=${this.encodeValue(String(value))}`;
  }
}
