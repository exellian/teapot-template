import TemplatePack from './template/TemplatePack';
import Renderable from '../util/Renderable';
import RenderablePack from './template/RenderablePack';
import Text from '../template/Text';
import Tag from '../template/Tag';
import Attribute from '../template/Attribute';
import AttributePack from './template/AttributePack';
import ForAnnotation from '../annotation/ForAnnotation';
import Accessor from '../accessor/Accessor';
import AccessorPack from './accessor/AccessorPack';
import IfAnnotation from '../annotation/IfAnnotation';
import ExpressionPack from './accessor/ExpressionPack';
import Expression from '../accessor/Expression';

export default class Parser {

    public static fromJSON(json: string) {
        let pack: TemplatePack = JSON.parse(json);
    }

    private static parseTemplate(pack: TemplatePack): TeapotTemplate {
        return TeapotTemplate.from(Parser.parseRenderable(pack.root));
    }

    private static parseRenderable(pack: RenderablePack): Renderable {
        let renderable: Renderable = null;
        if (pack.type === 0) {
            renderable = new Text(pack.text);
        } else if (pack.type === 1) {
            renderable = new Tag(pack.name, Parser.parseRenderableArray(pack.children), Parser.parseAttributeArray(pack.attributes));
        } else if (pack.type === 2) {
            let fa: ForAnnotation = new ForAnnotation(null, Parser.parseRenderable(pack.next));
            fa.setIterator(pack.iterator);
            fa.setVariable(pack.variable);
            fa.setIterable(Parser.parseAccessor(pack.iterable));
            fa.setCondition(Parser.parseAccessor(pack.condition));
            fa.setDefinition(Parser.parseAccessor(pack.definition));
            fa.setIncrement(Parser.parseAccessor(pack.increment));
            fa.setDefinitionVariable(pack.definitionVariable);
            fa.setIncrementVariable(pack.incrementVariable);
            renderable = fa;
        } else if (pack.type === 3) {
            let ia: IfAnnotation = new IfAnnotation(null, Parser.parseRenderable(pack.next));
            ia.setAccessor(Parser.parseAccessor(pack.accessor));
            renderable = ia;
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
        return new Attribute(pack.name, pack.value);
    }

    private static parseAttributeArray(pack: AttributePack[]): Attribute[] {
        let result: Attribute[] = new Array(pack.length);
        for (let key in pack) {
            result[key] = Parser.parseAttribute(pack[key]);
        }
        return result;
    }

    private static parseAccessor(pack: AccessorPack): Accessor {
        return Accessor.from(Parser.parseExpression(pack.expression));
    }

    private static parseExpression(pack: ExpressionPack): Expression {
        let expression: Expression = null;
        if (pack.type === 0) {

        } else if (pack.type === 1) {

        } else if (pack.type === 2) {

        } else if (pack.type === 3) {

        }
    }

}
