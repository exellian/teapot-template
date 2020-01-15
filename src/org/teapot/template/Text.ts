import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import Renderable from './Renderable';
import RenderablePack from '../pack/RenderablePack';

export default class Text implements Renderable {

    private readonly text: string;

    public constructor(text: string) {
        this.text = text;
    }

    pack(): RenderablePack {
        throw new Error("Method not implemented.");
    }

    public getText(): string {
        return this.text;
    }

    render(_scope: Scope): Unhandled<RenderException, Node> {
        return new Unhandled<RenderException, Node>(document.createTextNode(this.getText()));
    }

}
