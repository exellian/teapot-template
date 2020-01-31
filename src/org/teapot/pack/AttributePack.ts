import Pack from '../abstract/Pack';
import TextPartitionPack from './TextPartitionPack';

export default class AttributePack extends Pack {

    public name: string;
    public value: TextPartitionPack;

}
