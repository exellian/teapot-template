import Expression from './Expression';
import Unhandled from '../util/Unhandled';
import Scope from '../view/Scope';
import PrimitiveField from '../view/PrimitiveField';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import AccessorParseException from '../exception/AccessorParseException';
import Field from '../view/Field';
import Accessor from './Accessor';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';

export default class Brackets implements Expression {

    private readonly innerExpression: Expression;

    private constructor(innerExpression: Expression) {
        if (!Checker.checkNotNull(innerExpression)) {
            throw new IllegalArgumentException("Inner expression of Brackets can not be null!");
        }
        this.innerExpression = innerExpression;
    }

    pack(): ExpressionPack {
        throw new Error("Method not implemented.");
    }

    public static checkFormat(accessor: string): boolean {
        return (accessor.startsWith("(") && accessor.endsWith(")"));
    }

    public static parse(accessor: string): Unhandled<AccessorParseException, Brackets> {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        if (!Brackets.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, Brackets>(new AccessorParseException("Brackets must be surrounded by ()!"));
        }
		let res: Unhandled<AccessorParseException, Expression> =
            Accessor.parseExpression(accessor.substring(1, accessor.length - 1));
        if (res.isThrown()) {
            return new Unhandled<AccessorParseException, Brackets>(res.getException());
        }
		return new Unhandled<AccessorParseException, Brackets>(new Brackets(res.get()));
    }

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        return this.getLinkInnerExpression().get(scope);
    }

    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        return this.getLinkInnerExpression().getField(scope);
    }

    private getLinkInnerExpression(): Expression {
        return this.innerExpression;
    }

}
