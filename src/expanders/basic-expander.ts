// noinspection JSUnusedLocalSymbols

import {type Encoder} from '../encoder';
import {type Expander, type Param} from '../expander';
import {Formatter} from '../formatter';
import {isNullish, VariableWithValues} from '../util';
import {parseArrayValues, parseObjectValues, parseSimpleValue, parseUnsupportedValues} from '../value-parsers';
import {formatVariablesWithValues} from './format-variables-with-values';

/**
 * The differing expansion options for expanders defined in RFC 6570
 *
 * See: Appendix A, Implementation hints. Allowed chars are configured in the Formatter.
 */
export interface ExpansionOpts {
  first: string,
  sep: string,
  named: boolean,
  ifemp: string,
}

export interface ExpanderConfig {
  readonly encoder: Encoder,
  readonly formatter: Formatter,
  readonly expansion: ExpansionOpts,
}

export abstract class BasicExpander<Opts = unknown> implements Expander<Opts> {
  protected constructor(
    public readonly config: ExpanderConfig,
  ) {
  }

  expand(param: Param<unknown, Opts>): string {
    if (isNullish(param.value)) {
      return this.expandNullish(param);
    }

    if (this.valueIsSimple(param)) {
      return this.expandSimple(param);
    }

    if (this.valueIsArray(param)) {
      return this.expandArray(param);
    }

    if (this.valueIsObject(param)) {
      return this.expandObject(param);
    }

    // unsupported value type, best effort
    return this.expandUnsupported(param);
  }

  protected valueIsSimple(param: Param<unknown, Opts>): boolean {
    return this.config.formatter.supports(param);
  }

  protected valueIsObject(param: Param<unknown, Opts>): param is Param<object, Opts> {
    return typeof param.value === 'object';
  }

  protected valueIsArray(param: Param<unknown, Opts>): param is Param<Array<unknown>, Opts> {
    return Array.isArray(param.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private expandNullish(param: Param<unknown, Opts>): string {
    return '';
  }

  protected expandSimple(param: Param<unknown, Opts>): string {
    const varsWithVals = parseSimpleValue(param as Param<unknown, Opts>, this.config.formatter);
    const result = this.expandVariablesWithValues(varsWithVals);

    return result;
  }

  protected expandArray(param: Param<unknown, Opts>): string {
    const varsWithVals = parseArrayValues(param as Param<unknown[], Opts>, this.config.formatter);
    const result = this.expandVariablesWithValues(varsWithVals);

    return result;
  }

  protected expandObject(param: Param<unknown, Opts>): string {
    const varsWithVals = parseObjectValues(param as Param<object | null, Opts>, this.config.formatter);
    const result = this.expandVariablesWithValues(varsWithVals, param.explode || undefined);

    return result;
  }

  protected expandUnsupported(param: Param<unknown, Opts>) {
    const varsWithVals = parseUnsupportedValues(param);
    const result = this.expandVariablesWithValues(varsWithVals);

    return result;
  }

  protected expandVariablesWithValues(varsWithVals: VariableWithValues[], namedOverride?: boolean) {
    const expanded = formatVariablesWithValues(
      varsWithVals,
      namedOverride ?? this.config.expansion.named,
      this.config.expansion.sep,
      this.config.expansion.ifemp,
      this.config.encoder,
    );

    const result = this.prependFirst(expanded);

    return result;
  }

  protected prependFirst(expanded: string) {
    const result = expanded
      ? this.config.expansion.first + expanded
      : '';

    return result;
  }
}
