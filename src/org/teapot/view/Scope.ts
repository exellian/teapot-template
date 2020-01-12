import Field from './Field';
import PrimitiveFieldAccessor from '../accessor/PrimitiveFieldAccessor';
import ObjectField from './ObjectField';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';

export default class Scope implements Field {

    private readonly parent: Scope;
    private readonly root: ObjectField;

    public constructor(root: ObjectField, parent?: Scope) {
        this.parent = (parent) ? parent : null;
        this.root = root;
        this.newScope = this.newScope.bind(this);
    }

    get(scope: Scope, accessor: PrimitiveFieldAccessor): Unhandled<InvalidViewAccessException, Field> {
        let ret: Unhandled<InvalidViewAccessException, Field> = this.getLinkRoot().get(scope, accessor);

        if (ret.isThrown()) {
            ret.reset();
            return ret;
        }
        let field: Field = ret.get();

        if (field === undefined && this.getLinkParent() === null) {
            return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Property not found!"));
        }
		if (field === undefined) {
			return this.getLinkParent().get(scope, accessor);
		}

        ret.reset();
		return ret;
    }

    public newScope(root: ObjectField): Scope {
    	return new Scope(root, this);
    }
    private getLinkParent(): Scope {
		return this.parent;
	}

	private getLinkRoot(): ObjectField {
		return this.root;
	}

}
