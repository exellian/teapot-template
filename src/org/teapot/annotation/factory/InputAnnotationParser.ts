import Renderable from '../../util/Renderable';
import AnnotationParser from './AnnotationParser';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import InputAnnotation from '../InputAnnotation';

export default class InputAnnotationParser implements AnnotationParser<InputAnnotation> {

    parse(_expression: string, _next: Renderable): Unhandled<TemplateParseException, InputAnnotation> {
        throw new Error("Method not implemented.");
    }

}
