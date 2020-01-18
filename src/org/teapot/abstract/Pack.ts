import IllegalArgumentException from '../exception/IllegalArgumentException';

export default abstract class Pack {

    public readonly type: number;

    public constructor(type: number) {
        if (!Pack.checkType(type)) {
            throw new IllegalArgumentException("Type must be integer and greater -1!");
        }
        this.type = type;
    }

    private static checkType(type: number): boolean {
        return Number.isInteger(type) && type >= 0;
    }

}
