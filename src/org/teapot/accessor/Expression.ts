import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Parsable from '../util/Parsable';
import AccessorParseException from '../exception/AccessorParseException';

export default interface Expression extends Parsable<AccessorParseException> {

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField>;
	getField(scope: Scope): Unhandled<InvalidViewAccessException, Field>;
}
