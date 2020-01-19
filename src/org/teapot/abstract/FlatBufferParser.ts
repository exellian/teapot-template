import Pack from './Pack';

export default interface FlatBufferParser<P extends Pack> {

    parse(data: Uint8Array): P;
}
