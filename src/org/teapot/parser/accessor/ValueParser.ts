import Value from '../../accessor/Value';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import Unhandled from '../../util/Unhandled';
import StringParseException from '../../exception/StringParseException';
import NumberFormatException from '../../exception/NumberFormatException';
import BooleanParseException from '../../exception/BooleanParseException';
import AccessorParseException from '../../exception/AccessorParseException';

export default class ValueParser {

    public static parse(accessor: string): Unhandled<AccessorParseException, [boolean, Value]> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, [boolean, Value]>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }
        let stringValue: Unhandled<StringParseException, string> = ValueParser.parseString(accessor);
        if (!stringValue.isThrown()) {
            let value: Unhandled<IllegalArgumentException, Value> = Value.from(stringValue.get());

            if (value.isThrown()) {
                return new Unhandled<AccessorParseException, [boolean, Value]>(new AccessorParseException(value.getException()));
            }
            return new Unhandled<AccessorParseException, [boolean, Value]>([true, value.get()]);
        }
        let integerValue: Unhandled<NumberFormatException, number> = ValueParser.parseInteger(accessor);
        if (!integerValue.isThrown()) {
            let value: Unhandled<IllegalArgumentException, Value> = Value.from(integerValue.get());
            if (value.isThrown()) {
                return new Unhandled<AccessorParseException, [boolean, Value]>(new AccessorParseException(value.getException()));
            }
            return new Unhandled<AccessorParseException, [boolean, Value]>([true, value.get()]);
        }
        let doubleValue: Unhandled<NumberFormatException, number> = ValueParser.parseDouble(accessor);
        if (!doubleValue.isThrown()) {
            let value: Unhandled<IllegalArgumentException, Value> = Value.from(doubleValue.get());
            if (value.isThrown()) {
                return new Unhandled<AccessorParseException, [boolean, Value]>(new AccessorParseException(value.getException()));
            }
            return new Unhandled<AccessorParseException, [boolean, Value]>([true, value.get()]);
        }
        let booleanValue: Unhandled<BooleanParseException, boolean> = ValueParser.parseBoolean(accessor);
        if (!booleanValue.isThrown()) {
            let value: Unhandled<IllegalArgumentException, Value> = Value.from(booleanValue.get());
            if (value.isThrown()) {
                return new Unhandled<AccessorParseException, [boolean, Value]>(new AccessorParseException(value.getException()));
            }
            return new Unhandled<AccessorParseException, [boolean, Value]>([true, value.get()]);
        }
        return new Unhandled<AccessorParseException, [boolean, Value]>([false, null]);
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
