import Unhandled from '../../util/Unhandled';
import ArrayFieldAccessor from '../../accessor/ArrayFieldAccessor';
import AccessorParseException from '../../exception/AccessorParseException';
import Checker from '../../util/Checker';
import Expression from '../../accessor/Expression';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import ExpressionParser from './ExpressionParser';

export default class ArrayFieldAccessorParser {

    public static parse(accessor: string): Unhandled<AccessorParseException, ArrayFieldAccessor> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new AccessorParseException(new IllegalArgumentException("Accessor can not be null!")));
        }
        if (!ArrayFieldAccessor.checkFormat(accessor)) {
            return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new AccessorParseException("ArrayFieldAccessor must be surrounded by []!"));
        }
		let innerPart: string = accessor.substring(1, accessor.length - 1);
		if (innerPart.length === 0) {
			return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new AccessorParseException("Array accessor can not be empty!"));
		}
        let innerExpression: Unhandled<AccessorParseException, Expression> = ExpressionParser.parseExpression(innerPart);
        if (innerExpression.isThrown()) {
            return new Unhandled<AccessorParseException, ArrayFieldAccessor>(innerExpression.getException());
        }
        let arrayFieldAccessor: Unhandled<IllegalArgumentException, ArrayFieldAccessor> = ArrayFieldAccessor.from(innerExpression.get());
        if (arrayFieldAccessor.isThrown()) {
            return new Unhandled<AccessorParseException, ArrayFieldAccessor>(new AccessorParseException(arrayFieldAccessor.getException()));
        }
        return new Unhandled<AccessorParseException, ArrayFieldAccessor>(arrayFieldAccessor.get());
    }
}
