import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import Accessor from '../../accessor/Accessor';
import AccessorParseException from '../../exception/AccessorParseException';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import Expression from '../../accessor/Expression';
import ExpressionParser from './ExpressionParser';

export default class AccessorParser {

    public static parse(accessor: string): Unhandled<TemplateParseException, Accessor> {
        if (!Checker.checkNotNull(accessor)) {
            return new Unhandled<TemplateParseException, Accessor>(new TemplateParseException(new IllegalArgumentException("Given accessor can not be null!")));
        }
        let expression: Unhandled<AccessorParseException, Expression> = AccessorParser.parsePrepareAndExpression(accessor);
        if (expression.isThrown()) {
            return new Unhandled<AccessorParseException, Accessor>(expression.getException());
        }
        let accessorResult: Unhandled<IllegalArgumentException, Accessor> = Accessor.from(expression.get());
        if (accessorResult.isThrown()) {
            return new Unhandled<AccessorParseException, Accessor>(new TemplateParseException(accessorResult.getException()));
        }
        return new Unhandled<AccessorParseException, Accessor>(accessorResult.get());
    }

	private static parsePrepareAndExpression(accessor: string): Unhandled<AccessorParseException, Expression> {
		return ExpressionParser.parseExpression(AccessorParser.prepareAccessor(accessor));
	}

	private static prepareAccessor(accessorName: string): string {
		let builder: string = "";
		let inString: boolean = false;
		for (let c of accessorName.split("")) {
			if (c === '"') {
				inString = !inString;
			}
			if (!inString && c === ' ') {
				continue;
			}
			if (!inString && c === '	') {
				continue;
			}
			builder += c;
		}
		return builder;
	}
}
