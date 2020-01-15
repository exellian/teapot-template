import Template from './Template';
import { PackFactory } from './PackFactory';
import Pack from './Pack';

export abstract class TemplateEngine<T extends Template<P>, P extends Pack, F extends PackFactory<T, P>> {

    private readonly packFactory: F;

    protected constructor(packFactory: F) {
        this.packFactory = packFactory;
    }

    public abstract parse(html: string): T;

    public fromPack(pack: P): T {
        return this.getLinkPackFactory().from(pack);
    }
    public toPack(template: T): P {
        return template.pack();
    }

    private getLinkPackFactory(): F {
        return this.packFactory;
    }
}
