import Renderable from '../../util/Renderable';
import AnnotationParser from './AnnotationParser';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import HoverAnnotation from '../HoverAnnotation';

export default class HoverAnnotationParser implements AnnotationParser<HoverAnnotation> {

    parse(_expression: string, _next: Renderable): Unhandled<TemplateParseException, HoverAnnotation> {
        throw new Error("Method not implemented.");
    }

}
