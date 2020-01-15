import Renderable from '../../util/Renderable';
import AnnotationParser from './AnnotationParser';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import IfAnnotation from '../IfAnnotation';

export default class IfAnnotationParser implements AnnotationParser<IfAnnotation> {

    parse(expression: string, next: Renderable): Unhandled<TemplateParseException, IfAnnotation> {
        return IfAnnotation.parse(expression, next);
    }


}
