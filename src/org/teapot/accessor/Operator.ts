import Expression from './Expression';
import AccessorParseException from '../exception/AccessorParseException';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Accessor from './Accessor';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';

export default class Operator implements Expression {

    private static readonly BOOLEAN: string[] = [ "==", "<", ">", "<=", ">=" ];
    private static readonly POINTS: string[] = [ "*", "/" ];
    private static readonly LINES: string[] = [ "+", "-" ];

    private readonly operator: string;
	private readonly left: Expression;
	private readonly right: Expression;

    private constructor(operator: string, left: Expression, right: Expression) {
        if (!Checker.checkNotNull(operator)) {
            throw new IllegalArgumentException("operator can not be null!");
        }
        if (!Checker.checkNotNull(left)) {
            throw new IllegalArgumentException("left expression of operator can not be null!");
        }
        if (!Checker.checkNotNull(right)) {
            throw new IllegalArgumentException("right expression of operator can not be null!");
        }
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    pack(): ExpressionPack {
        throw new Error("Method not implemented.");
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

    public static parse(accessor: string): Unhandled<AccessorParseException, [boolean, Operator]> {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Accessor can not be null!");
        }
        let parseResult: Unhandled<AccessorParseException, [boolean, string, Expression, Expression]> = null;

        parseResult = Operator.parseOperator(accessor, Operator.BOOLEAN);
        if (parseResult.isThrown()) {
            return new Unhandled<AccessorParseException, [boolean, Operator]>(parseResult.getException());
        }
        if (parseResult.get()[0] === false) {
            parseResult = Operator.parseOperator(accessor, Operator.LINES);
            if (parseResult.isThrown()) {
                return new Unhandled<AccessorParseException, [boolean, Operator]>(parseResult.getException());
            }
            if (parseResult.get()[0] === false) {
                parseResult = Operator.parseOperator(accessor, Operator.POINTS);
                if (parseResult.isThrown()) {
                    return new Unhandled<AccessorParseException, [boolean, Operator]>(parseResult.getException());
                }
                if (parseResult.get()[0] === false) {
                    return new Unhandled<AccessorParseException, [boolean, Operator]>([false, null]);
                }
            }
        }
        return new Unhandled<AccessorParseException, [boolean, Operator]>(
            [
                true,
                new Operator(
                    parseResult.get()[1],
                    parseResult.get()[2],
                    parseResult.get()[3]
                )
            ]
        );
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

    private static parseOperator(accessor: string, operators: string[]): Unhandled<AccessorParseException, [boolean, string, Expression, Expression]> {
		var roundBracketDepth: number = 0;
		var edgedBracketDepth: number = 0;
		var inString: boolean = false;
		let accessorChars: string[] = accessor.split("");
		for (var i: number = (accessorChars.length - 1);i >= 0;i--) {
			let c: string = accessorChars[i];
			if (c === '(') {
				roundBracketDepth--;
			} else if (c === ')') {
				roundBracketDepth++;
			} else if (c === '[') {
				edgedBracketDepth--;
			} else if (c === ']') {
				edgedBracketDepth++;
			} else if (c === '"') {
				inString = !inString;
			} else if ((roundBracketDepth === 0 && edgedBracketDepth === 0 && !inString)) {
				for (let operator of operators) {
					let operatorChars: string[] = operator.split("");
					var k: number = operatorChars.length - 1;
					for (var j: number = i;k >= 0 && j >= 0;j--) {
						let oc: string = operatorChars[k];
						let nc: string = accessorChars[j];
						if (oc !== nc) {
							break;
						}
						if (k === 0) {
							let left: string = accessor.substring(0, j);
							let right: string = accessor.substring(j + operatorChars.length);
							if (right.length === 0) {
                                return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>(new AccessorParseException("Right side of operator must exist!"));
							}
							if (left.length === 0) {
                                return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>(new AccessorParseException("Left side of operator must exist!"));
							}
                            let leftRes: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(left);
                            let rightRes: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(right);
                            if (leftRes.isThrown()) {
                                return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>(leftRes.getException());
                            }
                            if (rightRes.isThrown()) {
                                return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>(rightRes.getException());
                            }
							return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>([true, operator, leftRes.get(), rightRes.get()]);
						}
						k--;
					}
				}
			}
		}
		if (roundBracketDepth !== 0) {
			return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>(new AccessorParseException("Rounded brackets not closed!"));
		}
		return new Unhandled<AccessorParseException, [boolean, string, Expression, Expression]>([false, null, null, null]);
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
