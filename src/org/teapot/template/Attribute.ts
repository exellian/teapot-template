import Packable from '../abstract/Packable';
import AttributePack from '../pack/AttributePack';
import Unhandled from '../util/Unhandled';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import TeapotPackType from '../pack/TeapotPackType';
import TextPartition from './TextPartition';
import TextPartitionPack from '../pack/TextPartitionPack';

export default class Attribute implements Packable<AttributePack> {

    private readonly name: string;
    private readonly value: TextPartition[];

    private constructor(name: string, value: TextPartition[]) {
        this.name = name;
        this.value = value;
    }

    public static from(name: string, value: TextPartition[]): Unhandled<IllegalArgumentException, Attribute> {
        if (!Checker.checkNotNull(name)) {
            return new Unhandled<IllegalArgumentException, Attribute>(new IllegalArgumentException("Name can not be null!"));
        }
        if (!Checker.checkNotNull(value)) {
            return new Unhandled<IllegalArgumentException, Attribute>(new IllegalArgumentException("Value can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Attribute>(new Attribute(name, value));
    }

    pack(): AttributePack {
        let pack: AttributePack = new AttributePack(TeapotPackType.ATTRIBUTE);
        let packs: TextPartitionPack[] = [];
        for (let v of this.getLinkValue()) {
            packs.push(v.pack());
        }
        pack.name = this.getName();
        pack.value = packs;
        return pack;
    }

    public getName(): string {
        return this.name;
    }

    public getLinkValue(): TextPartition[] {
        return this.value;
    }
}
