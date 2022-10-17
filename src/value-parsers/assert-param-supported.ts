import {Param} from '../expander';
import {Formatter} from '../formatter';
import {asserts} from '../util';

export function assertParamSupported(param: Param<unknown, unknown>, formatter: Formatter): void {
  asserts(
    formatter.supports(param),
    () => `Param not supported: ${param.name}=${JSON.stringify(param.value)}`,
  );
}
