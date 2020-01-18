import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import Renderable from './Renderable';
import Template from '../abstract/Template';
import TeapotTemplatePack from '../pack/TeapotTemplatePack';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';

export default class TeapotTemplate implements Template<TeapotTemplatePack> {

    private readonly root: Renderable;

    private constructor(root: Renderable) {
        if (!Checker.checkNotNull(root)) {
            throw new IllegalArgumentException("Root can not be null!");
        }
        this.root = root;
    }

    public static from(root: Renderable): Unhandled<IllegalArgumentException, TeapotTemplate> {
        if (!Checker.checkNotNull(root)) {
            return new Unhandled<IllegalArgumentException, TeapotTemplate>(new IllegalArgumentException("Root can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, TeapotTemplate>(new TeapotTemplate(root));
    }

    pack(): TeapotTemplatePack {
        throw new Error("Method not implemented.");
    }

    private getLinkRoot(): Renderable {
        return this.root;
    }

    public render(scope: Scope): Unhandled<TemplateRenderException, Node> {
        return this.getLinkRoot().render(scope);
    }

}
