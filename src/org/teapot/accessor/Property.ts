import Expression from "./Expression";
import FieldAccessor from './FieldAccessor';
import Unhandled from '../util/Unhandled';
import Scope from '../view/Scope';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import PrimitiveField from '../view/PrimitiveField';
import Field from '../view/Field';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import ExpressionPack from '../pack/ExpressionPack';
import TeapotPackType from '../pack/TeapotPackType';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default class Property implements Expression {

	private readonly fields: FieldAccessor[];

    private constructor(fields: FieldAccessor[]) {
        if (!Checker.checkNotNull(fields)) {
            throw new IllegalArgumentException("Fields can not be null!");
        }
        this.fields = fields;
    }

	public static from(fields: FieldAccessor[]): Unhandled<IllegalArgumentException, Property> {
        if (!Checker.checkNotNull(fields)) {
            return new Unhandled<IllegalArgumentException, Property>(new IllegalArgumentException("Fields can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Property>(new Property(fields));
    }

	pack(): ExpressionPack {
		let pack: ExpressionPack = new ExpressionPack(TeapotPackType.PROPERTY);
		let packs: FieldAccessorPack[] = [];
        for (let field of this.getLinkFields()) {
            packs.push(field.pack());
        }
        pack.fields = packs;
        return pack;
	}

    private getLinkFields(): FieldAccessor[] {
        return this.fields;
    }

    get(scope: Scope): Unhandled<InvalidViewAccessException, PrimitiveField> {
        let aktField: Field = scope;
		for (let field of this.getLinkFields()) {
            let fieldRes: Unhandled<InvalidViewAccessException, Field> = field.get(scope, aktField);
            if (fieldRes.isThrown()) {
                return new Unhandled<InvalidViewAccessException, PrimitiveField>(fieldRes.getException());
            }
			aktField = fieldRes.get();
		}

		if (!(aktField instanceof PrimitiveField)) {
			return new Unhandled<InvalidViewAccessException, PrimitiveField>(new InvalidViewAccessException("Try to access non primitve value!"));
		}
		return new Unhandled<InvalidViewAccessException, PrimitiveField>(<PrimitiveField>aktField);
    }

    getField(scope: Scope): Unhandled<InvalidViewAccessException, Field> {
        let aktField: Field = scope;
		for (let field of this.getLinkFields()) {
            let fieldRes: Unhandled<InvalidViewAccessException, Field> = field.get(scope, aktField);
            if (fieldRes.isThrown()) {
                return new Unhandled<InvalidViewAccessException, Field>(fieldRes.getException());
            }
			aktField = fieldRes.get();
		}
		return new Unhandled<InvalidViewAccessException, Field>(aktField);
    }



}
