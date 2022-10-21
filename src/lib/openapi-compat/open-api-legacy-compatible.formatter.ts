import {Param} from '../expander';
import {Formatter} from '../formatter';

export interface OpenAPIOpts {
  dataFormat: string | undefined;
}

export class OpenAPILegacyCompatibleFormatter implements Formatter<OpenAPIOpts> {
  private isOpenAPIDateTime(opts: OpenAPIOpts | undefined): boolean {
    return opts?.dataFormat === 'date-time';
  }

  public supports(_param: Param<unknown, OpenAPIOpts>): boolean {
    return true;
  }

  public formatSimple(param: Param<unknown, OpenAPIOpts>): string | null | undefined {
    return this.formatNested(param, param.name, param.value);
  }

  public formatNested(
    param: Param<unknown, OpenAPIOpts>,
    name: string,
    value: unknown,
  ): string | null | undefined {
    if (this.isOpenAPIDateTime(param.opts)) {
      return (param.value as Date).toISOString();
    }
    return String(value);
  }
}
