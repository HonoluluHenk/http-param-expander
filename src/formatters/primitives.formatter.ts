import {Param} from '../expander';
import {Formatter} from '../formatter';

export class PrimitivesFormatter<Opts = unknown> implements Formatter<Opts> {
  private static readonly supportedTypes = new Set<string>([
    'undefined',
    'string',
    'number',
    'boolean',
    'bigint',
  ]);

  public supports(param: Readonly<Param<unknown, Opts>>): boolean {
    const valueType = typeof param.value;

    const result = PrimitivesFormatter.supportedTypes.has(valueType);

    return result;
  }

  public formatSimple(param: Readonly<Param<unknown, Opts>>): string | null | undefined {
    return this.formatNested(param, param.name, param.value);
  }

  public formatNested(param: Readonly<Param<unknown, Opts>>, name: string, value: unknown): string | null | undefined {
    switch (typeof value) {
      case 'undefined':
        return this.convertUndefinedToString();
      case 'string':
        return this.convertStringToString(value);
      case 'number':
        return this.convertNumberToString(value);
      case 'boolean':
        return this.convertBooleanToString(value);
      case 'bigint':
        return this.convertBigIntToString(value);
      default:
        throw Error(`not supported: ${name}: ${typeof value} = ${JSON.stringify(value)}`);
    }
  }

  protected convertUndefinedToString(): undefined {
    return undefined;
  }

  protected convertStringToString(value: string): string {
    return value;
  }

  protected convertNumberToString(value: number): string {
    const result = value
      .toLocaleString(
        'en-US',
        {
          style: 'decimal',
          notation: 'standard',
          useGrouping: false,
          // 20 is the max value:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters
          maximumFractionDigits: 20,
        },
      );

    return result;
  }

  protected convertBooleanToString(value: boolean): string {
    return String(value);
  }

  protected convertBigIntToString(value: bigint): string {
    return String(value);
  }
}
