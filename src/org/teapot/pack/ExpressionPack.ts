import FieldAccessorPack from './FieldAccessorPack';
import Pack from '../abstract/Pack';

export default class ExpressionPack extends Pack {

    //BRACKETS
    public innerExpression: ExpressionPack;

    //OPERATOR
    public operator: string;
	public left: ExpressionPack;
	public right: ExpressionPack;

    //PROPERTY
    public fields: FieldAccessorPack[];

    //VALUE
    public value: number | string | boolean;

    public toJSON(): string {
        return JSON.stringify(this);
    }
}
