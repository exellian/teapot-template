import AttributePack from './AttributePack';
import AccessorPack from './AccessorPack';
import Pack from '../abstract/Pack';
import TextPartitionPack from './TextPartitionPack';

export default class RenderablePack extends Pack {

    //TEXT
    public textPartitions: TextPartitionPack[] = null;

    //TAG
    public name: string = null;
    public children: RenderablePack[] = null;
    public attributes: AttributePack[] = null;

    //ANNOTATION
    public next: RenderablePack = null;

    //FOR ANNOTATION
    public condition: AccessorPack = null;
    public definition: AccessorPack = null;
    public increment: AccessorPack = null;
    public definitionVariable: string = null;
    public incrementVariable: string = null;
    public iterator: boolean = null;
    public iterable: AccessorPack = null;
    public variable: string = null;

    //IF ANNOTATION
    public accessor: AccessorPack = null;

}
