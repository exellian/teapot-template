import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import RenderException from '../exception/RenderException';
import TextPartition from './TextPartition';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import TextPartitionPack from '../pack/TextPartitionPack';
import TeapotPackType from '../pack/TeapotPackType';

export default class RawTextPartition implements TextPartition {

    private readonly text: string;

    private constructor(text: string) {
        this.text = text;
    }

    public static from(text: string): Unhandled<IllegalArgumentException, RawTextPartition> {
        if (!Checker.checkNotNull(text)) {
            return new Unhandled<IllegalArgumentException, RawTextPartition>(new IllegalArgumentException("Text can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, RawTextPartition>(new RawTextPartition(text));
    }

    public render(_scope: Scope): Unhandled<RenderException, string> {
        return new Unhandled<RenderException, string>(this.getText());
    }

    public pack(): TextPartitionPack {
        let pack: TextPartitionPack = new TextPartitionPack(TeapotPackType.RAW_TEXT);
        pack.text = this.getText();
        return pack;
    }

    private getText(): string {
        return this.text;
    }
}
