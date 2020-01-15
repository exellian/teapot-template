import AccessorParseException from '../exception/AccessorParseException';
import Unhandled from '../util/Unhandled';
import Expression from './Expression';
import Scope from '../view/Scope';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Value from './Value';
import Brackets from './Brackets';
import Operator from './Operator';
import Property from './Property';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import AccessorPack from '../pack/AccessorPack';
import Packable from '../abstract/Packable';

export default class Accessor implements Packable<AccessorPack> {

    private readonly expression: Expression;

	private constructor(expression: Expression) {
        if (!Checker.checkNotNull(expression)) {
            throw new IllegalArgumentException("Given expression can not be null!");
        }
        this.expression = expression;
	}

    pack(): AccessorPack {
        throw new Error("Method not implemented.");
    }

    public static parse(accessor: string): Unhandled<AccessorParseException, Accessor> {
        if (!Checker.checkNotNull(accessor)) {
            throw new IllegalArgumentException("Given accessor can not be null!");
        }
        let res: Unhandled<AccessorParseException, Expression> = Accessor.parsePrepareAndExpression(accessor);
        if (res.isThrown()) {
            return new Unhandled<AccessorParseException, Accessor>(res.getException());
        }
        return new Unhandled<AccessorParseException, Accessor>(new Accessor(res.get()));
    }

	private static parsePrepareAndExpression(accessor: string): Unhandled<AccessorParseException, Expression> {
		return Accessor.parseExpression(Accessor.prepareAccessor(accessor));
	}

	static parseExpression(accessor: string): Unhandled<AccessorParseException, Expression> {

		if (accessor.length === 0) {
			return new Unhandled<AccessorParseException, Expression>(new AccessorParseException("Accessor can not be empty!"));
		}

        let valueExpression: [boolean, Value] = Value.parse(accessor);
        if (valueExpression[0] === true) {
            return new Unhandled<AccessorParseException, Expression>(valueExpression[1]);
        }
        if (Brackets.checkFormat(accessor)) {
            return Brackets.parse(accessor);
        }
        let operatorExpression: Unhandled<AccessorParseException, [boolean, Operator]> = Operator.parse(accessor);
        if (operatorExpression.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(operatorExpression.getException());
        }
        if (operatorExpression.get()[0] === true) {
            return new Unhandled<AccessorParseException, Expression>(operatorExpression.get()[1]);
        }
        let propertyExpression: Unhandled<AccessorParseException, Property> = Property.parse(accessor);
        if (propertyExpression.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(propertyExpression.getException());
        }
        return new Unhandled<AccessorParseException, Expression>(propertyExpression.get());
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
