import AnnotationFactory from '../AnnotationFactory';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import RenderablePack from '../../pack/RenderablePack';
import ForAnnotation from '../ForAnnotation';

export default class ForAnnotationFactory implements AnnotationFactory<ForAnnotation> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, ForAnnotation> {
        throw new Error("Method not implemented.");
    }
    from(pack: RenderablePack): ForAnnotation {
        throw new Error("Method not implemented.");
    }

}
