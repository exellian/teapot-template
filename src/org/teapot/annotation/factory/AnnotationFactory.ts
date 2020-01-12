import Annotation from '../Annotation';
import Renderable from '../../util/Renderable';

export default interface AnnotationFactory<T extends Annotation> {

    newInstance(expression: string, next: Renderable): T;
}
