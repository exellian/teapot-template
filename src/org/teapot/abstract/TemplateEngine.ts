import Template from './Template';
import Pack from './Pack';
import Unpacker from './Unpacker';
import Parser from './Parser';
import UnpackException from '../exception/UnpackException';
import Unhandled from '../util/Unhandled';
import TemplateParseException from '../exception/TemplateParseException';

export class TemplateEngine<T extends Template<P>, P extends Pack, D extends Parser<T, P>, F extends Unpacker<T, P>> {

    private readonly unpacker: F;
    private readonly parser: D;

    protected constructor(parser: D, unpacker: F) {
        this.parser = parser;
        this.unpacker = unpacker;
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

    public toPack(template: T): P {
        return template.pack();
    }

    private getLinkParser(): D {
        return this.parser;
    }

    private getLinkUnpacker(): F {
        return this.unpacker;
    }
}
