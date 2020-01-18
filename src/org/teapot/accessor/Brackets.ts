import Expression from './Expression';
import Unhandled from '../util/Unhandled';
import Scope from '../view/Scope';
import PrimitiveField from '../view/PrimitiveField';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';
import TeapotPackType from '../pack/TeapotPackType';

export default class Brackets implements Expression {

    private readonly innerExpression: Expression;

    private constructor(innerExpression: Expression) {
        if (!Checker.checkNotNull(innerExpression)) {
            throw new IllegalArgumentException("Inner expression of Brackets can not be null!");
        }
        this.innerExpression = innerExpression;
    }

    public static from(innerExpression: Expression): Unhandled<IllegalArgumentException, Brackets> {
        if (!Checker.checkNotNull(innerExpression)) {
            return new Unhandled<IllegalArgumentException, Brackets>(new IllegalArgumentException("Inner expression of Brackets can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Brackets>(new Brackets(innerExpression));
    }

    pack(): ExpressionPack {
        let pack: ExpressionPack = new ExpressionPack(TeapotPackType.BRACKETS);
        pack.innerExpression = this.getLinkInnerExpression().pack();
        return pack;
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
