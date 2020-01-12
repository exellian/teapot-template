import Exception from '../exception/Exception';

export default class VoidUnhandled<E extends Exception> {

    private checked: boolean = null;
    private readonly exception: E;

    public constructor(exception?: E) {
        this.setChecked(false);
        if (!exception) {
            this.exception = null;
            return;
        }
        this.exception = exception;
    }

    public isThrown(): boolean {
        this.setChecked(true);
        return this.getException() !== null;
    }

    public reset(): void {
        this.setChecked(false);
    }

    public get(): E {
        if (!this.isChecked()) {
            throw new Error("Unhandled exception must be handled!");
        }
        return this.getException();
    }

    private setChecked(checked: boolean): void {
        this.checked = checked;
    }

    private isChecked(): boolean {
        return this.checked;
    }

    private getException(): E {
        return this.exception;
    }

}
