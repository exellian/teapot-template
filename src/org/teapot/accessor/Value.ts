import Expression from './Expression';
import AccessorParseException from '../exception/AccessorParseException';
import Parsable from '../util/Parsable';
import VoidUnhandled from '../util/VoidUnhandled';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import StringParseException from '../exception/StringParseException';
import NumberFormatException from '../exception/NumberFormatException';
import BooleanParseException from '../exception/BooleanParseException';

export default class Value implements Expression {

    private readonly accessor: string;

    private value: number | string | boolean;

    private parsed: boolean;

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    public constructor(accessor: string) {
        this.accessor = accessor;
        this.setParsed(false);
    }

    private setValue(value: number | string | boolean): void {
        this.value = value;
    }

    public getValue(): number | string | boolean {
        return this.value;
    }

    private getAccessor(): string {
        return this.accessor;
    }

    parse(): VoidUnhandled<AccessorParseException> {
        let res0: Unhandled<StringParseException, string> = Value.parseString(this.getAccessor());
        if (!res0.isThrown()) {
            this.setValue(res0.get());
            this.setParsed(true);
            return new VoidUnhandled<AccessorParseException>();
        }
        let res1: Unhandled<NumberFormatException, number> = Value.parseInteger(this.getAccessor());
        if (!res1.isThrown()) {
            this.setValue(res1.get());
            this.setParsed(true);
            return new VoidUnhandled<AccessorParseException>();
        }
        let res2: Unhandled<NumberFormatException, number> = Value.parseDouble(this.getAccessor());
        if (!res2.isThrown()) {
            this.setValue(res2.get());
            this.setParsed(true);
            return new VoidUnhandled<AccessorParseException>();
        }
        let res3: Unhandled<BooleanParseException, boolean> = Value.parseBoolean(this.getAccessor());
        if (!res3.isThrown()) {
            this.setValue(res3.get());
            this.setParsed(true);
            return new VoidUnhandled<AccessorParseException>();
        }
        return new VoidUnhandled<AccessorParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
    }


    get(_scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(this.getValue()));
    }
    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        return this.getField(scope);
    }

    private static parseString(accessor: string): Unhandled<StringParseException, string> {
		let start: string = accessor.charAt(0);
		let end: string = accessor.charAt(accessor.length - 1);
		if (start !== '"' || end !== '"') {
            return new Unhandled<StringParseException, string>(new StringParseException("String doesn't contain \"\""));
		}
		let rest: string = accessor.substring(1, accessor.length - 1);
		let index: number = rest.indexOf('"');
		while (index !== -1) {
			if (((index - 1) < 0) || (rest.charAt(index - 1) !== '\\')) {
                return new Unhandled<StringParseException, string>(new StringParseException("String is not escaped!"));
			}
			rest = rest.replace("\\\"", "\"");
		}
		return new Unhandled<StringParseException, string>(rest);
	}

	private static parseInteger(accessor: string): Unhandled<NumberFormatException, number> {
        let res: number = Number(accessor);
        if (Number.isNaN(res)) {
            return new Unhandled<NumberFormatException, number>(new NumberFormatException("Given string represents not a number!"));
        }
        if (!Number.isInteger(res)) {
            return new Unhandled<NumberFormatException, number>(new NumberFormatException("Given string represents not an integer!"));
        }
		return new Unhandled<NumberFormatException, number>(res);
	}

	private static parseDouble(accessor: string): Unhandled<NumberFormatException, number> {
        let res: number = Number(accessor);
        if (Number.isNaN(res)) {
            return new Unhandled<NumberFormatException, number>(new NumberFormatException("Given string represents not a number!"));
        }
        if (Number.isInteger(res)) {
            return new Unhandled<NumberFormatException, number>(new NumberFormatException("Given string represents not an integer!"));
        }
		return new Unhandled<NumberFormatException, number>(res);
	}

	private static parseBoolean(accessor: string): Unhandled<BooleanParseException, boolean> {
		if (accessor === "true") {
			return new Unhandled<BooleanParseException, boolean>(true);
		}
		if (accessor === "false") {
			return new Unhandled<BooleanParseException, boolean>(false);
		}
		return new Unhandled<BooleanParseException, boolean>(new BooleanParseException("Failed to parse boolean value!"));
	}


}
