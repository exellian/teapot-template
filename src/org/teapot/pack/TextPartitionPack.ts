import Pack from '../abstract/Pack';
import AccessorPack from './AccessorPack';

export default class TextPartitionPack extends Pack {

    //ValueTextPartition
    public valueAccessor: AccessorPack = null;

    //RawTextPartition
    public text: string = null;

}
