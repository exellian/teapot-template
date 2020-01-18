import ExpressionPack from './ExpressionPack';
import Pack from '../abstract/Pack';

export default class FieldAccessorPack extends Pack {

    //ARRAYFIELDACCESSOR
    public innerExpression: ExpressionPack;

    //FUNCTIONFIELDACCESSOR
    public parameters: ExpressionPack[];

    //OBJECTFIELDACCESSOR
    public accessor: string;

}
