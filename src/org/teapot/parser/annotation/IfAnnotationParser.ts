import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import AnnotationParser from './AnnotationParser';
import IfAnnotation from '../../annotation/IfAnnotation';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import AccessorParseException from '../../exception/AccessorParseException';
import Accessor from '../../accessor/Accessor';
import AccessorParser from '../accessor/AccessorParser';

export default class IfAnnotationParser implements AnnotationParser<IfAnnotation> {

    public parse(expression: string, next: Renderable): Unhandled<TemplateParseException, IfAnnotation> {
        if (Checker.checkNotNull(expression)) {
            return new Unhandled<TemplateParseException, IfAnnotation>(new IllegalArgumentException("Expression can not be null!"));
        }
        if (Checker.checkNotNull(next)) {
            return new Unhandled<TemplateParseException, IfAnnotation>(new IllegalArgumentException("Next can not be null!"));
        }
        let accessor: Unhandled<AccessorParseException, Accessor> = AccessorParser.parse(expression);
        if (accessor.isThrown()) {
            return new Unhandled<TemplateParseException, IfAnnotation>(accessor.getException());
        }
        let ifAnnotation: Unhandled<IllegalArgumentException, IfAnnotation> = IfAnnotation.from(accessor.get(), next);
        if (ifAnnotation.isThrown()) {
            return new Unhandled<TemplateParseException, IfAnnotation>(new TemplateParseException(ifAnnotation.getException()));
        }
        return new Unhandled<TemplateParseException, IfAnnotation>(ifAnnotation.get());
    }

}
