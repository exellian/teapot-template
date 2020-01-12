import AnnotationFactory from './AnnotationFactory';
import ClickAnnotation from '../ClickAnnotation';
import Renderable from '../../util/Renderable';

export default class ClickAnnotationFactory implements AnnotationFactory<ClickAnnotation> {


    newInstance(expression: string, next: Renderable): ClickAnnotation {
        return new ClickAnnotation(expression, next);
    }

}
