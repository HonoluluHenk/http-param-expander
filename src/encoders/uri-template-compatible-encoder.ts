import {type Encoder, type EncoderOpts} from '../encoder';

export interface URITemplateEncoderOpts extends Partial<EncoderOpts> {
  reservedCharacters: string,
}

export class URITemplateCompatibleEncoder implements Encoder {
  private readonly reservedCharacters: Set<string>;

  public readonly opts: Readonly<Required<URITemplateEncoderOpts>>;

  constructor(
    opts: URITemplateEncoderOpts,
  ) {
    this.opts = {
      ...opts,
      allowReserved: opts.allowReserved ?? false,
    };
    this.reservedCharacters = new Set(this.opts.reservedCharacters);
  }

  encode(value: string): string {
    if (this.opts.allowReserved) {
      return String(value);
    }

    return this.percentEscapeReservedCharacters(value);
  }

  protected percentEscapeReservedCharacters(text: string): string {
    const result = Array.from(text)
      .map(c => this.escapeReservedChar(c))
      .join('');

    return result;
  }

  protected escapeReservedChar(c: string) {
    if (this.reservedCharacters.has(c)) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    }

    return c;
  }

}
