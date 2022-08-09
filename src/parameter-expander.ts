export interface Parameter {
  name: string,
  value: unknown,
  explode: boolean,
}

export interface ParameterExpander {
  expand(param: Readonly<Parameter>): string;
}
