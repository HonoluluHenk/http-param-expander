import {Param} from './expander';

export interface Formatter<Opts = unknown> {
  supports(param: Readonly<Param<unknown, Opts>>): boolean;

  formatSimple(param: Readonly<Param<unknown, Opts>>): string | null | undefined;

  formatNested(param: Readonly<Param<unknown, Opts>>, name: string, value: unknown): string | null | undefined;
}
