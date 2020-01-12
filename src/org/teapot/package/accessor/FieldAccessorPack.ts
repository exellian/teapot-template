import Pack from '../Pack';
import ExpressionPack from './ExpressionPack';

export default class FieldAccessorPack extends Pack {

    //ARRAYFIELDACCESSOR
    public innerExpression: ExpressionPack;

    //FUNCTIONFIELDACCESSOR
    public parameters: ExpressionPack[];

    //OBJECTFIELDACCESSOR
    public accessor: string;
}
