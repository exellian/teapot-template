import Annotation from '../../annotation/Annotation';
import IfAnnotation from '../../annotation/IfAnnotation';
import ForAnnotation from '../../annotation/ForAnnotation';
import ClickAnnotation from '../../annotation/ClickAnnotation';
import HoverAnnotation from '../../annotation/HoverAnnotation';
import InputAnnotation from '../../annotation/InputAnnotation';
import IfAnnotationParser from './IfAnnotationParser';
import ForAnnotationParser from './ForAnnotationParser';
import ClickAnnotationParser from './ClickAnnotationParser';
import HoverAnnotationParser from './HoverAnnotationParser';
import InputAnnotationParser from './InputAnnotationParser';
import AnnotationParser from './AnnotationParser';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';

export default class AnnotationType<T extends Annotation> {

    public static readonly IF = new AnnotationType<IfAnnotation>("if", new IfAnnotationParser());
    public static readonly FOR = new AnnotationType<ForAnnotation>("for", new ForAnnotationParser());
    public static readonly CLICK = new AnnotationType<ClickAnnotation>("click", new ClickAnnotationParser());
    public static readonly HOVER = new AnnotationType<HoverAnnotation>("hover", new HoverAnnotationParser());
    public static readonly INPUT = new AnnotationType<InputAnnotation>("for", new InputAnnotationParser());

    private static readonly VALUES: AnnotationType<any>[] = [
        AnnotationType.IF,
        AnnotationType.FOR,
        AnnotationType.CLICK,
        AnnotationType.HOVER,
        AnnotationType.INPUT
    ];

    private readonly name: string;
    private readonly factory: AnnotationParser<T>;

    private constructor(name: string, factory: AnnotationParser<T>) {
        this.name = name;
        this.factory = factory;
    }

    public getName(): string {
        return this.name;
    }

    private getLinkFactory(): AnnotationParser<T> {
        return this.factory;
    }

    public parse(expression: string, next: Renderable): Unhandled<TemplateParseException, T> {
        return this.getLinkFactory().parse(expression, next);
    }

    public static getValues(): AnnotationType<any>[] {
        return AnnotationType.VALUES;
    }
}
