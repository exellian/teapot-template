import AnnotationFactory from './AnnotationFactory';
import Renderable from '../../util/Renderable';
import InputAnnotation from '../InputAnnotation';

export default class InputAnnotationFactory implements AnnotationFactory<InputAnnotation> {


    newInstance(expression: string, next: Renderable): InputAnnotation {
        return new InputAnnotation(expression, next);
    }

}
