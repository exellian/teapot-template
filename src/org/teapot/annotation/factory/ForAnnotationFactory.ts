import AnnotationFactory from './AnnotationFactory';
import Renderable from '../../util/Renderable';
import ForAnnotation from '../ForAnnotation';

export default class ForAnnotationFactory implements AnnotationFactory<ForAnnotation> {


    newInstance(expression: string, next: Renderable): ForAnnotation {
        return new ForAnnotation(expression, next);
    }

}
