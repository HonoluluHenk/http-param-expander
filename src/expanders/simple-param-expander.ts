import {type ExpanderOpts} from '../path-parameter-expander';
import {AbstractExpander} from './abstract-expander';
import {type Encoder} from '../encoder';

export class SimpleParamExpander extends AbstractExpander {

  constructor(
    opts: Readonly<ExpanderOpts>,
    encoder: Encoder,
  ) {
    super(opts, encoder);
  }

  expandParameter(name: string, value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (this.isEmpty(value)) {
      return ``;
    }

    if (this.isPlain(value)) {
      return this.expandPlain(value);
    }

    if (Array.isArray(value)) {
      const arr = value;
      const prefix = ``;
      if (this.opts.explode) {
        const result = this.flattenArray(prefix, arr, ',');

        return result;
      } else {
        const result = `${prefix}${this.flattenArray('', arr, ',')}`;

        return result;
      }
    }

    if (typeof value === 'object') {
      const obj = value;
      if (this.opts.explode) {
        const result = `${this.flattenObjectExploded(obj, '', '=', ',')}`;
        return result;
      } else {
        const result = `${this.flattenArray('', this.flattenObjectEntries(obj), ',')}`;
        return result;
      }
    }

    // unsupported value type, best effort
    return this.expandPlain(value);
  }

  private expandPlain(value: unknown): string {
    return `${this.encodeValue(String(value))}`;
  }
}
