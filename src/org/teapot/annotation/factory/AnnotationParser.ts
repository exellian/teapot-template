import Annotation from '../Annotation';
import Renderable from '../../util/Renderable';
import TemplateParseException from '../../exception/TemplateParseException';
import Unhandled from '../../util/Unhandled';

export default interface AnnotationParser<T extends Annotation> {

    parse(expression: string, next: Renderable): Unhandled<TemplateParseException, T>;
}
