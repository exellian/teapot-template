import Expression from "./Expression";
import AccessorParseException from '../exception/AccessorParseException';
import Parsable from '../util/Parsable';
import FieldAccessor from './FieldAccessor';
import VoidUnhandled from '../util/VoidUnhandled';
import Unhandled from '../util/Unhandled';
import ArrayFieldAccessor from './ArrayFieldAccessor';
import FunctionFieldAccessor from './FunctionFieldAccessor';
import ObjectFieldAccessor from './ObjectFieldAccessor';
import Scope from '../view/Scope';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';

export default class Property implements Expression {

    private readonly accessor: string;
	private parsed: boolean;

	private fields: FieldAccessor[];

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    public constructor(accessor: string) {
        this.accessor = accessor;
		this.setParsed(false);
    }

    private getAccessor(): string {
        return this.accessor;
    }

	private setLinkFields(fields: FieldAccessor[]): void {
		this.fields = fields;
	}

    public getLinkFields(): FieldAccessor[] {
        return this.fields;
    }

	parse(): VoidUnhandled<AccessorParseException> {
		let partsRes: Unhandled<AccessorParseException, string[]> = Property.split(this.getAccessor());

        if (partsRes.isThrown()) {
            return new VoidUnhandled<AccessorParseException>(partsRes.getException());
        }

		let fields: FieldAccessor[] = [];
        let parts: string[] = partsRes.get();

        var res: VoidUnhandled<AccessorParseException> = null;
		for (var i: number = 0;i < parts.length;i++) {
			let field0: ArrayFieldAccessor = new ArrayFieldAccessor(parts[i]);
            res = field0.parse();
            if (res.isThrown()) {
                res.reset();
                return res;
            }
            if (field0.isParsed()) {
                fields.push(field0);
                continue;
            }
            let field1: FunctionFieldAccessor = new FunctionFieldAccessor(parts[i]);
            res = field1.parse();
            if (res.isThrown()) {
                res.reset();
                return res;
            }
            if (field1.isParsed()) {
                fields.push(field1);
                continue;
            }
            let field2: ObjectFieldAccessor = new ObjectFieldAccessor(parts[i]);
            res = field2.parse();
            if (res.isThrown()) {
                res.reset();
                return res;
            }
            if (field2.isParsed()) {
                fields.push(field2);
                continue;
            }
            return new VoidUnhandled<AccessorParseException>(new AccessorParseException("Failed to parse accessor!"));
		}
		this.setLinkFields(fields);
		this.setParsed(true);
        return new VoidUnhandled<AccessorParseException>();
	}

	isParsed(): boolean {
		return this.parsed;
	}

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        var aktField: Field = scope;
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
        var aktField: Field = scope;
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

		var edgedBracketDepth: number = 0;
		var roundBracketDepth: number = 0;
		var part: string = "";
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
