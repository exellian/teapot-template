import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';

export default class Text implements Renderable {

    private readonly text: string;

    public constructor(text: string) {
        this.text = text;
    }

    public getText(): string {
        return this.text;
    }

    render(_scope: Scope): Unhandled<RenderException, Node> {
        return new Unhandled<RenderException, Node>(document.createTextNode(this.getText()));
    }

}
