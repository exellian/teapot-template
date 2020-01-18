export default class Checker {

    public static checkNotNull<T>(object: T): boolean {
        return object !== null && object !== undefined;
    }
}
