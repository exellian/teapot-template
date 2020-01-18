export default class Exception extends Error {

    private readonly object: string | Exception;

    public constructor(object: string | Exception) {
        super((typeof object === "string") ? object : object.toString());
        this.object = object;
    }

    public getMessage(): string {
        return this.object instanceof Exception ? this.object.getMessage() : this.object;
    }

    public toString(): string {
        return this.getMessage();
    }
}
