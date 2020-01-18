import Unhandled from '../../util/Unhandled';
import AccessorParseException from '../../exception/AccessorParseException';
import ObjectFieldAccessor from '../../accessor/ObjectFieldAccessor';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';

export default class ObjectFieldAccessorParser {

    public static parse(accessor: string): Unhandled<AccessorParseException, ObjectFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, ObjectFieldAccessor>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }
        if (!ObjectFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, ObjectFieldAccessor>(new AccessorParseException("ObjectFieldAccessor accessor must be a valid variable name format!"));
		}
        let objectFieldAccessor: Unhandled<IllegalArgumentException, ObjectFieldAccessor> = ObjectFieldAccessor.from(accessor);
        if (objectFieldAccessor.isThrown()) {
            return new Unhandled<AccessorParseException, ObjectFieldAccessor>(new AccessorParseException(objectFieldAccessor.getException()));
        }
        return new Unhandled<AccessorParseException, ObjectFieldAccessor>(objectFieldAccessor.get());
    }
}
