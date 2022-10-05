import {type Encoder} from '../encoder';
import {type Expander, type Param} from '../expander';
import {Formatter} from '../formatter';
import {
  formatVariablesWithValues,
  isNullish,
  join,
  parseArrayValues,
  parseObjectValues,
  VariableNameFormat,
} from '../util';

export interface ExpanderConfig {
  readonly encoder: Encoder,
  readonly formatter: Formatter,
}

export interface Separators {
  readonly variable: string;
  readonly assignment: string;
  readonly listEntry: string;
}

export abstract class BasicExpander<Opts = unknown> implements Expander<Opts> {
  protected constructor(
    public readonly config: ExpanderConfig,
    public readonly variableNameFormat: VariableNameFormat,
    public readonly separators: Separators,
  ) {
  }

  protected encode(value: string): string {
    return this.config.encoder.encode(value);
  }

  protected expandVariablesWithValues(varsWithVals: Array<{ name: string; values: Array<string> }>) {
    return formatVariablesWithValues(
      varsWithVals,
      this.variableNameFormat,
      this.separators.variable,
      this.separators.listEntry,
      this.separators.assignment,
      this.config.encoder,
    );
  }

  expand(param: Readonly<Param<unknown, Opts>>): string {
    if (isNullish(param.value)) {
      return '';
    }

    if (this.isSimpleValue(param)) {
      return this.expandSimple(param);
    }

    // FIXME: review: are all names/values encoded everywhere?
    // FIXME: review: call simpleFormatter on array/object values?

    if (Array.isArray(param.value)) {
      return this.expandArray(param);
    }

    if (typeof param.value === 'object') {
      return this.expandObject(param);
    }

    // unsupported value type, best effort
    return this.expandUnsupportedFallback(param);
  }

  protected isSimpleValue(param: Readonly<Param<unknown, Opts>>): boolean {
    return this.config.formatter.supports(param);
  }

  // expandSimple is just a special case for an array with one entry
  protected expandSimple(param: Readonly<Param<unknown, Opts>>): string {
    const varName = this.encode(this.expandName(param));
    const varValue = this.encode(this.config.formatter.formatSimple(param));
    const variable = join(this.separators.assignment, varName, varValue);

    const result = `${this.separators.variable}${variable}`;

    return result;
  }

  protected expandName(param: Readonly<Param<unknown, Opts>>): string {
    switch (this.variableNameFormat) {
      case 'prefix':
        return param.name;
      case 'skip':
        return '';
    }
  }

  protected expandArray(param: Readonly<Param<unknown, Opts>>): string {
    const varsWithVals = parseArrayValues(param as Param<unknown[], Opts>, this.config.formatter);
    const result = this.expandVariablesWithValues(varsWithVals);

    return result;
  }

  protected expandObject(param: Readonly<Param<unknown, Opts>>): string {
    const varsWithVals = parseObjectValues(param as Param<object | null, Opts>, this.config.formatter);
    const result = this.expandVariablesWithValues(varsWithVals);

    return result;
  }

  protected expandUnsupportedFallback(param: Readonly<Param<unknown, Opts>>) {
    return `${this.separators.variable}${this.encode(param.name)}=${this.encode(String(param.value))}`;
  }
}
