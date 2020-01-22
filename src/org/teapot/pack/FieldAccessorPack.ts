import ExpressionPack from './ExpressionPack';
import Pack from '../abstract/Pack';

export default class FieldAccessorPack extends Pack {

    //ARRAYFIELDACCESSOR
    public innerExpression: ExpressionPack = null;

    //FUNCTIONFIELDACCESSOR
    public parameters: ExpressionPack[] = null;

    //OBJECTFIELDACCESSOR
    public accessor: string = null;

}
