import Pack from './Pack';
import Packable from './Packable';

export interface PackFactory<P extends Packable<T>, T extends Pack> {

    from(pack: T): P;

}
