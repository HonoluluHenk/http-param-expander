// noinspection MagicNumberJS

import {RFC6570_RESERVED, RFC6570_UNRESERVED} from '../reserved-characters';
import {URITemplateCompatibleEncoder} from './uri-template-compatible-encoder';

describe('URITemplateCompatibleEncoder', () => {
  const latin1 = Array(255)
    .fill(0)
    .map((_, i) => String.fromCharCode(i));

  describe('allowed characters: "U"', () => {
    const encoder = new URITemplateCompatibleEncoder({
      allowedChars: 'U',
    });

    const REQUIRES_ENCODING = /^[0-9a-zA-Z-._~]$/;
    const latin1Allowed = latin1.filter(c => c.match(REQUIRES_ENCODING));
    const latin1RequiresEncoding = latin1.filter(c => !c.match(REQUIRES_ENCODING));

    it('sanity check', () => {
      expect(latin1Allowed)
        .toHaveLength(66);
      expect(latin1RequiresEncoding)
        .toHaveLength((255 - 66));
    })

    it.each(latin1RequiresEncoding)('encodes %p', (input) => {
      const actual = encoder.encode(input);

      expect(actual)
        .toMatch(/^(%[0-9a-f]{2})+$/i);
    });

    it.each(latin1Allowed)('passes through %s', (input) => {
      const actual = encoder.encode(input);

      expect(actual)
        .toEqual(input);
    });

    it.each([
      ['🇯🇵', '%F0%9F%87%AF%F0%9F%87%B5'],
      ['😀︎', '%F0%9F%98%80%EF%B8%8E'],
      ['😀️', '%F0%9F%98%80%EF%B8%8F'],
      ['👨‍👩‍👧‍👦', '%F0%9F%91%A8%E2%80%8D%F0%9F%91%A9%E2%80%8D%F0%9F%91%A7%E2%80%8D%F0%9F%91%A6'],
    ])('encodes multi-codepoint-character: %s', (input, expected) => {
      const actual = encoder.encode(input);

      expect(actual)
        .toEqual(expected);
    })
  });

  describe('allowed characters: "U+R"', () => {
    const encoder = new URITemplateCompatibleEncoder({
      allowedChars: 'U+R',
    });

    const ALLOWED = RFC6570_UNRESERVED + RFC6570_RESERVED;
    const latin1Allowed = latin1.filter(c => ALLOWED.includes(c));
    const latin1RequiresEncoding = latin1.filter(c => !ALLOWED.includes(c));

    it('sanity check', () => {
      expect(latin1Allowed)
        .toHaveLength(84);
      expect(latin1RequiresEncoding)
        .toHaveLength((255 - 84));
    })

    it.each(latin1RequiresEncoding)('encodes %p', (input) => {
      const actual = encoder.encode(input);

      expect(actual)
        .toMatch(/^(%[0-9a-f]{2})+$/i);
    });

    it.each(latin1Allowed)('passes through %s', (input) => {
      const actual = encoder.encode(input);

      expect(actual)
        .toEqual(input);
    });

    it.each([
      ['🇯🇵', '%F0%9F%87%AF%F0%9F%87%B5'],
      ['😀︎', '%F0%9F%98%80%EF%B8%8E'],
      ['😀️', '%F0%9F%98%80%EF%B8%8F'],
      ['👨‍👩‍👧‍👦', '%F0%9F%91%A8%E2%80%8D%F0%9F%91%A9%E2%80%8D%F0%9F%91%A7%E2%80%8D%F0%9F%91%A6'],
    ])('encodes multi-codepoint-character: %s', (input, expected) => {
      const actual = encoder.encode(input);

      expect(actual)
        .toEqual(expected);
    })
  });

});
