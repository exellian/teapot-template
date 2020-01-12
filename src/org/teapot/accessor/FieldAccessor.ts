import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import AccessorParseException from '../exception/AccessorParseException';
import Parsable from '../util/Parsable';

export default interface FieldAccessor extends Parsable<AccessorParseException> {

	get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field>;
}
