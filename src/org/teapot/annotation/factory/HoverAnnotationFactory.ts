import AnnotationFactory from '../AnnotationFactory';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import RenderablePack from '../../pack/RenderablePack';
import HoverAnnotation from '../HoverAnnotation';

export default class HoverAnnotationFactory implements AnnotationFactory<HoverAnnotation> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, HoverAnnotation> {
        throw new Error("Method not implemented.");
    }
    from(pack: RenderablePack): HoverAnnotation {
        throw new Error("Method not implemented.");
    }
}
