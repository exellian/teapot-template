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

export default class Operator implements Expression {

    private readonly operator: string;
	private readonly left: Expression;
	private readonly right: Expression;

    private constructor(operator: string, left: Expression, right: Expression) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    public static from(operator: string, left: Expression, right: Expression): Unhandled<IllegalArgumentException, Operator> {
        if (!Checker.checkNotNull(operator)) {
            return new Unhandled<IllegalArgumentException, Operator>(new IllegalArgumentException("Operator can not be null!"));
        }
        if (!Checker.checkNotNull(left)) {
            return new Unhandled<IllegalArgumentException, Operator>(new IllegalArgumentException("Left expression can not be null!"));
        }
        if (!Checker.checkNotNull(right)) {
            return new Unhandled<IllegalArgumentException, Operator>(new IllegalArgumentException("Right expression can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Operator>(new Operator(operator, left, right));
    }

    pack(): ExpressionPack {
        let pack: ExpressionPack = new ExpressionPack(TeapotPackType.OPERATOR);
        pack.operator = this.getOperator();
        pack.left = this.getLinkLeft().pack();
        pack.right = this.getLinkRight().pack();
        return pack;
    }

    private getOperator(): string {
        return this.operator;
    }

    private getLinkLeft(): Expression {
        return this.left;
    }

    private getLinkRight(): Expression {
        return this.right;
    }

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        let leftRes: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkLeft().get(scope);
		let rightRes: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkRight().get(scope);
        if (leftRes.isThrown()) {
            leftRes.reset();
            return leftRes;
        }
        if (rightRes.isThrown()) {
            rightRes.reset();
            return rightRes;
        }
        let left: PrimitiveField = leftRes.get();
        let right: PrimitiveField = rightRes.get();
		let operator: string = this.getOperator();
		if (operator === "==") {
			return Operator.bool(left, right);
		} else if (operator === "<") {
			return Operator.boolSmaller(left, right);
		} else if (operator === ">") {
			return Operator.boolGreater(left, right);
		} else if (operator === "<=") {
			return Operator.boolSmallerEquals(left, right);
		} else if (operator === ">=") {
			return Operator.boolGreaterEquals(left, right);
		} else if (operator === "+") {
			return Operator.add(left, right);
		} else if (operator === "-") {
			return Operator.subtract(left, right);
		} else if (operator === "*") {
			return Operator.multiply(left, right);
		} else if (operator === "/") {
			return Operator.divide(left, right);
		}
		throw new Error("Unknown State!");
    }

    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        return this.get(scope);
    }

    private static bool(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(left.getValue() === right.getValue()));
	}

	private static boolSmaller(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

		if (left.isNumber() && right.isNumber()) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(left.getValue() < right.getValue()));
		}
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
	}

	private static boolGreater(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if (left.isNumber() && right.isNumber()) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(left.getValue() > right.getValue()));
		}
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
	}

    private static boolSmallerEquals(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if (left.isNumber() && right.isNumber()) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(left.getValue() <= right.getValue()));
		}
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
	}

    private static boolGreaterEquals(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if (left.isNumber() && right.isNumber()) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(left.getValue() >= right.getValue()));
		}
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
	}

    private static add(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if ((left.isBoolean() && right.isBoolean()) || (left.isBoolean() && right.isNumber()) || (left.isNumber() && right.isBoolean())) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("The + operator can only be executed on numbers or strings!"));
		}
        if (left.isString() || right.isString()) {
            return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(left.getValue().toString() + right.getValue().toString()));
        }
        return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(<number>left.getValue() + <number>right.getValue()));
    }

    private static subtract(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if (left.isNumber() && right.isNumber()) {
            return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(<number>left.getValue() - <number>right.getValue()));
        }
        return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
    }

    private static multiply(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if (left.isNumber() && right.isNumber()) {
            return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(<number>left.getValue() * <number>right.getValue()));
        }
        return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
    }

    private static divide(left: PrimitiveField, right: PrimitiveField): Unhandled<InvalidViewAccessException, PrimitiveField> {

        if (left.isNumber() && right.isNumber()) {
            return new Unhandled<InvalidViewAccessException, PrimitiveField>(new PrimitiveField(<number>left.getValue() / <number>right.getValue()));
        }
        return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("An operator can only be executed with number values!"));
    }
}
