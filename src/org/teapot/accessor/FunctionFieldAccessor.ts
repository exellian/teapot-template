import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import Expression from './Expression';
import PrimitiveField from '../view/PrimitiveField';
import FunctionField from '../view/FunctionField';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import FieldAccessorPack from '../pack/FieldAccessorPack';
import TeapotPackType from '../pack/TeapotPackType';
import ExpressionPack from '../pack/ExpressionPack';

export default class FunctionFieldAccessor implements FieldAccessor {

    private readonly parameters: Expression[];

    private constructor(parameters: Expression[]) {
        this.parameters = parameters;
    }

    public static from(parameters: Expression[]): Unhandled<IllegalArgumentException, FunctionFieldAccessor> {
        if (!Checker.checkNotNull(parameters)) {
            return new Unhandled<IllegalArgumentException, FunctionFieldAccessor>(new IllegalArgumentException("Parameters of FunctionFieldAccessor can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, FunctionFieldAccessor>(new FunctionFieldAccessor(parameters));
    }

    pack(): FieldAccessorPack {
        let pack: FieldAccessorPack = new FieldAccessorPack(TeapotPackType.FUNCTION_FIELD_ACCESSOR);
        let packs: ExpressionPack[] = [];
        for (let param of this.getLinkParameters()) {
            packs.push(param.pack());
        }
        pack.parameters = packs;
        return pack;
    }

    private getLinkParameters(): Expression[] {
        return this.parameters;
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

    public static checkFormat(accessor: string): boolean {
        return (accessor.startsWith("(") && accessor.endsWith(")"));
    }

	private static checkFunctionField(field: Field): boolean {
		return field instanceof FunctionField;
	}

}
