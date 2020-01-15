import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import AccessorParseException from '../exception/AccessorParseException';
import Expression from './Expression';
import Accessor from './Accessor';
import ArrayField from '../view/ArrayField';
import PrimitiveField from '../view/PrimitiveField';
import PrimitiveFieldAccessor from './PrimitiveFieldAccessor';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default class ArrayFieldAccessor implements FieldAccessor {

    private readonly innerExpression: Expression;

    private constructor(innerExpression: Expression) {
        if (!Checker.checkNotNull(innerExpression)) {
            throw new IllegalArgumentException("Inner expression of ArrayFieldAccessor can not be null!");
        }
        this.innerExpression = innerExpression;
    }

    pack(): FieldAccessorPack {
        throw new Error("Method not implemented.");
    }

    private getLinkInnerExpression(): Expression {
        return this.innerExpression;
    }

    public static checkFormat(accessor: string): boolean {
        return (accessor.startsWith("[") && accessor.endsWith("]"));
    }

    public static parse(accessor: string): Unhandled<AccessorParseException, ArrayFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        if (!ArrayFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new AccessorParseException("ArrayFieldAccessor must be surrounded by []!"));
        }
		let innerPart: string = accessor.substring(1, accessor.length - 1);
		if (innerPart.length === 0) {
			return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new AccessorParseException("Array accessor can not be empty!"));
		}
        let innerExpression: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(innerPart);
        if (innerExpression.isThrown()) {
            return new Unhandled<AccessorParseException, ArrayFieldAccessor>(innerExpression.getException());
        }
        return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new ArrayFieldAccessor(innerExpression.get()));
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

	private static checkArrayField(field: Field): boolean {
		return field instanceof ArrayField;
	}


}
