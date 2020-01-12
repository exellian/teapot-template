import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import AccessorParseException from '../exception/AccessorParseException';
import Parsable from '../util/Parsable';
import VoidUnhandled from '../util/VoidUnhandled';
import Expression from './Expression';
import Accessor from './Accessor';
import PrimitiveField from '../view/PrimitiveField';
import FunctionField from '../view/FunctionField';

export default class FunctionFieldAccessor implements FieldAccessor {

    private readonly accessor: string;

    private readonly parameters: Expression[] = [];

    private parsed: boolean;

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    public constructor(accessor: string) {
        this.accessor = accessor;
        this.setParsed(false);
    }

    public getLinkParameters(): Expression[] {
        return this.parameters;
    }

    private getAccessor(): string {
        return this.accessor;
    }

    parse(): VoidUnhandled<AccessorParseException> {

        if (!this.getAccessor().startsWith("(") || !this.getAccessor().endsWith(")")) {
			return new VoidUnhandled<AccessorParseException>();
		}
		let funcParts: string[] = FunctionFieldAccessor.split(this.getAccessor());
		for (let param of funcParts) {
            let expr: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(param);
            if (expr.isThrown()) {
                return new VoidUnhandled<AccessorParseException>(expr.getException());
            }
			this.getLinkParameters().push(expr.get());
		}
        this.setParsed(true);
		return new VoidUnhandled<AccessorParseException>();
    }

    isParsed(): boolean {
        return this.parsed;
    }

    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {
        if (!FunctionFieldAccessor.checkFunctionField(field)) {
            return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("FunctionFieldAccessor can only access functions!"));
		}
		let params: any[] = [];
		var i: number = 0;
		for (let e of this.getLinkParameters()) {
            let param: Unhandled<InvalidViewAccessException, PrimitiveField> = e.get(scope);
            if (param.isThrown()) {
                return new Unhandled<InvalidViewAccessException, Field>(param.getException());
            }
			params[i++] = param.get().getValue();
		}
		let returnField: Field = (<FunctionField>field).execute(params);
		if (returnField === null || returnField === undefined) {
            return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Returned field cannot be null or undefined!"));
		}
		return new Unhandled<InvalidViewAccessException, Field>(returnField);
    }

    private static split(accessor: string): string[] {

		let parts: string[] = [];
		let chars: string[] = accessor.split("");
		var part: string = "";
		var roundedBracketDepth: number = 0;
		for (let c of chars) {
			if (c === '(') {
				roundedBracketDepth++;
				continue;
			} else if (c === ')' && --roundedBracketDepth === 0) {
				if (part.length !== 0) {
                    parts.push(part);
					part = "";
				}
				continue;
			} else if (c === ',' && roundedBracketDepth === 1) {
				parts.push(part);
				part = "";
				continue;
			}
			part += c;
		}
		return parts;
	}

	private static checkFunctionField(field: Field): boolean {
		return field instanceof FunctionField;
	}

}
