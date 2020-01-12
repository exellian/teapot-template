import AnnotationFactory from './AnnotationFactory';
import Renderable from '../../util/Renderable';
import HoverAnnotation from '../HoverAnnotation';

export default class HoverAnnotationFactory implements AnnotationFactory<HoverAnnotation> {


    newInstance(expression: string, next: Renderable): HoverAnnotation {
        return new HoverAnnotation(expression, next);
    }

}
