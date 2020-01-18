import Unhandled from '../../util/Unhandled';
import AccessorParseException from '../../exception/AccessorParseException';
import Expression from '../../accessor/Expression';
import Value from '../../accessor/Value';
import Operator from '../../accessor/Operator';
import Property from '../../accessor/Property';
import BracketsParser from './BracketsParser';
import ValueParser from './ValueParser';
import OperatorParser from './OperatorParser';
import PropertyParser from './PropertyParser';

export default class ExpressionParser {

    public static parseExpression(accessor: string): Unhandled<AccessorParseException, Expression> {

		if (accessor.length === 0) {
			return new Unhandled<AccessorParseException, Expression>(new AccessorParseException("Accessor can not be empty!"));
		}
        let valueExpression: Unhandled<AccessorParseException, [boolean, Value]> = ValueParser.parse(accessor);
        if (valueExpression.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(valueExpression.getException());
        }
        if (valueExpression.get()[0] === true) {
            return new Unhandled<AccessorParseException, Expression>(valueExpression.get()[1]);
        }
        if (BracketsParser.checkFormat(accessor)) {
            return BracketsParser.parse(accessor);
        }
        let operatorExpression: Unhandled<AccessorParseException, [boolean, Operator]> = OperatorParser.parse(accessor);
        if (operatorExpression.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(operatorExpression.getException());
        }
        if (operatorExpression.get()[0] === true) {
            return new Unhandled<AccessorParseException, Expression>(operatorExpression.get()[1]);
        }
        let propertyExpression: Unhandled<AccessorParseException, Property> = PropertyParser.parse(accessor);
        if (propertyExpression.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(propertyExpression.getException());
        }
        return new Unhandled<AccessorParseException, Expression>(propertyExpression.get());
	}
}
