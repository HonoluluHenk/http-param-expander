// FIXME: is this still a "Path" parameter expander?
export interface PathParameterExpander {
  expandParameter(name: string, value: unknown, explode: boolean): string;
}
