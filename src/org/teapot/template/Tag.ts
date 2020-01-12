import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import Attribute from './Attribute';

export default class Tag implements Renderable {

    private readonly children: Renderable[] = [];
    private readonly name: string;
    private readonly attributes: Attribute[];

    public constructor(name: string, children: Renderable[], attributes: Attribute[]) {
        this.name = name;
        this.children = children;
        this.attributes = attributes;
    }

    public getLinkChildren(): Renderable[] {
        return this.children;
    }

    public getAttributes(): Attribute[] {
        return this.attributes;
    }

    render(scope: Scope): Unhandled<RenderException, Node> {

        let element: HTMLElement = document.createElement(this.getName());
        for (let r of this.getLinkChildren()) {
            let renderRes: Unhandled<RenderException, Node> = r.render(scope);
            if (renderRes.isThrown()) {
                renderRes.reset();
                return renderRes;
            }
            element.appendChild(renderRes.get());
        }
        return new Unhandled<RenderException, Node>(element);
    }

    public getName(): string {
        return this.name;
    }
}
