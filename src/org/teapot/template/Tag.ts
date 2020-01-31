import Scope from '../view/Scope';
import RenderException from '../exception/RenderException';
import Unhandled from '../util/Unhandled';
import Attribute from './Attribute';
import Renderable from './Renderable';
import RenderablePack from '../pack/RenderablePack';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import TeapotPackType from '../pack/TeapotPackType';
import AttributePack from '../pack/AttributePack';

export default class Tag implements Renderable {

    private readonly children: Renderable[] = [];
    private readonly name: string;
    private readonly attributes: Attribute[];

    private constructor(name: string, children: Renderable[], attributes: Attribute[]) {
        this.name = name;
        this.children = children;
        this.attributes = attributes;
    }

    public static from(name: string, children: Renderable[], attributes: Attribute[]): Unhandled<IllegalArgumentException, Tag> {
        if (!Checker.checkNotNull(name)) {
            return new Unhandled<IllegalArgumentException, Tag>(new IllegalArgumentException("Name can not be null!"));
        }
        if (!Checker.checkNotNull(children)) {
            return new Unhandled<IllegalArgumentException, Tag>(new IllegalArgumentException("Children can not be null!"));
        }
        if (!Checker.checkNotNull(attributes)) {
            return new Unhandled<IllegalArgumentException, Tag>(new IllegalArgumentException("Attributes can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, Tag>(new Tag(name, children, attributes));
    }

    pack(): RenderablePack {
        let pack: RenderablePack = new RenderablePack(TeapotPackType.TAG);
        let children: RenderablePack[] = [];
        let attributes: AttributePack[] = [];

        for (let child of this.getLinkChildren()) {
            children.push(child.pack());
        }
        for (let attribute of this.getAttributes()) {
            attributes.push(attribute.pack());
        }
        pack.name = this.getName();
        pack.children = children;
        pack.attributes = attributes;
        return pack;
    }

    public getLinkChildren(): Renderable[] {
        return this.children;
    }

    public getAttributes(): Attribute[] {
        return this.attributes;
    }

    render(scope: Scope): Unhandled<RenderException, Node> {

        let element: HTMLElement = document.createElement(this.getName());
        for (let attribute of this.getAttributes()) {
            let attributeValue: Unhandled<RenderException, string> = attribute.getLinkValue().render(scope);
            if (attributeValue.isThrown()) {
                return new Unhandled<RenderException, Node>(attributeValue.getException());
            }
            element.setAttribute(attribute.getName(), attributeValue.get());
        }
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
