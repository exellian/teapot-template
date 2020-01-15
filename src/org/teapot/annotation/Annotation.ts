import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import Renderable from '../template/Renderable';
import RenderablePack from '../pack/RenderablePack';

export default abstract class Annotation implements Renderable {


    private readonly next: Renderable;

    protected constructor(next: Renderable) {
        this.next = next;
    }

    private getLinkNext(): Renderable {
        return this.next;
    }

    public render(scope: Scope): Unhandled<RenderException, Node> {
        return this.render0(scope, this.getLinkNext());
    }

    abstract pack(): RenderablePack;
    protected abstract render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node>;

}
