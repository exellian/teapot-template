import Annotation from './Annotation';
import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import TemplateParseException from '../exception/TemplateParseException';
import VoidUnhandled from '../util/VoidUnhandled';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';

export default class InputAnnotation extends Annotation {

    private readonly expression: string;
    private parsed: boolean;

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

    parse(): VoidUnhandled<TemplateParseException> {
        throw new Error("Method not implemented.");
    }
    isParsed(): boolean {
        return this.parsed;
    }

    protected render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {
        let x: Unhandled<TemplateRenderException, Node> = next.render(scope);
        if (x.isThrown()) {
            x.reset();
            return x;
        }
        x.get().addEventListener("input", () => {

        });
        x.reset();
        return x;
    }

}
