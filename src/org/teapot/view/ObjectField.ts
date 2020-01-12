import Field from './Field';
import Scope from './Scope';
import PrimitiveFieldAccessor from '../accessor/PrimitiveFieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';

export default class ObjectField implements Field {

    private readonly fields: Map<string, Field> = new Map<string, Field>();

    get(_scope: Scope, accessor: PrimitiveFieldAccessor): Unhandled<InvalidViewAccessException, Field> {
        if (!accessor.isString()) {
            return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Given field accessor has to be a String on type Object!"));
        }
        return new Unhandled<InvalidViewAccessException, Field>(this.getLinkFields().get(accessor.getAsString()));
    }

	public setLinkField(name: string, field: Field): void {
		if (name == null) {
			throw new Error("Property name cannot be null!");
		}
		if (name.length === 0) {
			throw new Error("Property name cannot be empty!");
		}
		this.getLinkFields().set(name, field);
	}

    private getLinkFields(): Map<string, Field> {
        return this.fields;
    }

}
