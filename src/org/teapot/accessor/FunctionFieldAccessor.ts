import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import AccessorParseException from '../exception/AccessorParseException';
import Expression from './Expression';
import Accessor from './Accessor';
import PrimitiveField from '../view/PrimitiveField';
import FunctionField from '../view/FunctionField';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default class FunctionFieldAccessor implements FieldAccessor {

    private readonly parameters: Expression[];

    private constructor(parameters: Expression[]) {
        if (!Checker.checkNotNull(parameters)) {
            throw new IllegalArgumentException("Inner expression of Brackets can not be null!");
        }
        this.parameters = parameters;
    }

    pack(): FieldAccessorPack {
        throw new Error("Method not implemented.");
    }

    private getLinkParameters(): Expression[] {
        return this.parameters;
    }

    public static checkFormat(accessor: string): boolean {
        return (accessor.startsWith("(") && accessor.endsWith(")"));
    }

    public static parse(accessor: string): Unhandled<AccessorParseException, FunctionFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        if (!FunctionFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, FunctionFieldAccessor>(new AccessorParseException("FunctionFieldAccessor must be surrounded by ()!"));
        }
        let parameters: Expression[] = [];
		let funcParts: string[] = FunctionFieldAccessor.split(accessor);
		for (let param of funcParts) {
            let expr: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(param);
            if (expr.isThrown()) {
                return new Unhandled<AccessorParseException, FunctionFieldAccessor>(expr.getException());
            }
			parameters.push(expr.get());
		}
		return new Unhandled<AccessorParseException, FunctionFieldAccessor>(new FunctionFieldAccessor(parameters));
    }

    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {
        if (!FunctionFieldAccessor.checkFunctionField(field)) {
            return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("FunctionFieldAccessor can only access functions!"));
		}
		let params: any[] = [];
		let i: number = 0;
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
		let part: string = "";
		let roundedBracketDepth: number = 0;
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
