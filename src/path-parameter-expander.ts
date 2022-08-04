export interface PathParameterExpander {
  expandParameter(name: string, value: unknown): string;
}

// FIXME: sollte das als Parameter fuer expandParameter uebergeben werden?
export interface ExpanderOpts {
  explode: boolean;
  allowReserved: boolean;
}
