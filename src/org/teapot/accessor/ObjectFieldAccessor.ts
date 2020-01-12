import Parsable from '../util/Parsable';
import AccessorParseException from '../exception/AccessorParseException';
import VoidUnhandled from '../util/VoidUnhandled';
import FieldAccessor from './FieldAccessor';
import Field from '../view/Field';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveFieldAccessor from './PrimitiveFieldAccessor';
import ObjectField from '../view/ObjectField';

export default class ObjectFieldAccessor implements FieldAccessor {

    private readonly accessor: string;

    private parsed: boolean;

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    public constructor(accessor: string) {
        this.accessor = accessor;
        this.setParsed(false);
    }

    public getAccessor(): string {
        return this.accessor;
    }

    parse(): VoidUnhandled<AccessorParseException> {
        if (!this.getAccessor().match("[a-zA-Z][a-zA-Z0-9_]*")) {
            return new VoidUnhandled<AccessorParseException>();
		}
        this.setParsed(true);
		return new VoidUnhandled<AccessorParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
    }

    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {
        if (!ObjectFieldAccessor.checkObjectField(field)) {
			return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("ObjectAccessor can only access objects!"));
		}
		return field.get(scope, new PrimitiveFieldAccessor(this.getAccessor()));
    }

	private static checkObjectField(field: Field): boolean {
		return field instanceof ObjectField || field instanceof Scope;
	}

}
