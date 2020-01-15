import Expression from './Expression';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import StringParseException from '../exception/StringParseException';
import NumberFormatException from '../exception/NumberFormatException';
import BooleanParseException from '../exception/BooleanParseException';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';

export default class Value implements Expression {

    private readonly value: number | string | boolean;

    private constructor(value: number | string | boolean) {
        if (!Checker.checkNotNull(value)) {
            throw new IllegalArgumentException("Value can not be null!");
        }
        this.value = value;
    }

    pack(): ExpressionPack {
        throw new Error("Method not implemented.");
    }

    private getValue(): number | string | boolean {
        return this.value;
    }

    public static parse(accessor: string): [boolean, Value] {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        let stringValue: Unhandled<StringParseException, string> = Value.parseString(accessor);
        if (!stringValue.isThrown()) {
            return [true, new Value(stringValue.get())];
        }
        let integerValue: Unhandled<NumberFormatException, number> = Value.parseInteger(accessor);
        if (!integerValue.isThrown()) {
            return [true, new Value(integerValue.get())];
        }
        let doubleValue: Unhandled<NumberFormatException, number> = Value.parseDouble(accessor);
        if (!doubleValue.isThrown()) {
            return [true, new Value(doubleValue.get())];
        }
        let booleanValue: Unhandled<BooleanParseException, boolean> = Value.parseBoolean(accessor);
        if (!booleanValue.isThrown()) {
            return [true, new Value(booleanValue.get())];
        }
        return [false, null];
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
