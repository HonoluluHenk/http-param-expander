export type ParameterStyle =
  | 'matrix'
  | 'label'
  | 'form'
  | 'simple'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject'
  ;

// noinspection JSUnusedGlobalSymbols
export const ParameterStyle = {
  matrix: 'matrix' as ParameterStyle,
  label: 'label' as ParameterStyle,
  form: 'form' as ParameterStyle,
  simple: 'simple' as ParameterStyle,
  spaceDelimited: 'spaceDelimited' as ParameterStyle,
  pipeDelimited: 'pipeDelimited' as ParameterStyle,
  deepObject: 'deepObject' as ParameterStyle,
} as const;

export type ExtendedParameterStyle = ParameterStyle | string;
