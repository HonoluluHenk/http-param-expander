import {Param} from './expander';

export interface Formatter<Opts = unknown> {
  supports(param: Readonly<Param<unknown, Opts>>): boolean;

  formatSimple(param: Readonly<Param<unknown, Opts>>): string;

  formatNested(param: Readonly<Param<unknown, Opts>>, name: string, value: unknown): string;
}
