import AttributePack from './AttributePack';
import AccessorPack from './AccessorPack';
import Pack from '../abstract/Pack';

export default class RenderablePack extends Pack {

    //TEXT
    public text: string;

    //TAG
    public name: string;
    public children: RenderablePack[];
    public attributes: AttributePack[];

    //ANNOTATION
    public next: RenderablePack;

    //FOR ANNOTATION
    public condition: AccessorPack;
    public definition: AccessorPack;
    public increment: AccessorPack;
    public definitionVariable: string;
    public incrementVariable: string;
    public iterator: boolean;
    public iterable: AccessorPack;
    public variable: string;

    //IF ANNOTATION
    public accessor: AccessorPack;

}
