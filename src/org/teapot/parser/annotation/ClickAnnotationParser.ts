import AnnotationParser from './AnnotationParser';
import ClickAnnotation from '../../annotation/ClickAnnotation';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';


export default class ClickAnnotationParser implements AnnotationParser<ClickAnnotation> {

    public parse(_expression: string, _next: Renderable): Unhandled<TemplateParseException, ClickAnnotation> {
        throw new Error("Method not implemented.");
    }



}
