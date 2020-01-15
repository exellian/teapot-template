import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Packable from '../abstract/Packable';
import ExpressionPack from '../pack/ExpressionPack';

export default interface Expression extends Packable<ExpressionPack> {

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField>;
	getField(scope: Scope): Unhandled<InvalidViewAccessException, Field>;
    
}
