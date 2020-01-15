import Renderable from '../../util/Renderable';
import ForAnnotation from '../ForAnnotation';
import AnnotationParser from './AnnotationParser';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';

export default class ForAnnotationParser implements AnnotationParser<ForAnnotation> {

    parse(expression: string, next: Renderable): Unhandled<TemplateParseException, ForAnnotation> {
        return ForAnnotation.parse(expression, next);
    }


}
