import Pack from '../Pack';
import FieldAccessorPack from './FieldAccessorPack';

export default class ExpressionPack extends Pack {

    //BRAKCETS
    public innerExpression: ExpressionPack;

    //OPERATOR
    public operator: string;
	public left: ExpressionPack;
	public right: ExpressionPack;

    //PROPERTY
    public fields: FieldAccessorPack[];

    //VALUE
    public value: number | string | boolean;
}
