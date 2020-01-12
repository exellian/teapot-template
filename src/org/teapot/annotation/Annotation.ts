import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import Parsable from '../util/Parsable';
import TemplateParseException from '../exception/TemplateParseException';
import VoidUnhandled from '../util/VoidUnhandled';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';

export default abstract class Annotation implements Renderable, Parsable<TemplateParseException> {

    private readonly next: Renderable;

    protected constructor(next: Renderable) {
        this.next = next;
    }

    private getLinkNext(): Renderable {
        return this.next;
    }

    abstract parse(): VoidUnhandled<TemplateParseException>;
    abstract isParsed(): boolean;

    public render(scope: Scope): Unhandled<RenderException, Node> {
        return this.render0(scope, this.getLinkNext());
    }

    protected abstract render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node>;
}
