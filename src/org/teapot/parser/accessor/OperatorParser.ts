import Unhandled from '../../util/Unhandled';
import AccessorParseException from '../../exception/AccessorParseException';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import Checker from '../../util/Checker';
import Expression from '../../accessor/Expression';
import Operator from '../../accessor/Operator';
import ExpressionParser from './ExpressionParser';

export default class OperatorParser {

    private static readonly BOOLEAN: string[] = [ "==", "<", ">", "<=", ">=" ];
    private static readonly POINTS: string[] = [ "*", "/" ];
    private static readonly LINES: string[] = [ "+", "-" ];

    public static parse(accessor: string): Unhandled<AccessorParseException, [boolean, Operator]> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, [boolean, Operator]>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }
        let parseResult: Unhandled<AccessorParseException, [boolean, string, Expression, Expression]> = null;

        parseResult = OperatorParser.parseOperator(accessor, OperatorParser.BOOLEAN);
        if (parseResult.isThrown()) {
            return new Unhandled<AccessorParseException, [boolean, Operator]>(parseResult.getException());
        }
        if (parseResult.get()[0] === false) {
            parseResult = OperatorParser.parseOperator(accessor, OperatorParser.LINES);
            if (parseResult.isThrown()) {
                return new Unhandled<AccessorParseException, [boolean, Operator]>(parseResult.getException());
            }
            if (parseResult.get()[0] === false) {
                parseResult = OperatorParser.parseOperator(accessor, OperatorParser.POINTS);
                if (parseResult.isThrown()) {
                    return new Unhandled<AccessorParseException, [boolean, Operator]>(parseResult.getException());
                }
                if (parseResult.get()[0] === false) {
                    return new Unhandled<AccessorParseException, [boolean, Operator]>([false, null]);
                }
            }
        }
        let operator: Unhandled<IllegalArgumentException, Operator> = Operator.from(parseResult.get()[1], parseResult.get()[2], parseResult.get()[3]);
        if (operator.isThrown()) {
            return new Unhandled<AccessorParseException, [boolean, Operator]>(new AccessorParseException(operator.getException()));
        }
        return new Unhandled<AccessorParseException, [boolean, Operator]>([ true, operator.get() ]);
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
                            let leftRes: Unhandled<AccessorParseException, Expression> = ExpressionParser.parseExpression(left);
                            let rightRes: Unhandled<AccessorParseException, Expression> = ExpressionParser.parseExpression(right);
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
}
