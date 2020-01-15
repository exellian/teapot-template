import AnnotationFactory from '../AnnotationFactory';
import ClickAnnotation from '../ClickAnnotation';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import RenderablePack from '../../pack/RenderablePack';

export default class ClickAnnotationFactory implements AnnotationFactory<ClickAnnotation> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, ClickAnnotation> {
        throw new Error("Method not implemented.");
    }
    from(pack: RenderablePack): ClickAnnotation {
        throw new Error("Method not implemented.");
    }


}
