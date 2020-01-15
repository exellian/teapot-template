export default class Exception {

    private readonly message: string | Exception;

    public constructor(message: string | Exception) {
        this.message = message;
    }

    public getMessage(): string {
        return (this.message instanceof Exception) ? this.message.getMessage() : this.message;
    }
}
