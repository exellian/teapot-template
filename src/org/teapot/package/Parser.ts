import TemplatePack from './template/TemplatePack';
import Template from '../template/Template';
import Renderable from '../util/Renderable';
import RenderablePack from './template/RenderablePack';
import Text from '../template/Text';
import Tag from '../template/Tag';
import Attribute from '../template/Attribute';
import AttributePack from './template/AttributePack';

export default class Parser {

    public static fromJSON(json: string) {
        let pack: TemplatePack = JSON.parse(json);
    }

    private static parseTemplate(pack: TemplatePack): Template {
        return Template.from(Parser.parseRenderable(pack.root));
    }

    private static parseRenderable(pack: RenderablePack): Renderable {
        let renderable: Renderable = null;
        if (pack.type === 0) {
            renderable = new Text(pack.text);
        } else if (pack.type === 1) {
            renderable = new Tag(pack.name, Parser.parseRenderableArray(pack.children), Parser.parseAttributeArray(pack.attributes));
        } else if (pack.type === 2) {

        } else if (pack.type === 3) {

        }
        return renderable;
    }

    private static parseRenderableArray(pack: RenderablePack[]): Renderable[] {
        let result: Renderable[] = new Array(pack.length);
        for (let key in pack) {
            result[key] = Parser.parseRenderable(pack[key]);
        }
        return result;
    }

    private static parseAttribute(pack: AttributePack): Attribute {
        let a: Attribute = new Attribute(pack.name, pack.value);
        return a;
    }

    private static parseAttributeArray(pack: AttributePack[]): Attribute[] {
        let result: Attribute[] = new Array(pack.length);
        for (let key in pack) {
            result[key] = Parser.parseAttribute(pack[key]);
        }
        return result;
    }

}
