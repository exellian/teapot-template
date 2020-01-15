import AnnotationFactory from '../AnnotationFactory';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import RenderablePack from '../../pack/RenderablePack';
import IfAnnotation from '../IfAnnotation';

export default class IfAnnotationFactory implements AnnotationFactory<IfAnnotation> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, IfAnnotation> {
        throw new Error("Method not implemented.");
    }
    from(pack: RenderablePack): IfAnnotation {
        throw new Error("Method not implemented.");
    }

}
