export interface Param<Value, Opts> {
  readonly name: string,
  readonly value: Value,
  readonly explode: boolean,
  readonly opts?: Opts
}

export interface Expander<Opts = unknown> {
  // FIXME: remove Readonly everywhere on Param
  expand(param: Readonly<Param<unknown, Opts>>): string | undefined;
}
