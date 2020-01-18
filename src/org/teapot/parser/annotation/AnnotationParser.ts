import TemplateParseException from '../../exception/TemplateParseException';
import Annotation from '../../annotation/Annotation';
import Unhandled from '../../util/Unhandled';
import Renderable from '../../template/Renderable';

export default interface AnnotationParser<T extends Annotation> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, T>;
}
