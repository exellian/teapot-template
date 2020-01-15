import AnnotationFactory from '../AnnotationFactory';
import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import RenderablePack from '../../pack/RenderablePack';
import InputAnnotation from '../InputAnnotation';

export default class InputAnnotationFactory implements AnnotationFactory<InputAnnotation> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, InputAnnotation> {
        throw new Error("Method not implemented.");
    }
    from(pack: RenderablePack): InputAnnotation {
        throw new Error("Method not implemented.");
    }

}
