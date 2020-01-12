export default class Exception {

    public constructor(private readonly message: string | Exception) {}

    public getMessage(): string {
        return (this.message instanceof Exception) ? this.message.getMessage() : this.message;
    }
}
