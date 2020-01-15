import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import Packable from '../abstract/Packable';
import RenderablePack from '../pack/RenderablePack';

export default interface Renderable extends Packable<RenderablePack> {

    render(scope: Scope): Unhandled<RenderException, Node>;
}
