import Parsable from '../util/Parsable';
import AccessorParseException from '../exception/AccessorParseException';
import VoidUnhandled from '../util/VoidUnhandled';
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

export default class Accessor implements Parsable<AccessorParseException> {

    private readonly accessor: string;
    private parsed: boolean;

    private expression: Expression;

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

	public constructor(accessor: string) {
        if (accessor === null || accessor === undefined) {
            throw new Error("Accessor can not be null or undefined!");
        }
        this.accessor = accessor;
        this.setParsed(false);
	}

    private getAccessor(): string {
        return this.accessor;
    }

    private setLinkExpression(expression: Expression): void {
        this.expression = expression;
    }

    public getLinkExpression(): Expression {
        return this.expression;
    }

    parse(): VoidUnhandled<AccessorParseException> {
        let res: Unhandled<AccessorParseException, Expression> = Accessor.parsePrepareAndExpression(this.getAccessor());
        if (res.isThrown()) {
            return new VoidUnhandled<AccessorParseException>(res.getException());
        }
        this.setLinkExpression(res.get());
        this.setParsed(true);
        return new VoidUnhandled<AccessorParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
    }

	private static parsePrepareAndExpression(accessor: string): Unhandled<AccessorParseException, Expression> {
		return Accessor.parseExpression(Accessor.prepareAccessor(accessor));
	}

	static parseExpression(accessor: string): Unhandled<AccessorParseException, Expression> {

		if (accessor.length === 0) {
			return new Unhandled<AccessorParseException, Expression>(new AccessorParseException("Accessor can not be empty!"));
		}
		var res: VoidUnhandled<AccessorParseException> = null;

		let expression0: Value = new Value(accessor);
        res = expression0.parse();
        if (res.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(res.get());
        }
        if (expression0.isParsed()) {
            return new Unhandled<AccessorParseException, Expression>(expression0);
        }
        let expression1: Brackets = new Brackets(accessor);
        res = expression1.parse();
        if (res.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(res.get());
        }
        if (expression1.isParsed()) {
            return new Unhandled<AccessorParseException, Expression>(expression1);
        }
        let expression2: Operator = new Operator(accessor);
        res = expression2.parse();
        if (res.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(res.get());
        }
        if (expression2.isParsed()) {
            return new Unhandled<AccessorParseException, Expression>(expression2);
        }
        let expression3: Property = new Property(accessor);
        res = expression3.parse();
        if (res.isThrown()) {
            return new Unhandled<AccessorParseException, Expression>(res.get());
        }
        if (expression3.isParsed()) {
            return new Unhandled<AccessorParseException, Expression>(expression3);
        }
        return new Unhandled<AccessorParseException, Expression>(new AccessorParseException("No expression found for accessor!"));
	}

	private static prepareAccessor(accessorName: string): string {
		var builder: string = "";
		var inString: boolean = false;
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
