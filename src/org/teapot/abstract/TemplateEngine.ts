import Template from './Template';
import Pack from './Pack';
import Unpacker from './Unpacker';
import Parser from './Parser';
import UnpackException from '../exception/UnpackException';
import Unhandled from '../util/Unhandled';
import TemplateParseException from '../exception/TemplateParseException';
import FlatBufferUnpacker from './FlatBufferUnpacker';

export class TemplateEngine<T extends Template<P>, P extends Pack, D extends Parser<T, P>, F extends Unpacker<T, P>, FP extends FlatBufferUnpacker<P>> {

    private readonly unpacker: F;
    private readonly parser: D;
    private readonly flatBufferParser: FP;

    protected constructor(parser: D, unpacker: F, flatBufferParser: FP) {
        this.parser = parser;
        this.unpacker = unpacker;
        this.flatBufferParser = flatBufferParser;
    }

    public parse(html: string): Unhandled<TemplateParseException, T> {
        return this.getLinkParser().parse(html);
    }

    public fromPack(pack: P): Unhandled<UnpackException, T> {
        return this.getLinkUnpacker().from(pack);
    }

    public fromJSON(json: string): Unhandled<UnpackException, T> {
        return this.fromPack(JSON.parse(json));
    }

    public fromFlatBuffer(data: Uint8Array): Unhandled<UnpackException, T> {
        let pack: P = this.getLinkFlatBufferParser().parse(data);
        return this.fromPack(pack);
    }

    public toPack(template: T): P {
        return template.pack();
    }

    private getLinkParser(): D {
        return this.parser;
    }

    private getLinkUnpacker(): F {
        return this.unpacker;
    }

    private getLinkFlatBufferParser(): FP {
        return this.flatBufferParser;
    }
}
