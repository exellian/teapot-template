import Exception from '../exception/Exception';

export default class Unhandled<E extends Exception, T> {

    private checked: boolean = null;
    private readonly exception: boolean = null;
    private readonly result: E | T = null;

    public constructor(result: E | T) {
        this.setChecked(false);
        if (result instanceof Error) {
            this.exception = true;
        } else {
            this.exception = false;
        }
        this.result = result;
    }


    public isThrown(): boolean {
        this.setChecked(true);
        return this.isException();
    }

    public reset(): void {
        this.setChecked(false);
    }

    public getException(): E {
        if (!this.isChecked()) {
            throw new Error("Unhandled exception must be handled!");
        }
        return <E>this.getLinkResult();
    }

    public get(): T {
        if (!this.isChecked()) {
            throw new Error("Unhandled exception must be handled!");
        }
        return <T>this.getLinkResult();
    }

    private setChecked(checked: boolean): void {
        this.checked = checked;
    }

    private isChecked(): boolean {
        return this.checked;
    }

    private isException(): boolean {
        return this.exception;
    }

    private getLinkResult(): E | T {
        return this.result;
    }

}
