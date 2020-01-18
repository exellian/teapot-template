import Unhandled from '../../util/Unhandled';
import AccessorParseException from '../../exception/AccessorParseException';
import Property from '../../accessor/Property';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import FieldAccessor from '../../accessor/FieldAccessor';
import ArrayFieldAccessorParser from './ArrayFieldAccessorParser';
import ArrayFieldAccessor from '../../accessor/ArrayFieldAccessor';
import FunctionFieldAccessor from '../../accessor/FunctionFieldAccessor';
import FunctionFieldAccessorParser from './FunctionFieldAccessorParser';
import ObjectFieldAccessorParser from './ObjectFieldAccessorParser';
import ObjectFieldAccessor from '../../accessor/ObjectFieldAccessor';

export default class PropertyParser {

    public static parse(accessor: string): Unhandled<AccessorParseException, Property> {

        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, Property>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }

		let partsResult: Unhandled<AccessorParseException, string[]> = PropertyParser.split(accessor);
        if (partsResult.isThrown()) {
            return new Unhandled<AccessorParseException, Property>(partsResult.getException());
        }

		let fields: FieldAccessor[] = [];
        let parts: string[] = partsResult.get();

		for (let i: number = 0;i < parts.length;i++) {
            let accessor: string = parts[i];
            if (ArrayFieldAccessor.checkFormat(accessor)) {
                let afa: Unhandled<AccessorParseException, ArrayFieldAccessor> = ArrayFieldAccessorParser.parse(accessor);
                if (afa.isThrown()) {
                    return new Unhandled<AccessorParseException, Property>(afa.getException());
                }
                fields.push(afa.get());
            } else if (FunctionFieldAccessor.checkFormat(accessor)) {
                let ffa: Unhandled<AccessorParseException, FunctionFieldAccessor> = FunctionFieldAccessorParser.parse(accessor);
                if (ffa.isThrown()) {
                    return new Unhandled<AccessorParseException, Property>(ffa.getException());
                }
                fields.push(ffa.get());
            } else {
                let ofa: Unhandled<AccessorParseException, ObjectFieldAccessor> = ObjectFieldAccessorParser.parse(accessor);
                if (ofa.isThrown()) {
                    return new Unhandled<AccessorParseException, Property>(ofa.getException());
                }
                fields.push(ofa.get());
            }
		}
        let property: Unhandled<IllegalArgumentException, Property> = Property.from(fields);
        if (property.isThrown()) {
            return new Unhandled<AccessorParseException, Property>(new AccessorParseException(property.getException()));
        }
        return new Unhandled<AccessorParseException, Property>(property.get());
	}

    private static split(accessorName: string): Unhandled<AccessorParseException, string[]> {

        let parts: string[] = [];
		let chars: string[] = accessorName.split("");

		let edgedBracketDepth: number = 0;
		let roundBracketDepth: number = 0;
		let part: string = "";
		for (let c of chars) {
			if (c === '.' && roundBracketDepth === 0 && edgedBracketDepth === 0) {
				parts.push(part);
				part = "";
				continue;
			} else if (c === '(' && roundBracketDepth++ === 0) {
				parts.push(part);
				part = "";
			} else if (c === ')') {
				roundBracketDepth--;
			} else if (c === '[' && edgedBracketDepth++ === 0 && roundBracketDepth === 0) {
				parts.push(part);
				part = "";
			} else if (c === ']') {
				edgedBracketDepth--;
			}
			part += c;
		}
		parts.push(part);

		if (edgedBracketDepth !== 0) {
			return new Unhandled<AccessorParseException, string[]>(new AccessorParseException("Invalid expression! Do you forget to close a brackets \"]\""));
		}
		if (roundBracketDepth !== 0) {
			return new Unhandled<AccessorParseException, string[]>(new AccessorParseException("Invalid expression! Do you forget to close a brackets \")\""));
		}
		return new Unhandled<AccessorParseException, string[]>(parts);
	}
}
