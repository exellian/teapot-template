import FieldAccessorPack from './FieldAccessorPack';
import Pack from '../abstract/Pack';

export default class ExpressionPack extends Pack {

    //BRACKETS
    public innerExpression: ExpressionPack = null;

    //OPERATOR
    public operator: string = null;
	public left: ExpressionPack = null;
	public right: ExpressionPack = null;

    //PROPERTY
    public fields: FieldAccessorPack[] = null;

    //VALUE
    public value: number | string | boolean = null;

}
