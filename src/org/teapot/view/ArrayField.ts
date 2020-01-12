import Field from './Field';
import Scope from './Scope';
import PrimitiveFieldAccessor from '../accessor/PrimitiveFieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';

export default class ArrayField implements Field, Iterable<Field> {

    private readonly fields: Array<Field> = [];

    [Symbol.iterator](): Iterator<Field> {
        return this.getLinkFields()[Symbol.iterator]();
    }

    get(_scope: Scope, accessor: PrimitiveFieldAccessor): Unhandled<InvalidViewAccessException, Field> {
        if (!accessor.isInteger()) {
            return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Given field accessor has to be an Integer on type Array!"));
        }
        return new Unhandled<InvalidViewAccessException, Field>(this.getLinkFields()[accessor.getAsInteger()]);
    }

    public addLinkField(field: Field): void {
        this.getLinkFields().push(field);
    }

    public setLinkField(index: number, field: Field): void {
        if (!Number.isInteger(index)) {
            throw new Error("Arrays can only have integer indices!");
        }
        this.getLinkFields()[index] = field;
    }

    public getLinkFields(): Array<Field> {
        return this.fields;
    }

}
