import Accessor from '../accessor/Accessor';
import TextPartition from './TextPartition';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import RenderException from '../exception/RenderException';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import TextPartitionPack from '../pack/TextPartitionPack';
import TeapotPackType from '../pack/TeapotPackType';

export default class ValueTextPartition implements TextPartition {

    private readonly valueAccessor: Accessor;

    private constructor(valueAccessor: Accessor) {
        this.valueAccessor = valueAccessor;
    }

    public static from(valueAccessor: Accessor): Unhandled<IllegalArgumentException, ValueTextPartition> {
        if (!Checker.checkNotNull(valueAccessor)) {
            return new Unhandled<IllegalArgumentException, ValueTextPartition>(new IllegalArgumentException("Value accessor can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, ValueTextPartition>(new ValueTextPartition(valueAccessor));
    }

    public render(scope: Scope): Unhandled<RenderException, string> {
        let value: Unhandled<InvalidViewAccessException, string> = this.getLinkValueAccessor().getAsString(scope);
        if (value.isThrown()) {
            return new Unhandled<RenderException, string>(new RenderException(value.getException()));
        }
        return new Unhandled<RenderException, string>(value.get());
    }

    public pack(): TextPartitionPack {
        let pack: TextPartitionPack = new TextPartitionPack(TeapotPackType.VALUE_TEXT);
        pack.valueAccessor = this.getLinkValueAccessor().pack();
        return pack;
    }

    private getLinkValueAccessor(): Accessor {
        return this.valueAccessor;
    }

}
