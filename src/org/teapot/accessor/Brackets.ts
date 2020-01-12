import Expression from './Expression';
import Unhandled from '../util/Unhandled';
import Scope from '../view/Scope';
import PrimitiveField from '../view/PrimitiveField';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import AccessorParseException from '../exception/AccessorParseException';
import VoidUnhandled from '../util/VoidUnhandled';
import Field from '../view/Field';
import Accessor from './Accessor';

export default class Brackets implements Expression {

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

    parse(): VoidUnhandled<AccessorParseException> {
        if (this.getAccessor().charAt(0) !== '(' || this.getAccessor().charAt(this.getAccessor().length - 1) !== ')') {
			return new VoidUnhandled<AccessorParseException>();
		}
		let res: Unhandled<AccessorParseException, Expression> =
            Accessor.parseExpression(this.getAccessor().substring(1, this.getAccessor().length - 1));

        if (res.isThrown()) {
            return new VoidUnhandled<AccessorParseException>(res.getException());
        }
        this.setLinkInnerExpression(res.get());
        this.setParsed(true);
		return new VoidUnhandled<AccessorParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
    }

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        return this.getLinkInnerExpression().get(scope);
    }

    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        return this.getLinkInnerExpression().getField(scope);
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

}
