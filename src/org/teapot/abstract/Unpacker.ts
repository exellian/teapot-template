import Pack from './Pack';
import Packable from './Packable';
import Unhandled from '../util/Unhandled';
import UnpackException from '../exception/UnpackException';

export default interface Unpacker<P extends Packable<T>, T extends Pack> {

    from(pack: T): Unhandled<UnpackException, P>;

}
