import Annotation from './Annotation';
import IfAnnotation from './IfAnnotation';
import ForAnnotation from './ForAnnotation';
import ClickAnnotation from './ClickAnnotation';
import HoverAnnotation from './HoverAnnotation';
import InputAnnotation from './InputAnnotation';
import IfAnnotationParser from './factory/IfAnnotationParser';
import ForAnnotationParser from './factory/ForAnnotationParser';
import ClickAnnotationParser from './factory/ClickAnnotationParser';
import HoverAnnotationParser from './factory/HoverAnnotationParser';
import InputAnnotationParser from './factory/InputAnnotationParser';
import AnnotationParser from './factory/AnnotationParser';
import TemplateParseException from '../exception/TemplateParseException';
import Unhandled from '../util/Unhandled';
import Renderable from '../template/Renderable';

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

    public newInstance(expression: string, next: Renderable): Unhandled<TemplateParseException, T> {
        return this.getLinkFactory().parse(expression, next);
    }

    public static getValues(): AnnotationType<any>[] {
        return AnnotationType.VALUES;
    }
}
