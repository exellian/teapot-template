import Expression from "./Expression";
import AccessorParseException from '../exception/AccessorParseException';
import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import ArrayFieldAccessor from './ArrayFieldAccessor';
import FunctionFieldAccessor from './FunctionFieldAccessor';
import ObjectFieldAccessor from './ObjectFieldAccessor';
import Scope from '../view/Scope';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';

export default class Property implements Expression {

	private readonly fields: FieldAccessor[];

    private constructor(fields: FieldAccessor[]) {
        if (!Checker.checkNotNull(fields)) {
            throw new IllegalArgumentException("Fields can not be null!");
        }
        this.fields = fields;
    }

	pack(): ExpressionPack {
		throw new Error("Method not implemented.");
	}

    private getLinkFields(): FieldAccessor[] {
        return this.fields;
    }

	public static parse(accessor: string): Unhandled<AccessorParseException, Property> {

        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }

		let partsResult: Unhandled<AccessorParseException, string[]> = Property.split(accessor);
        if (partsResult.isThrown()) {
            return new Unhandled<AccessorParseException, Property>(partsResult.getException());
        }

		let fields: FieldAccessor[] = [];
        let parts: string[] = partsResult.get();

		for (let i: number = 0;i < parts.length;i++) {
            let accessor: string = parts[i];
            if (ArrayFieldAccessor.checkFormat(accessor)) {
                let afa: Unhandled<AccessorParseException, ArrayFieldAccessor> = ArrayFieldAccessor.parse(accessor);
                if (afa.isThrown()) {
                    return new Unhandled<AccessorParseException, Property>(afa.getException());
                }
                fields.push(afa.get());
            } else if (FunctionFieldAccessor.checkFormat(accessor)) {
                let ffa: Unhandled<AccessorParseException, FunctionFieldAccessor> = FunctionFieldAccessor.parse(accessor);
                if (ffa.isThrown()) {
                    return new Unhandled<AccessorParseException, Property>(ffa.getException());
                }
                fields.push(ffa.get());
            } else {
                let ofa: Unhandled<AccessorParseException, ObjectFieldAccessor> = ObjectFieldAccessor.parse(accessor);
                if (ofa.isThrown()) {
                    return new Unhandled<AccessorParseException, Property>(ofa.getException());
                }
                fields.push(ofa.get());
            }
		}
        return new Unhandled<AccessorParseException, Property>(new Property(fields));
	}

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        let aktField: Field = scope;
		for (let field of this.getLinkFields()) {
            let fieldRes: Unhandled<InvalidViewAccessException, Field> = field.get(scope, aktField);
            if (fieldRes.isThrown()) {
                return new Unhandled<InvalidViewAccessException, PrimitiveField>(fieldRes.getException());
            }
			aktField = fieldRes.get();
		}
		if (!(aktField instanceof PrimitiveField)) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("Try to access non primitve value!"));
		}
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(<PrimitiveField>aktField);
    }

    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        let aktField: Field = scope;
		for (let field of this.getLinkFields()) {
            let fieldRes: Unhandled<InvalidViewAccessException, Field> = field.get(scope, aktField);
            if (fieldRes.isThrown()) {
                return new Unhandled<InvalidViewAccessException, Field>(fieldRes.getException());
            }
			aktField = fieldRes.get();
		}
		return new Unhandled<InvalidViewAccessException, Field>(aktField);
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
