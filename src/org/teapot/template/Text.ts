import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import Renderable from './Renderable';
import RenderablePack from '../pack/RenderablePack';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import TeapotPackType from '../pack/TeapotPackType';
import TextPartition from './TextPartition';
import TextPartitionPack from '../pack/TextPartitionPack';

export default class Text implements Renderable {

    private readonly textPartitions: TextPartition[];

    private constructor(textPartitions: TextPartition[]) {
        this.textPartitions = textPartitions;
    }

    public static from(textPartitions: TextPartition[]): Unhandled<IllegalArgumentException, Text> {
        if (!Checker.checkNotNull(textPartitions)) {
            return new Unhandled<IllegalArgumentException, Text>(new IllegalArgumentException("Text partitions can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Text>(new Text(textPartitions));
    }

    public pack(): RenderablePack {
        let pack: RenderablePack = new RenderablePack(TeapotPackType.TEXT);
        let packs: TextPartitionPack[] = [];
        for (let textPartition of this.getLinkTextPartitions()) {
            packs.push(textPartition.pack());
        }
        pack.textPartitions = packs;
        return pack;
    }

    public render(scope: Scope): Unhandled<RenderException, Node> {
        let text: string = "";
        for (let textPartition of this.getLinkTextPartitions()) {
            let render: Unhandled<RenderException, string> = textPartition.render(scope);
            if (render.isThrown()) {
                return new Unhandled<RenderException, Node>(render.getException());
            }
            text += render.get();
        }
        return new Unhandled<RenderException, Node>(document.createTextNode(text));
    }

    private getLinkTextPartitions(): TextPartition[] {
        return this.textPartitions;
    }

}
