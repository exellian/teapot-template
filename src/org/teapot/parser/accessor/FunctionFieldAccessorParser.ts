import Unhandled from '../../util/Unhandled';
import AccessorParseException from '../../exception/AccessorParseException';
import FunctionFieldAccessor from '../../accessor/FunctionFieldAccessor';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import Expression from '../../accessor/Expression';
import ExpressionParser from './ExpressionParser';

export default class FunctionFieldAccessorParser {

    public static parse(accessor: string): Unhandled<AccessorParseException, FunctionFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, FunctionFieldAccessor>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }
        if (!FunctionFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, FunctionFieldAccessor>(new AccessorParseException("FunctionFieldAccessor must be surrounded by ()!"));
        }
        let parameters: Expression[] = [];
		let funcParts: string[] = FunctionFieldAccessorParser.split(accessor);
		for (let param of funcParts) {
            let expr: Unhandled<AccessorParseException, Expression> = ExpressionParser.parseExpression(param);
            if (expr.isThrown()) {
                return new Unhandled<AccessorParseException, FunctionFieldAccessor>(expr.getException());
            }
			parameters.push(expr.get());
		}
        let functionFieldAccessor: Unhandled<IllegalArgumentException, FunctionFieldAccessor> = FunctionFieldAccessor.from(parameters);
        if (functionFieldAccessor.isThrown()) {
            return new Unhandled<AccessorParseException, FunctionFieldAccessor>(new AccessorParseException(functionFieldAccessor.getException()));
        }
		return new Unhandled<AccessorParseException, FunctionFieldAccessor>(functionFieldAccessor.get());
    }

    private static split(accessor: string): string[] {

		let parts: string[] = [];
		let chars: string[] = accessor.split("");
		let part: string = "";
		let roundedBracketDepth: number = 0;
		for (let c of chars) {
			if (c === '(') {
				roundedBracketDepth++;
				continue;
			} else if (c === ')' && --roundedBracketDepth === 0) {
				if (part.length !== 0) {
                    parts.push(part);
					part = "";
				}
				continue;
			} else if (c === ',' && roundedBracketDepth === 1) {
				parts.push(part);
				part = "";
				continue;
			}
			part += c;
		}
		return parts;
	}

}
