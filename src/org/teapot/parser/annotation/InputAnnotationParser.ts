import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import AnnotationParser from './AnnotationParser';
import InputAnnotation from '../../annotation/InputAnnotation';

export default class InputAnnotationParser implements AnnotationParser<InputAnnotation> {

    public parse(_expression: string, _next: Renderable): Unhandled<TemplateParseException, InputAnnotation> {
        throw new Error("Method not implemented.");
    }

}
