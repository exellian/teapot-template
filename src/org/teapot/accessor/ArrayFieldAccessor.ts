import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Scope from '../view/Scope';
import AccessorParseException from '../exception/AccessorParseException';
import Parsable from '../util/Parsable';
import VoidUnhandled from '../util/VoidUnhandled';
import Expression from './Expression';
import Accessor from './Accessor';
import ArrayField from '../view/ArrayField';
import PrimitiveField from '../view/PrimitiveField';
import PrimitiveFieldAccessor from './PrimitiveFieldAccessor';

export default class ArrayFieldAccessor implements FieldAccessor {

    private readonly accessor: string;

    private innerExpression: Expression;

    private parsed: boolean;

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    public constructor(accessor: string) {
        this.accessor = accessor;
        this.setParsed(false);
    }

    public getLinkInnerExpression(): Expression {
        return this.innerExpression;
    }

    private setLinkInnerExpression(innerExpression: Expression): void {
        this.innerExpression = innerExpression;
    }

    private getAccessor(): string {
        return this.accessor;
    }

    parse(): VoidUnhandled<AccessorParseException> {
        if (!this.getAccessor().startsWith("[") || !this.getAccessor().endsWith("]")) {
			return new VoidUnhandled<AccessorParseException>();
		}
		let innerPart: string = this.getAccessor().substring(1, this.getAccessor().length - 1);
		if (innerPart.length === 0) {
			return new VoidUnhandled<AccessorParseException>(new AccessorParseException("Array accessor can not be empty!"));
		}
        let innerExpression: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(innerPart);
        if (innerExpression.isThrown()) {
            return new VoidUnhandled<AccessorParseException>(innerExpression.getException());
        }
        this.setLinkInnerExpression(innerExpression.get());
		this.setParsed(true);
        return new VoidUnhandled<AccessorParseException>();
    }

    isParsed(): boolean {
        return this.parsed;
    }

    get(scope: Scope, field: Field): Unhandled<InvalidViewAccessException, Field> {

        if (!ArrayFieldAccessor.checkArrayField(field)) {
			throw new InvalidViewAccessException("Array accessor can only access arrays!");
		}
        let index: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkInnerExpression().get(scope);
        if (index.isThrown()) {
            return new Unhandled<InvalidViewAccessException, Field>(index.getException());
        }
		if (!index.get().isInteger()) {
			return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Array must be accessed by integer value!"));
		}
		return field.get(scope, new PrimitiveFieldAccessor(index.get().getAsInteger()));
    }

	private static checkArrayField(field: Field): boolean {
		return field instanceof ArrayField;
	}


}
