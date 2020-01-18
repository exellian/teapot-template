import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import Expression from './Expression';
import ArrayField from '../view/ArrayField';
import PrimitiveField from '../view/PrimitiveField';
import PrimitiveFieldAccessor from './PrimitiveFieldAccessor';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default class ArrayFieldAccessor implements FieldAccessor {

    private readonly innerExpression: Expression;

    private constructor(innerExpression: Expression) {
        this.innerExpression = innerExpression;
    }

    public static from(innerExpression: Expression): Unhandled<IllegalArgumentException, ArrayFieldAccessor> {
        if (!Checker.checkNotNull(innerExpression)) {
            return new Unhandled<IllegalArgumentException, ArrayFieldAccessor>(new IllegalArgumentException("Inner expression of ArrayFieldAccessor can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, ArrayFieldAccessor>(new ArrayFieldAccessor(innerExpression));
    }

    pack(): FieldAccessorPack {
        throw new Error("Method not implemented.");
    }

    private getLinkInnerExpression(): Expression {
        return this.innerExpression;
    }


    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {

        if (!ArrayFieldAccessor.checkArrayField(field)) {
			throw new InvalidViewAccessException("Array accessor can only access arrays!");
		}
        let index: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkInnerExpression().get(scope);
        if (index.isThrown()) {
            return new Unhandled<InvalidViewAccessException, Field>(index.getException());
        }
		if (!index.get().isInteger()) {
			return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Array must be accessed by integer value!"));
		}
		return field.get(scope, new PrimitiveFieldAccessor(index.get().getAsInteger()));
    }

    public static checkFormat(accessor: string): boolean {
        return (accessor.startsWith("[") && accessor.endsWith("]"));
    }

	private static checkArrayField(field: Field): boolean {
		return field instanceof ArrayField;
	}


}
