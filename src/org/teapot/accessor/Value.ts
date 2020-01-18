import Expression from './Expression';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';
import TeapotPackType from '../pack/TeapotPackType';

export default class Value implements Expression {

    private readonly value: number | string | boolean;

    private constructor(value: number | string | boolean) {
        if (!Checker.checkNotNull(value)) {
            throw new IllegalArgumentException("Value can not be null!");
        }
        this.value = value;
    }

    public static from(value: number | string | boolean): Unhandled<IllegalArgumentException, Value> {
        if (!Checker.checkNotNull(value)) {
            return new Unhandled<IllegalArgumentException, Value>(new IllegalArgumentException("Value can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Value>(new Value(value));
    }

    pack(): ExpressionPack {
        let pack: ExpressionPack = new ExpressionPack(TeapotPackType.VALUE);
        pack.value = this.getValue();
        return pack;
    }

    private getValue(): number | string | boolean {
        return this.value;
    }



    get(_scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(this.getValue()));
    }
    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        return this.getField(scope);
    }

}
