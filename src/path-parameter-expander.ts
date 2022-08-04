import {type EncoderOpts} from './encoder';

export interface PathParameterExpander {
  expandParameter(name: string, value: unknown): string;
}

// FIXME: sollte das als Parameter fuer expandParameter uebergeben werden?
export interface ExpanderOpts extends EncoderOpts {
  explode: boolean;
}
