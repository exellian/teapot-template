import Annotation from './Annotation';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import Renderable from '../template/Renderable';
import RenderablePack from '../pack/RenderablePack';

export default class HoverAnnotation extends Annotation {

    private constructor(next: Renderable) {
        super(next);
    }

    pack(): RenderablePack {
        throw new Error("Method not implemented.");
    }

    protected render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {
        let x: Unhandled<TemplateRenderException, Node> = next.render(scope);
        if (x.isThrown()) {
            x.reset();
            return x;
        }
        x.get().addEventListener("hover", () => {

        });
        x.reset();
    }

}
