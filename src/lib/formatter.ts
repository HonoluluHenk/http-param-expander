import {Param} from './expander';

export interface Formatter<Opts = unknown> {
  supports(param: Param<unknown, Opts>): boolean;

  formatSimple(param: Param<unknown, Opts>): string | null | undefined;

  formatNested(param: Param<unknown, Opts>, name: string, value: unknown): string | null | undefined;
}
