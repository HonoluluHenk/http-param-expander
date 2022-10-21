import {Param} from '../expander';
import {Formatter} from '../formatter';

/**
 * Only supports string values!
 */
export class StringFormatter implements Formatter {
  public supports(param: Param<unknown, unknown>): boolean {
    return typeof param.value === 'string';
  }

  public formatSimple(param: Param<unknown, unknown>): string | null | undefined {
    return String(param.value);
  }

  public formatNested(
    param: Param<unknown, unknown>,
    name: string,
    value: unknown,
  ): string | null | undefined {
    return String(value);
  }
}
