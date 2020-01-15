import Annotation from './Annotation';
import Scope from '../view/Scope';
import TemplateParseException from '../exception/TemplateParseException';
import Accessor from '../accessor/Accessor';
import AccessorParseException from '../exception/AccessorParseException';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Renderable from '../template/Renderable';
import RenderablePack from '../pack/RenderablePack';

export default class IfAnnotation extends Annotation {

    private readonly accessor: Accessor;

    private constructor(accessor: Accessor, next: Renderable) {
        if (Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        if (Checker.checkNotNull(next)) {
            throw new IllegalArgumentException("Next can not be null!");
        }
        super(next);
        this.accessor = accessor;
    }

    pack(): RenderablePack {
        throw new Error("Method not implemented.");
    }

    private getLinkAccessor(): Accessor {
        return this.accessor;
    }

    public static parse(expression: string, next: Renderable): Unhandled<TemplateParseException, IfAnnotation> {

        if (Checker.checkNotNull(expression)) {
            throw new IllegalArgumentException("Expression can not be null!");
        }
        if (Checker.checkNotNull(next)) {
            throw new IllegalArgumentException("Next can not be null!");
        }
        let accessor: Unhandled<AccessorParseException, Accessor> = Accessor.parse(expression);
        if (accessor.isThrown()) {
            return new Unhandled<TemplateParseException, IfAnnotation>(accessor.getException());
        }
        return new Unhandled<TemplateParseException, IfAnnotation>(new IfAnnotation(accessor.get(), next));
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
