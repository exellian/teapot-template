import Annotation from './Annotation';
import Scope from '../view/Scope';
import Accessor from '../accessor/Accessor';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Renderable from '../template/Renderable';
import RenderablePack from '../pack/RenderablePack';
import TeapotPackType from '../pack/TeapotPackType';

export default class IfAnnotation extends Annotation {

    private readonly accessor: Accessor;

    private constructor(accessor: Accessor, next: Renderable) {
        super(next);
        this.accessor = accessor;
    }

    public static from(accessor: Accessor, next: Renderable): Unhandled<IllegalArgumentException, IfAnnotation> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<IllegalArgumentException, IfAnnotation>(new IllegalArgumentException("Accessor can not be null!"));
        }
        if (!Checker.checkNotNull(next)) {
            return new Unhandled<IllegalArgumentException, IfAnnotation>(new IllegalArgumentException("Next can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, IfAnnotation>(new IfAnnotation(accessor, next));
    }

    pack(): RenderablePack {
        let pack: RenderablePack = new RenderablePack(TeapotPackType.IF);
        pack.accessor = this.getLinkAccessor().pack();
        pack.next = this.getLinkNext().pack();
        return pack;
    }

    private getLinkAccessor(): Accessor {
        return this.accessor;
    }

    protected render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {

        let condition: Unhandled<InvalidViewAccessException, PrimitiveField>
            = this.getLinkAccessor().getPrimitveField(scope);
        if (condition.isThrown()) {
            return new Unhandled<TemplateRenderException, Node>(condition.getException());
        }
        if (!condition.get().isBoolean()) {
            return new Unhandled<TemplateRenderException, Node>(new TemplateRenderException("If condition must be of type boolean!"));
        }
		if (<boolean>condition.get().getAsBoolean()) {
			return next.render(scope);
		}
		return new Unhandled<TemplateRenderException, Node>(document.createTextNode(""));
    }

}
