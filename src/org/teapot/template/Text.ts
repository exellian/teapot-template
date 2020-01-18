import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import Renderable from './Renderable';
import RenderablePack from '../pack/RenderablePack';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import TeapotPackType from '../pack/TeapotPackType';

export default class Text implements Renderable {

    private readonly text: string;

    private constructor(text: string) {
        this.text = text;
    }

    public static from(text: string): Unhandled<IllegalArgumentException, Text> {
        if (!Checker.checkNotNull(text)) {
            return new Unhandled<IllegalArgumentException, Text>(new IllegalArgumentException("Text can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Text>(new Text(text));
    }

    pack(): RenderablePack {
        let pack: RenderablePack = new RenderablePack(TeapotPackType.TEXT);
        pack.text = this.getText();
        return pack;
    }

    render(_scope: Scope): Unhandled<RenderException, Node> {
        return new Unhandled<RenderException, Node>(document.createTextNode(this.getText()));
    }

    public getText(): string {
        return this.text;
    }

}
