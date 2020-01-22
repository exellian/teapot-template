import Pack from '../abstract/Pack';
import TextPartitionPack from './TextPartitionPack';

export default class AttributePack extends Pack {

    public name: string = null;
    public value: TextPartitionPack[] = null;

}
