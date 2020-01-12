import AnnotationFactory from './factory/AnnotationFactory';
import Annotation from './Annotation';
import Renderable from '../util/Renderable';
import IfAnnotation from './IfAnnotation';
import IfAnnotationFactory from './factory/IfAnnotationFactory';
import ForAnnotationFactory from './factory/ForAnnotationFactory';
import ForAnnotation from './ForAnnotation';
import ClickAnnotation from './ClickAnnotation';
import ClickAnnotationFactory from './factory/ClickAnnotationFactory';
import HoverAnnotationFactory from './factory/HoverAnnotationFactory';
import HoverAnnotation from './HoverAnnotation';
import InputAnnotationFactory from './factory/InputAnnotationFactory';
import InputAnnotation from './InputAnnotation';

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

    private getFactory(): AnnotationFactory<T> {
        return this.factory;
    }

    public newInstance(expression: string, next: Renderable): T {
        return this.getFactory().newInstance(expression, next);
    }

    public static getValues(): AnnotationType<any>[] {
        return AnnotationType.VALUES;
    }
}
