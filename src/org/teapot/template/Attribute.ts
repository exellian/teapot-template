import Packable from '../abstract/Packable';
import AttributePack from '../pack/AttributePack';

export default class Attribute implements Packable<AttributePack> {

    private readonly name: string;
    private readonly value: string;

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    pack(): AttributePack {
        throw new Error("Method not implemented.");
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): string {
        return this.value;
    }
}
