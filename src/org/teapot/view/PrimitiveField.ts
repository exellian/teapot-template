import Field from './Field';
import Scope from './Scope';
import PrimitiveFieldAccessor from '../accessor/PrimitiveFieldAccessor';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Unhandled from '../util/Unhandled';

export default class PrimitiveField implements Field {

    private readonly value: string | number | boolean;

	public constructor(value: string | number | boolean) {
        this.value = value;
	}

	public get(_scope: Scope, _accessor: PrimitiveFieldAccessor): Unhandled<InvalidViewAccessException, Field> {
		throw new Error("Primitive field can not be accessed by FieldAccessor!");
	}

	public getAsString(): string {
		return <string>this.getValue();
	}
    
    public getAsInteger(): number {
		return <number>this.getValue();
	}

    public getAsBoolean(): boolean {
		return <boolean>this.getValue();
	}


	public isString(): boolean {
		return typeof this.getValue() === "string";
	}

	public isInteger(): boolean {
		return typeof this.getValue() === "number" && Number.isInteger(<number>this.getValue());
	}

	public isDouble(): boolean {
		return typeof this.getValue() === "number" && !Number.isInteger(<number>this.getValue());
	}

    public isNumber(): boolean {
		return typeof this.getValue() === "number";
	}

	public isBoolean(): boolean {
		return typeof this.getValue() === "boolean";
	}

    public getValue(): string | number | boolean {
        return this.value;
    }

}
