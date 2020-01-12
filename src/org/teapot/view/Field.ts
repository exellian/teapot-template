import Scope from './Scope';
import PrimitiveFieldAccessor from '../accessor/PrimitiveFieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';

export default interface Field {

    get(scope: Scope, accessor: PrimitiveFieldAccessor): Unhandled<InvalidViewAccessException, Field>;
}
