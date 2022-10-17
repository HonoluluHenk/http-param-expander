// noinspection MagicNumberJS

import {RFC6570_ALPHA, RFC6570_DIGIT, RFC6570_RESERVED, RFC6570_UNRESERVED} from './reserved-characters';

describe('reserved-characters', () => {
  describe("RFC6570_RESERVED_CHARACTERS", () => {
    it('contains restricted characters as defined in RFC 6570', () => {
      expect(RFC6570_RESERVED)
        .toEqual(':/?#[]@!$&\'()*+,;=');
    })
  });

  describe("RFC6570_ALPHA", () => {
    it('contains all alphabetic chars', () => {
      expect(RFC6570_ALPHA)
        .toContain('abcdefghijklmnopqrstuvwxyz');

      expect(RFC6570_ALPHA)
        .toContain('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

      expect(RFC6570_ALPHA)
        .toHaveLength(52);
    })
  });

  describe("RFC6570_DIGIT", () => {
    it('contains all numeric chars', () => {
      expect(RFC6570_DIGIT)
        .toContain('0123456789');

      expect(RFC6570_DIGIT)
        .toHaveLength(10);
    })
  });

  describe("RFC6570_UNRESERVED", () => {
    it('contains all alphabetic + numeric + some special chars', () => {
      expect(RFC6570_UNRESERVED)
        .toContain(RFC6570_ALPHA);
      expect(RFC6570_UNRESERVED)
        .toContain(RFC6570_DIGIT);
      expect(RFC6570_UNRESERVED)
        .toContain('-._~');
      expect(RFC6570_UNRESERVED)
        .toHaveLength(66);
    })
  });

});
