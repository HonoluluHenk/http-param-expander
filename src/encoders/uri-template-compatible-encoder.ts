import {type Encoder} from '../encoder';
import {RFC6570_RESERVED, RFC6570_UNRESERVED} from '../reserved-characters';
import {pctEncode} from '../util';

/**
 * As per RFC 6570:
 *
 * <ul>
 * <li>U: allow characters in the unreserved set.</li>
 * <li>U+R: allow characters in the union of
 * (unreserved / reserved / pct- encoding).</li>
 * </ul>
 */
export type AllowedChars = 'U' | 'U+R';

export interface URITemplateEncoderOpts {
  readonly allowedChars: AllowedChars,
}

export function parseAllowedChars(allowedChars: AllowedChars): string {
  switch (allowedChars) {
    case 'U':
      return RFC6570_UNRESERVED;
    case 'U+R':
      // FIXME: what about "pct-encoded"?
      return RFC6570_UNRESERVED + RFC6570_RESERVED;
  }
}

export class URITemplateCompatibleEncoder implements Encoder {
  private readonly allowedChars: Set<string>;

  constructor(
    public readonly opts: URITemplateEncoderOpts,
  ) {
    this.allowedChars = new Set(parseAllowedChars(opts.allowedChars));
  }

  encode(value: string): string {
    const result = Array.from(value)
      .map(c => this.escapeReservedChar(c))
      .join('');

    return result;
  }

  protected escapeReservedChar(c: string) {
    if (!this.allowedChars.has(c)) {
      const hex = pctEncode(c);

      return hex;
    }

    return c;
  }

}
