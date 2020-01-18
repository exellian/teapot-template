import Unhandled from '../util/Unhandled';
import Expression from './Expression';
import Scope from '../view/Scope';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import AccessorPack from '../pack/AccessorPack';
import Packable from '../abstract/Packable';

export default class Accessor implements Packable<AccessorPack> {

    private readonly expression: Expression;

	private constructor(expression: Expression) {
        this.expression = expression;
	}

    public static from(expression: Expression): Unhandled<IllegalArgumentException, Accessor> {
        if (!Checker.checkNotNull(expression)) {
            return new Unhandled<IllegalArgumentException, Accessor>(new IllegalArgumentException("Given expression can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Accessor>(new Accessor(expression));
    }

    pack(): AccessorPack {
        throw new Error("Method not implemented.");
    }

    private getLinkExpression(): Expression {
        return this.expression;
    }

    public get(scope: Scope): Unhandled<InvalidViewAccessException, any> {
        let res: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getPrimitveField(scope);
		if (res.isThrown()) {
            return new Unhandled<InvalidViewAccessException, any>(res.getException());
        }
        return new Unhandled<InvalidViewAccessException, any>(res.get().getValue());
	}

	public getPrimitveField(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
		return this.getLinkExpression().get(scope);
	}

	public getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
		return this.getLinkExpression().getField(scope);
	}

	public getAsString(scope: Scope): Unhandled<InvalidViewAccessException, string> {
        let res: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getPrimitveField(scope);
		if (res.isThrown()) {
            return new Unhandled<InvalidViewAccessException, string>(res.getException());
        }
        return new Unhandled<InvalidViewAccessException, string>(res.get().getAsString());
	}

}
