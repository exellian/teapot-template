import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import AnnotationParser from './AnnotationParser';
import HoverAnnotation from '../../annotation/HoverAnnotation';

export default class HoverAnnotationParser implements AnnotationParser<HoverAnnotation> {

    public parse(_expression: string, _next: Renderable): Unhandled<TemplateParseException, HoverAnnotation> {
        throw new Error("Method not implemented.");
    }

}
