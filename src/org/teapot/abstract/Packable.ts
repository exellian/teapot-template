import Pack from './Pack';

export default interface Packable<T extends Pack> {

    pack(): T;

}
