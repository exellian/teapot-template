export default class PrimitiveFieldAccessor {

    private readonly accessor: number | string;
    private checked: boolean;

    public constructor(accessor: number | string) {
		this.accessor = accessor;
		this.setChecked(false);
	}

	private getAccessor(): number | string {
		return this.accessor;
	}

	public getAsString(): string {
		if (!this.isChecked()) {
			throw new Error("FieldAccessor type has to be checked!");
		}
		return <string>this.getAccessor();
	}

	public getAsInteger(): number {
		if (!this.isChecked()) {
			throw new Error("FieldAccessor type has to be checked!");
		}
		return <number>this.getAccessor();
	}

	public isString(): boolean {
		this.setChecked(true);
		return typeof this.getAccessor() === "string";
	}

	public isInteger(): boolean {
		this.setChecked(true);
		return typeof this.getAccessor() === "number" && Number.isInteger(<number>this.getAccessor());
	}

	private isChecked(): boolean{
		return this.checked;
	}

	private setChecked(checked: boolean): void {
		this.checked = checked;
	}

}
