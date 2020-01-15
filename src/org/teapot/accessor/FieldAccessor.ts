import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import Packable from '../abstract/Packable';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default interface FieldAccessor extends Packable<FieldAccessorPack> {

	get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field>;
}
