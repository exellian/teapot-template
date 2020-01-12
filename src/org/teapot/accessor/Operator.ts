import Expression from './Expression';
import AccessorParseException from '../exception/AccessorParseException';
import Parsable from '../util/Parsable';
import VoidUnhandled from '../util/VoidUnhandled';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import StringParseException from '../exception/StringParseException';
import NumberFormatException from '../exception/NumberFormatException';
import BooleanParseException from '../exception/BooleanParseException';
import Accessor from './Accessor';

export default class Operator implements Expression {

    private static readonly BOOLEAN: string[] = [ "==", "<", ">", "<=", ">=" ];
    private static readonly POINTS: string[] = [ "*", "/" ];
    private static readonly LINES: string[] = [ "+", "-" ];

    private readonly accessor: string;

    private operator: string;
	private left: Expression;
	private right: Expression;

    private parsed: boolean;

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    public constructor(accessor: string) {
        this.accessor = accessor;
        this.setParsed(false);
    }

    private setOperator(operator: string): void {
        this.operator = operator;
    }

    private setLinkLeft(left: Expression): void {
        this.left = left;
    }

    private setLinkRight(right: Expression): void {
        this.right = right;
    }

    public getOperator(): string {
        return this.operator;
    }

    public getLinkLeft(): Expression {
        return this.left;
    }

    public getLinkRight(): Expression {
        return this.right;
    }

    private getAccessor(): string {
        return this.accessor;
    }

    parse(): VoidUnhandled<AccessorParseException> {
        let res0: Unhandled<AccessorParseException, boolean> = this.parseOperator(this.getAccessor(), Operator.BOOLEAN);
        if (res0.isThrown()) {
            return new VoidUnhandled<AccessorParseException>(res0.getException());
        }
        if (res0.get() === false) {
            let res1: Unhandled<AccessorParseException, boolean> = this.parseOperator(this.getAccessor(), Operator.LINES);
            if (res1.isThrown()) {
                return new VoidUnhandled<AccessorParseException>(res0.getException());
            }
            if (res1.get() === false) {
                let res2: Unhandled<AccessorParseException, boolean> = this.parseOperator(this.getAccessor(), Operator.POINTS);
                if (res2.isThrown()) {
                    return new VoidUnhandled<AccessorParseException>(res0.getException());
                }
                if (res2.get() === false) {
                    return new VoidUnhandled<AccessorParseException>();
                }
            }
        }
        this.setParsed(true);
        return new VoidUnhandled<AccessorParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
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

    private parseOperator(accessor: string, operators: string[]): Unhandled<AccessorParseException, boolean> {
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
                                return new Unhandled<AccessorParseException, boolean>(new AccessorParseException("Right side of operator must exist!"));
							}
							if (left.length === 0) {
                                return new Unhandled<AccessorParseException, boolean>(new AccessorParseException("Left side of operator must exist!"));
							}
                            let leftRes: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(left);
                            let rightRes: Unhandled<AccessorParseException, Expression> = Accessor.parseExpression(right);
                            if (leftRes.isThrown()) {
                                return new Unhandled<AccessorParseException, boolean>(leftRes.getException());
                            }
                            if (rightRes.isThrown()) {
                                return new Unhandled<AccessorParseException, boolean>(rightRes.getException());
                            }
                            this.setOperator(operator);
							this.setLinkLeft(leftRes.get());
							this.setLinkRight(rightRes.get());
							return new Unhandled<AccessorParseException, boolean>(true);
						}
						k--;
					}
				}
			}
		}
		if (roundBracketDepth !== 0) {
			throw new AccessorParseException("Rounded brackets not closed!");
		}
		return new Unhandled<AccessorParseException, boolean>(false);
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
