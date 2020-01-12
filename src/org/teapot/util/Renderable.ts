import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from './Unhandled';

export default interface Renderable {

    render(scope: Scope): Unhandled<RenderException, Node>;
}
