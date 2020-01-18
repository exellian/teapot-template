import Unhandled from '../../util/Unhandled';
import AccessorParseException from '../../exception/AccessorParseException';
import Brackets from '../../accessor/Brackets';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import Expression from '../../accessor/Expression';
import ExpressionParser from './ExpressionParser';

export default class BracketsParser {

    public static checkFormat(accessor: string): boolean {
        return (accessor.startsWith("(") && accessor.endsWith(")"));
    }

    public static parse(accessor: string): Unhandled<AccessorParseException, Brackets> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, Brackets>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }
        if (!BracketsParser.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, Brackets>(new AccessorParseException("Brackets must be surrounded by ()!"));
        }
		let expression: Unhandled<AccessorParseException, Expression> =
            ExpressionParser.parseExpression(accessor.substring(1, accessor.length - 1));
        if (expression.isThrown()) {
            return new Unhandled<AccessorParseException, Brackets>(expression.getException());
        }
        let brackets: Unhandled<IllegalArgumentException, Brackets> = Brackets.from(expression.get());
        if (brackets.isThrown()) {
            return new Unhandled<AccessorParseException, Brackets>(new AccessorParseException(brackets.getException()));
        }
		return new Unhandled<AccessorParseException, Brackets>(brackets.get());
    }
}
