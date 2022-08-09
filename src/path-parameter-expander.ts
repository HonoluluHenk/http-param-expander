// FIXME: is this still a "Path" parameter expander?
export interface Parameter {
  name: string,
  value: unknown,
  explode: boolean,
}

export interface PathParameterExpander {
  expand(param: Readonly<Parameter>): string;
}
