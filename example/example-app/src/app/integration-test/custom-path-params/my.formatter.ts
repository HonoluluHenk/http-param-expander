import {Formatter, Param, PrimitivesFormatter} from 'http-param-expander';
import {Param as OpenApiParam} from 'src/openapi-generated';
import {MyCustomType} from './my-custom.type';

export class MyFormatter implements Formatter<OpenApiParam> {
  private readonly delegate = new PrimitivesFormatter();

  supports(param: Param<unknown, OpenApiParam>): boolean {
    const result = (param.value instanceof MyCustomType) || this.delegate.supports(param);

    return result;
  }

  formatNested(param: Param<unknown, OpenApiParam>, name: string, value: unknown): string | null | undefined {
    if (value instanceof MyCustomType) {
      return value.aValue;
    }

    return this.delegate.formatNested(param, name, value);
  }

  formatSimple(param: Param<unknown, OpenApiParam>): string | null | undefined {
    return this.formatNested(param, param.name, param.value);
  }

}
