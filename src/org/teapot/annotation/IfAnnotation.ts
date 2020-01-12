import Annotation from './Annotation';
import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import TemplateParseException from '../exception/TemplateParseException';
import VoidUnhandled from '../util/VoidUnhandled';
import Accessor from '../accessor/Accessor';
import AccessorParseException from '../exception/AccessorParseException';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';

export default class IfAnnotation extends Annotation {

    private readonly expression: string;
    private parsed: boolean;

    private accessor: Accessor;

    public constructor(expression: string, next: Renderable) {
        super(next);
        this.expression = expression;
        this.setParsed(false);
    }

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    private getExpression(): string {
        return this.expression;
    }

    private setAccessor(accessor: Accessor): void {
        this.accessor = accessor;
    }

    public getAccessor(): Accessor {
        return this.accessor;
    }

    parse(): VoidUnhandled<TemplateParseException> {
        let accessor: Accessor = new Accessor(this.getExpression());
        let res: VoidUnhandled<AccessorParseException> = accessor.parse();
        if (res.isThrown()) {
            return new VoidUnhandled<TemplateParseException>(res.get());
        }
        this.setAccessor(accessor);
        this.setParsed(true);
        return new VoidUnhandled<TemplateParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
    }

    protected render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {

        let condition: Unhandled<InvalidViewAccessException, PrimitiveField>
            = this.getAccessor().getPrimitveField(scope);
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
