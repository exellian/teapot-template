import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import Pack from './Pack';
import Packable from './Packable';

export default interface Template<T extends Pack> extends Packable<T> {

    render(scope: Scope): Unhandled<TemplateRenderException, Node>;
}
