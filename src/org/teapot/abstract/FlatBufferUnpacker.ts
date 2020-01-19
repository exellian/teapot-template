import Pack from './Pack';

export default interface FlatBufferUnpacker<P extends Pack> {

    parse(data: Uint8Array): P;
}
