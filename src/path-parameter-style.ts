export type PathParameterStyle =
  | 'matrix'
  | 'label'
  | 'form'
  | 'simple'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject'
  ;

export type ExtendedPathParameterStyle = PathParameterStyle | string;

export const PathParameterStyle = {
  matrix: 'matrix' as PathParameterStyle,
  label: 'label' as PathParameterStyle,
  form: 'form' as PathParameterStyle,
  simple: 'simple' as PathParameterStyle,
  spaceDelimited: 'spaceDelimited' as PathParameterStyle,
  pipeDelimited: 'pipeDelimited' as PathParameterStyle,
  deepObject: 'deepObject' as PathParameterStyle,
} as const;
