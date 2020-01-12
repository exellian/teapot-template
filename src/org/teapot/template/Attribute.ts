export default class Attribute {

    private readonly name: string;
    private readonly value: string;

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): string {
        return this.value;
    }
}
