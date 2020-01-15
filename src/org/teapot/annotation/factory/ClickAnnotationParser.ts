import ClickAnnotation from '../ClickAnnotation';
import Renderable from '../../util/Renderable';
import AnnotationParser from './AnnotationParser';
import TemplateParseException from '../../exception/TemplateParseException';
import Unhandled from '../../util/Unhandled';

export default class ClickAnnotationParser implements AnnotationParser<ClickAnnotation> {


    parse(_expression: string, _next: Renderable): Unhandled<TemplateParseException, ClickAnnotation> {
        throw new Error("Method not implemented.");
    }

}
