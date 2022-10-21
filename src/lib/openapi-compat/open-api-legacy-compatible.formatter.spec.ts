import {Param} from '../expander';
import {OpenAPILegacyCompatibleFormatter, OpenAPIOpts} from './open-api-legacy-compatible.formatter';

describe('open-api-legacy-compatible.formatter', () => {
  const formatter = new OpenAPILegacyCompatibleFormatter();

  const aDate = new Date(Date.UTC(2022, 9, 18, 23, 58, 1, 123));

  const theUsualInputs: [any, string][] = [
    [1, '1'],
    [0, '0'],
    [(0.1 + 0.2), '0.30000000000000004'],
    ['asdf', 'asdf'],
    ['', ''],
    [true, 'true'],
    [false, 'false'],
  ]

  describe('with format=date-time', () => {
    const paramFixture: Param<unknown, OpenAPIOpts> = {
      name: 'param',
      value: undefined,
      explode: false,
      opts: {
        dataFormat: 'date-time',
      },
    }

    it.each(
      theUsualInputs,
    )('supports the input %p', (value, _) => {
      const param = {
        ...paramFixture,
        value,
      }
      const actual = formatter.supports(param);

      expect(actual)
        .toEqual(true);
    });

    it('supports Date', () => {
      const param = {
        ...paramFixture,
        value: aDate,
      }
      const actual = formatter.supports(param);

      expect(actual)
        .toEqual(true);
    });

    it.each(theUsualInputs)('throws for %p because it tries to call toISOString', (value, _) => {
      const param = {
        ...paramFixture,
        value,
      }
      expect(() => formatter.formatSimple(param))
        .toThrowError(/toISOString/);
    });

    it('formats a date using iso format', () => {
      const param = {
        ...paramFixture,
        value: aDate,
      }

      const actual = formatter.formatSimple(param);

      expect(actual)
        .toEqual('2022-10-18T23:58:01.123Z');
    })

  });

  describe('with empty opts (i.e.: other format)', () => {
    const paramFixture: Param<unknown, OpenAPIOpts> = {
      name: 'param',
      value: undefined,
      explode: false,
      opts: undefined,
    }

    it.each(
      theUsualInputs,
    )('supports the input %p', (value, _) => {
      const param = {
        ...paramFixture,
        value,
      }
      const actual = formatter.supports(param);

      expect(actual)
        .toEqual(true);
    });

    it('supports Date', () => {
      const param = {
        ...paramFixture,
        value: aDate,
      }
      const actual = formatter.supports(param);

      expect(actual)
        .toEqual(true);
    });

    it.each(theUsualInputs)('formats %p', (value, expected) => {
      const param = {
        ...paramFixture,
        value,
      }
      const actual = formatter.formatSimple(param);

      expect(actual)
        .toEqual(expected);
    });

    it('formats a date using builtin american format', () => {
      const param = {
        ...paramFixture,
        value: aDate,
      }

      const actual = formatter.formatSimple(param);

      expect(actual)
        .toEqual('Wed Oct 19 2022 01:58:01 GMT+0200 (Central European Summer Time)');
    })
  });
});
