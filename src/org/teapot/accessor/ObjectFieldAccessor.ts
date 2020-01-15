import AccessorParseException from '../exception/AccessorParseException';
import FieldAccessor from './FieldAccessor';
import Field from '../view/Field';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveFieldAccessor from './PrimitiveFieldAccessor';
import ObjectField from '../view/ObjectField';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default class ObjectFieldAccessor implements FieldAccessor {

    private readonly accessor: string;

    private constructor(accessor: string) {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        this.accessor = accessor;
    }

    pack(): FieldAccessorPack {
        throw new Error("Method not implemented.");
    }

    public getAccessor(): string {
        return this.accessor;
    }

    public static checkFormat(accessor: string): boolean {
        if (accessor.match("[a-zA-Z][a-zA-Z0-9_]*")) { return true; }
        return false;
    }

    public static parse(accessor: string): Unhandled<AccessorParseException, ObjectFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        if (!ObjectFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, ObjectFieldAccessor>(new AccessorParseException("ObjectFieldAccessor accessor must be a valid variable name format!"));
		}
        return new Unhandled<AccessorParseException, ObjectFieldAccessor>(new ObjectFieldAccessor(accessor));
    }

    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {
        if (!ObjectFieldAccessor.checkObjectField(field)) {
			return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("ObjectAccessor can only access objects!"));
		}
		return field.get(scope, new PrimitiveFieldAccessor(this.getAccessor()));
    }

	private static checkObjectField(field: Field): boolean {
		return field instanceof ObjectField || field instanceof Scope;
	}

}
