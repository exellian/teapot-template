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
import TeapotPackType from '../pack/TeapotPackType';

export default class ObjectFieldAccessor implements FieldAccessor {

    private readonly accessor: string;

    private constructor(accessor: string) {
        this.accessor = accessor;
    }

    public static from(accessor: string): Unhandled<IllegalArgumentException, ObjectFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<IllegalArgumentException, ObjectFieldAccessor>(new IllegalArgumentException("Accessor can not be null!"));
        }
        if (!ObjectFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<IllegalArgumentException, ObjectFieldAccessor>(new IllegalArgumentException("Accessor format invalid!"));
        }
        return new Unhandled<IllegalArgumentException, ObjectFieldAccessor>(new ObjectFieldAccessor(accessor));
    }

    pack(): FieldAccessorPack {
        let pack: FieldAccessorPack = new FieldAccessorPack(TeapotPackType.OBJECT_FIELD_ACCESSOR);
        pack.accessor = this.getAccessor();
        return pack;
    }

    public getAccessor(): string {
        return this.accessor;
    }

    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {
        if (!ObjectFieldAccessor.checkObjectField(field)) {
			return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("ObjectAccessor can only access objects!"));
		}
		return field.get(scope, new PrimitiveFieldAccessor(this.getAccessor()));
    }

    public static checkFormat(accessor: string): boolean {
        if (accessor.match("[a-zA-Z][a-zA-Z0-9_]*")) { return true; }
        return false;
    }

	private static checkObjectField(field: Field): boolean {
		return field instanceof ObjectField || field instanceof Scope;
	}

}
