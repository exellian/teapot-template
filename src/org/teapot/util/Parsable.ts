import Exception from '../exception/Exception';
import VoidUnhandled from './VoidUnhandled';

export default interface Parsable<E extends Exception> {

    parse(): VoidUnhandled<E>;
    isParsed(): boolean;
}
