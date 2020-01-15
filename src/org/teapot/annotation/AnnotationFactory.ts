import { PackFactory } from '../abstract/PackFactory';
import RenderablePack from '../pack/RenderablePack';
import Renderable from '../template/Renderable';
import Annotation from './Annotation';
import Unhandled from '../util/Unhandled';
import TemplateParseException from '../exception/TemplateParseException';

export default interface AnnotationFactory<T extends Annotation> extends PackFactory<T, RenderablePack> {

    parse(expession: string, next: Renderable): Unhandled<TemplateParseException, T>;
}
