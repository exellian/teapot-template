import Annotation from './Annotation';
import Scope from '../view/Scope';
import TemplateRenderException from '../exception/TemplateRenderException';
import Unhandled from '../util/Unhandled';
import Renderable from '../template/Renderable';
import RenderablePack from '../pack/RenderablePack';
import TeapotPackType from '../pack/TeapotPackType';

export default class ClickAnnotation extends Annotation {

    private readonly expression: string;

    private constructor(expression: string, next: Renderable) {
        super(next);
        this.expression = expression;
    }

    pack(): RenderablePack {
        throw new Error("Method not implemented.");
    }

    private getExpression(): string {
        return this.expression;
    }

    protected render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {
        let x: Unhandled<TemplateRenderException, Node> = next.render(scope);
        if (x.isThrown()) {
            x.reset();
            return x;
        }
        x.get().addEventListener("click", () => {

        });
        x.reset();
    }

}
