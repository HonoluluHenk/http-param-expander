import {type ExpanderOpts, type PathParameterExpander} from '../path-parameter-expander';
import {type Encoder} from '../encoder';

export abstract class AbstractExpander implements PathParameterExpander {
  protected constructor(
    public readonly opts: Readonly<ExpanderOpts>,
    public readonly encoder: Encoder,
  ) {
  }

  abstract expandParameter(name: string, value: unknown): string;

  protected encodeName(value: string): string {
    return this.encoder.encodeName(value);
  }

  protected encodeValue(value: unknown): string {
    return this.encoder.encodeValue(value);
  }

  protected isPlain(value: unknown): boolean {
    return (typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean');
  }

  protected flattenObjectEntries<T extends object>(obj: T): string[] {
    const result = (Object.keys(obj) as (keyof T)[])
      .map(key => [String(key), String(obj[key])])
      .reduce((prev, curr) => [...prev, ...curr], []);

    return result;
  }

  protected flattenArray(escapedPrefix: string = '', arr: unknown[], delimiter: string) {
    const result = arr
      .map(value => `${escapedPrefix}${this.encodeValue(value)}`)
      .join(delimiter);

    return result;
  }

  protected flattenObjectExploded<T extends object>(obj: T, prefix: string, assignment: string, delimiter: string): string {
    const result = (Object.keys(obj) as (keyof T)[])
      .map(key => `${prefix}${this.encodeValue(key)}${assignment}${this.encodeValue(obj[key])}`)
      .join(delimiter);

    return result;
  }

  protected isEmpty(value: unknown): boolean {
    if (value === '') {
      return true;
    }

    if (Array.isArray(value)) {
      return !value.length;
    }

    if (typeof value === 'object') {
      for (const key in (value as any)) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }
}
