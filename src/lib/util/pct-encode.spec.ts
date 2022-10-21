import {pctEncode} from './pct-encode';

describe('pct-encode', () => {

  describe('multi-byte-chars', () => {
    it.each([
      // 2 bytes
      ['¶', '%C2%B6'],
      ['ݽ', '%DD%BD'],
      // 3 bytes
      ['ॡ', '%E0%A5%A1'],
      ['ﲱ', '%EF%B2%B1'],
      // 4 byte chars
      ['🐧', '%F0%9F%90%A7'],
      ['🏓', '%F0%9F%8F%93'],
    ])('is encoded: %s => %s', (input, expected) => {
      const actual = pctEncode(input);

      expect(actual)
        .toEqual(expected);
    })

  });
});
