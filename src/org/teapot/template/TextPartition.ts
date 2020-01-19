import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import RenderException from '../exception/RenderException';
import Packable from '../abstract/Packable';
import TextPartitionPack from '../pack/TextPartitionPack';

export default interface TextPartition extends Packable<TextPartitionPack> {

    render(scope: Scope): Unhandled<RenderException, string>;
    
}
