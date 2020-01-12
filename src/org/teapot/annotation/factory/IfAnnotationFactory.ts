import AnnotationFactory from './AnnotationFactory';
import Renderable from '../../util/Renderable';
import IfAnnotation from '../IfAnnotation';

export default class IfAnnotationFactory implements AnnotationFactory<IfAnnotation> {


    newInstance(expression: string, next: Renderable): IfAnnotation {
        return new IfAnnotation(expression, next);
    }

}
