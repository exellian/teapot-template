import Template from '../template/Template';
import TemplatePack from './template/TemplatePack';
import Renderable from '../util/Renderable';
import RenderablePack from './template/RenderablePack';
import Tag from '../template/Tag';
import Text from '../template/Text';
import ForAnnotation from '../annotation/ForAnnotation';
import IfAnnotation from '../annotation/IfAnnotation';
import Accessor from '../accessor/Accessor';
import AccessorPack from './accessor/AccessorPack';
import Expression from '../accessor/Expression';
import ExpressionPack from './accessor/ExpressionPack';
import Brackets from '../accessor/Brackets';
import Operator from '../accessor/Operator';
import Property from '../accessor/Property';
import Value from '../accessor/Value';
import FieldAccessor from '../accessor/FieldAccessor';
import FieldAccessorPack from './accessor/FieldAccessorPack';
import ArrayFieldAccessor from '../accessor/ArrayFieldAccessor';
import FunctionFieldAccessor from '../accessor/FunctionFieldAccessor';
import ObjectFieldAccessor from '../accessor/ObjectFieldAccessor';
import Attribute from '../template/Attribute';
import AttributePack from './template/AttributePack';

export default class Packer {

    public static toJSON(object: Template): string {
        return JSON.stringify(Packer.toPack(object));
    }

    public static toPack(object: Template): TemplatePack {
        let template: TemplatePack = new TemplatePack(0);
        template.root = Packer.toJSONRenderable(object.getLinkRoot());
        return template;
    }

    private static toJSONRenderable(object: Renderable): RenderablePack {
        if (object === null) {
            return null;
        }
        let renderable: RenderablePack = null;
        if (object instanceof Text) {
            renderable = new RenderablePack(0);
            renderable.text = object.getText();
        } else if (object instanceof Tag) {
            renderable = new RenderablePack(1);
            renderable.name = object.getName();
            renderable.children = Packer.toJSONRenderableArray(object.getLinkChildren());
            renderable.attributes = Packer.toJSONAttributeArray(object.getAttributes());
        } else if (object instanceof ForAnnotation) {
            renderable = new RenderablePack(2);
            renderable.condition = Packer.toJSONAccessor(object.getCondition());
            renderable.definition = Packer.toJSONAccessor(object.getDefinition());
            renderable.increment = Packer.toJSONAccessor(object.getIncrement());
            renderable.definitionVariable = object.getDefinitionVariable();
            renderable.incrementVariable = object.getIncrementVariable();
            renderable.iterator = object.isIterator();
            renderable.iterable = Packer.toJSONAccessor(object.getIterable());
            renderable.variable = object.getVariable();
        } else if (object instanceof IfAnnotation) {
            renderable = new RenderablePack(3);
            renderable.accessor = Packer.toJSONAccessor(object.getAccessor());
        }
        return renderable;
    }

    private static toJSONRenderableArray(object: Renderable[]): RenderablePack[] {
        if (object === null) {
            return null;
        }
        let result: RenderablePack[] = new Array(object.length);
        for (let key in object) {
            result[key] = Packer.toJSONRenderable(object[key]);
        }
        return result;
    }

    private static toJSONAccessor(object: Accessor): AccessorPack {
        if (object === null) {
            return null;
        }
        let accessor: AccessorPack = new AccessorPack(0);
        accessor.expression = Packer.toJSONExpression(object.getLinkExpression());
        return accessor;
    }

    private static toJSONExpression(object: Expression): ExpressionPack {
        if (object === null) {
            return null;
        }
        let expression: ExpressionPack = null;
        if (object instanceof Brackets) {
            expression = new ExpressionPack(0);
            expression.innerExpression = Packer.toJSONExpression(object.getLinkInnerExpression());
        } else if (object instanceof Operator) {
            expression = new ExpressionPack(1);
            expression.left = Packer.toJSONExpression(object.getLinkLeft());
            expression.right = Packer.toJSONExpression(object.getLinkRight());
            expression.operator = object.getOperator();
        } else if (object instanceof Property) {
            expression = new ExpressionPack(2);
            expression.fields = Packer.toJSONFieldAccessorArray(object.getLinkFields());
        } else if (object instanceof Value) {
            expression = new ExpressionPack(3);
            expression.value = object.getValue();
        }
        return expression;
    }

    private static toJSONExpressionArray(object: Expression[]): ExpressionPack[] {
        if (object === null) {
            return null;
        }
        let result: ExpressionPack[] = new Array(object.length);
        for (let key in object) {
            result[key] = Packer.toJSONExpression(object[key]);
        }
        return result;
    }

    private static toJSONFieldAccessor(object: FieldAccessor): FieldAccessorPack {
        if (object === null) {
            return null;
        }
        let fieldAccessor: FieldAccessorPack = null;
        if (object instanceof ArrayFieldAccessor) {
            fieldAccessor = new FieldAccessorPack(0);
            fieldAccessor.innerExpression = Packer.toJSONExpression(object.getLinkInnerExpression());
        } else if (object instanceof FunctionFieldAccessor) {
            fieldAccessor = new FieldAccessorPack(1);
            fieldAccessor.parameters = Packer.toJSONExpressionArray(object.getLinkParameters());
        } else if (object instanceof ObjectFieldAccessor) {
            fieldAccessor = new FieldAccessorPack(2);
            fieldAccessor.accessor = object.getAccessor();
        }
        return fieldAccessor;
    }

    private static toJSONFieldAccessorArray(object: FieldAccessor[]): FieldAccessorPack[] {
        if (object === null) {
            return null;
        }
        let result: FieldAccessorPack[] = new Array(object.length);
        for (let key in object) {
            result[key] = Packer.toJSONFieldAccessor(object[key]);
        }
        return result;
    }

    private static toJSONAttribute(object: Attribute): AttributePack {
        if (object === null) {
            return null;
        }
        let attribute: AttributePack = new AttributePack(0);
        attribute.name = object.getName();
        attribute.value = object.getValue();
        return attribute;
    }
    private static toJSONAttributeArray(object: Attribute[]): AttributePack[] {
        if (object === null) {
            return null;
        }
        let result: AttributePack[] = new Array(object.length);
        for (let key in object) {
            result[key] = Packer.toJSONAttribute(object[key]);
        }
        return result;
    }
}
