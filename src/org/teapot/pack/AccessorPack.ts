import ExpressionPack from './ExpressionPack';
import Pack from '../abstract/Pack';

export default class AccessorPack extends Pack {

    public expression: ExpressionPack;

    public toJSON(): string {
        return JSON.stringify(this);
    }


}
