import Annotation from './Annotation';
import IfAnnotation from './IfAnnotation';
import ForAnnotation from './ForAnnotation';
import ClickAnnotation from './ClickAnnotation';
import HoverAnnotation from './HoverAnnotation';
import InputAnnotation from './InputAnnotation';
import TemplateParseException from '../exception/TemplateParseException';
import Unhandled from '../util/Unhandled';
import Renderable from '../template/Renderable';
import AnnotationFactory from './AnnotationFactory';
import IfAnnotationFactory from './factory/IfAnnotationFactory';
import ForAnnotationFactory from './factory/ForAnnotationFactory';
import ClickAnnotationFactory from './factory/ClickAnnotationFactory';
import HoverAnnotationFactory from './factory/HoverAnnotationFactory';
import InputAnnotationFactory from './factory/InputAnnotationFactory';

export default class AnnotationType<T extends Annotation> {

    public static readonly IF = new AnnotationType<IfAnnotation>("if", new IfAnnotationFactory());
    public static readonly FOR = new AnnotationType<ForAnnotation>("for", new ForAnnotationFactory());
    public static readonly CLICK = new AnnotationType<ClickAnnotation>("click", new ClickAnnotationFactory());
    public static readonly HOVER = new AnnotationType<HoverAnnotation>("hover", new HoverAnnotationFactory());
    public static readonly INPUT = new AnnotationType<InputAnnotation>("for", new InputAnnotationFactory());

    private static readonly VALUES: AnnotationType<any>[] = [
        AnnotationType.IF,
        AnnotationType.FOR,
        AnnotationType.CLICK,
        AnnotationType.HOVER,
        AnnotationType.INPUT
    ];

    private readonly name: string;
    private readonly factory: AnnotationFactory<T>;

    private constructor(name: string, factory: AnnotationFactory<T>) {
        this.name = name;
        this.factory = factory;
    }

    public getName(): string {
        return this.name;
    }

    private getLinkFactory(): AnnotationFactory<T> {
        return this.factory;
    }

    public parse(expression: string, next: Renderable): Unhandled<TemplateParseException, T> {
        return this.getLinkFactory().parse(expression, next);
    }

    public static getValues(): AnnotationType<any>[] {
        return AnnotationType.VALUES;
    }
}
