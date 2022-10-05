import {Encoder} from '../encoder';

export class URIComponentEncoder implements Encoder {
  encode(value: string): string {
    return encodeURIComponent(value);
  }
}
