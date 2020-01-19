import TeapotTemplatePack from '../pack/TeapotTemplatePack';
import RenderablePack from '../pack/RenderablePack';
import Text from '../template/Text';
import Unhandled from '../util/Unhandled';
import TeapotPackType from './TeapotPackType';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Checker from '../util/Checker';
import TeapotTemplate from '../template/TeapotTemplate';
import Renderable from '../template/Renderable';
import Tag from '../template/Tag';
import AttributePack from './AttributePack';
import Attribute from '../template/Attribute';
import Accessor from '../accessor/Accessor';
import AccessorPack from './AccessorPack';
import ForAnnotation from '../annotation/ForAnnotation';
import IfAnnotation from '../annotation/IfAnnotation';
import ExpressionPack from './ExpressionPack';
import Expression from '../accessor/Expression';
import Brackets from '../accessor/Brackets';
import Operator from '../accessor/Operator';
import FieldAccessor from '../accessor/FieldAccessor';
import FieldAccessorPack from './FieldAccessorPack';
import Property from '../accessor/Property';
import Value from '../accessor/Value';
import ArrayFieldAccessor from '../accessor/ArrayFieldAccessor';
import FunctionFieldAccessor from '../accessor/FunctionFieldAccessor';
import ObjectFieldAccessor from '../accessor/ObjectFieldAccessor';
import Unpacker from '../abstract/Unpacker';
import UnpackException from '../exception/UnpackException';
import TextPartitionPack from './TextPartitionPack';
import TextPartition from '../template/TextPartition';
import RawTextPartition from '../template/RawTextPartition';
import ValueTextPartition from '../template/ValueTextPartition';


export default class TeapotUnpacker implements Unpacker<TeapotTemplate, TeapotTemplatePack> {

    public from(pack: TeapotTemplatePack): Unhandled<UnpackException, TeapotTemplate> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, TeapotTemplate>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        if (pack.type !== TeapotPackType.TEMPLATE) {
            return new Unhandled<UnpackException, TeapotTemplate>(new UnpackException(new IllegalArgumentException("Teapot template pack type invalid!")));
        }

        let renderable: Unhandled<UnpackException, Renderable> = TeapotUnpacker.fromRenderablePack(pack.root);
        if (renderable.isThrown()) {
            return new Unhandled<UnpackException, TeapotTemplate>(new UnpackException(renderable.getException()));
        }
        return TeapotTemplate.from(renderable.get());
    }

    private static fromRenderablePack(pack: RenderablePack): Unhandled<UnpackException, Renderable> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, Renderable>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        let renderable: Renderable;
        if (pack.type === TeapotPackType.TEXT) {
            let textPartitions: Unhandled<UnpackException, TextPartition[]> = TeapotUnpacker.fromTextPartitionPackArray(pack.textPartitions);
            if (textPartitions.isThrown()) {
                return new Unhandled<UnpackException, Renderable>(textPartitions.getException());
            }
            let text: Unhandled<IllegalArgumentException, Text> = Text.from(textPartitions.get());
            if (text.isThrown()) {
                return new Unhandled<UnpackException, Renderable>(new UnpackException(text.getException()));
            }
            renderable = text.get();
        } else if (pack.type === TeapotPackType.TAG) {
            let children: Unhandled<UnpackException, Renderable[]> = TeapotUnpacker.fromRenderablePackArray(pack.children);
            if (children.isThrown()) {
                return new Unhandled<UnpackException, Renderable>(children.getException());
            }
            let attributes: Unhandled<UnpackException, Attribute[]> = TeapotUnpacker.fromAttributePackArray(pack.attributes);
            if (attributes.isThrown()) {
                return new Unhandled<UnpackException, Renderable>(attributes.getException());
            }
            let tag: Unhandled<IllegalArgumentException, Tag> = Tag.from(pack.name, children.get(), attributes.get());
            if (tag.isThrown()) {
                return new Unhandled<UnpackException, Renderable>(new UnpackException(tag.getException()));
            }
            renderable = tag.get();
        } else if (TeapotPackType.isAnnotation(pack.type)) {

            let next: Unhandled<UnpackException, Renderable> = TeapotUnpacker.fromRenderablePack(pack.next);
            if (next.isThrown()) {
                next.reset();
                return next;
            }
            if (pack.type === TeapotPackType.FOR) {
                let forAnnotation: Unhandled<IllegalArgumentException, ForAnnotation>;
                if (pack.iterator === true) {
                    let iterable: Unhandled<UnpackException, Accessor> = TeapotUnpacker.fromAccessorPack(pack.iterable);
                    if (iterable.isThrown()) {
                        return new Unhandled<UnpackException, Renderable>(iterable.getException());
                    }
                    forAnnotation = ForAnnotation.fromIterable(iterable.get(), pack.variable, next.get());
                } else {
                    let defintion: Unhandled<UnpackException, Accessor> = TeapotUnpacker.fromAccessorPack(pack.definition);
                    if (defintion.isThrown()) {
                        return new Unhandled<UnpackException, Renderable>(defintion.getException());
                    }
                    let condition: Unhandled<UnpackException, Accessor> = TeapotUnpacker.fromAccessorPack(pack.condition);
                    if (condition.isThrown()) {
                        return new Unhandled<UnpackException, Renderable>(condition.getException());
                    }
                    let increment: Unhandled<UnpackException, Accessor> = TeapotUnpacker.fromAccessorPack(pack.increment);
                    if (increment.isThrown()) {
                        return new Unhandled<UnpackException, Renderable>(increment.getException());
                    }
                    forAnnotation = ForAnnotation.from(
                        condition.get(),
                        defintion.get(),
                        increment.get(),
                        pack.definitionVariable,
                        pack.incrementVariable,
                        next.get()
                    );
                }
                if (forAnnotation.isThrown()) {
                    return new Unhandled<UnpackException, Renderable>(new UnpackException(forAnnotation.getException()));
                }
                renderable = forAnnotation.get();
            } else if (pack.type === TeapotPackType.IF) {
                let accessor: Unhandled<UnpackException, Accessor> = TeapotUnpacker.fromAccessorPack(pack.accessor);
                if (accessor.isThrown()) {
                    return new Unhandled<UnpackException, Renderable>(accessor.getException());
                }
                let ifAnnotation: Unhandled<IllegalArgumentException, IfAnnotation> = IfAnnotation.from(accessor.get(), next.get());
                if (ifAnnotation.isThrown()) {
                    return new Unhandled<UnpackException, Renderable>(new UnpackException(ifAnnotation.getException()));
                }
                renderable = ifAnnotation.get();
            } else {
                return new Unhandled<UnpackException, Renderable>(new UnpackException("Annotation type does not exist!"));
            }
        } else {
            return new Unhandled<UnpackException, Renderable>(new UnpackException("Renderable type does not exist!"));
        }
        return new Unhandled<UnpackException, Renderable>(renderable);
    }

    private static fromRenderablePackArray(packs: RenderablePack[]): Unhandled<UnpackException, Renderable[]> {
        if (!Checker.checkNotNull(packs)) {
            return new Unhandled<UnpackException, Renderable[]>(new UnpackException(new IllegalArgumentException("Packs can not be null!")));
        }
        let renderables: Renderable[] = [];
        for (let pack of packs) {
            let renderable: Unhandled<UnpackException, Renderable> = TeapotUnpacker.fromRenderablePack(pack);
            if (renderable.isThrown()) {
                return new Unhandled<UnpackException, Renderable[]>(renderable.getException());
            }
            renderables.push(renderable.get());
        }
        return new Unhandled<UnpackException, Renderable[]>(renderables);
    }

    private static fromTextPartitionPack(pack: TextPartitionPack): Unhandled<UnpackException, TextPartition> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, TextPartition>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        let textPartition: TextPartition = null;
        if (pack.type === TeapotPackType.RAW_TEXT) {
            let rawTextPartition: Unhandled<IllegalArgumentException, RawTextPartition> = RawTextPartition.from(pack.text);
            if (rawTextPartition.isThrown()) {
                return new Unhandled<UnpackException, TextPartition>(new UnpackException(rawTextPartition.getException()));
            }
            textPartition = rawTextPartition.get();
        } else if (pack.type === TeapotPackType.VALUE_TEXT) {
            let valueAccessor: Unhandled<UnpackException, Accessor> = TeapotUnpacker.fromAccessorPack(pack.valueAccessor);
            if (valueAccessor.isThrown()) {
                return new Unhandled<UnpackException, TextPartition>(valueAccessor.getException());
            }
            let valueTextPartition: Unhandled<IllegalArgumentException, ValueTextPartition> = ValueTextPartition.from(valueAccessor.get());
            if (valueTextPartition.isThrown()) {
                return new Unhandled<UnpackException, TextPartition>(new UnpackException(valueTextPartition.getException()));
            }
            textPartition = valueTextPartition.get();
        } else {
            return new Unhandled<UnpackException, TextPartition>(new UnpackException("TextPartition pack type invalid!"));
        }
        return new Unhandled<UnpackException, TextPartition>(textPartition);
    }

    private static fromTextPartitionPackArray(packs: TextPartitionPack[]): Unhandled<UnpackException, TextPartition[]> {
        if (!Checker.checkNotNull(packs)) {
            return new Unhandled<UnpackException, TextPartition[]>(new UnpackException(new IllegalArgumentException("Packs can not be null!")));
        }
        let textPartitions: TextPartition[] = [];
        for (let pack of packs) {
            let textPartition: Unhandled<UnpackException, TextPartition> = TeapotUnpacker.fromTextPartitionPack(pack);
            if (textPartition.isThrown()) {
                return new Unhandled<UnpackException, TextPartition[]>(textPartition.getException());
            }
            textPartitions.push(textPartition.get());
        }
        return new Unhandled<UnpackException, TextPartition[]>(textPartitions);
    }


    private static fromAttributePack(pack: AttributePack): Unhandled<UnpackException, Attribute> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, Attribute>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        if (pack.type !== TeapotPackType.ATTRIBUTE) {
            return new Unhandled<UnpackException, Attribute>(new UnpackException(new IllegalArgumentException("Attribute pack type invalid!")));
        }
        let textPartitions: Unhandled<UnpackException, TextPartition[]> = TeapotUnpacker.fromTextPartitionPackArray(pack.value);
        if (textPartitions.isThrown()) {
            return new Unhandled<UnpackException, Attribute>(textPartitions.getException());
        }
        let attribute: Unhandled<IllegalArgumentException, Attribute> = Attribute.from(pack.name, textPartitions.get());
        if (attribute.isThrown()) {
            return new Unhandled<UnpackException, Attribute>(new UnpackException(attribute.getException()));
        }
        return new Unhandled<UnpackException, Attribute>(attribute.get());
    }

    private static fromAttributePackArray(packs: AttributePack[]): Unhandled<UnpackException, Attribute[]> {
        if (!Checker.checkNotNull(packs)) {
            return new Unhandled<UnpackException, Attribute[]>(new UnpackException(new IllegalArgumentException("Packs can not be null!")));
        }
        let attributes: Attribute[] = [];
        for (let pack of packs) {
            let attribute: Unhandled<UnpackException, Attribute> = TeapotUnpacker.fromAttributePack(pack);
            if (attribute.isThrown()) {
                return new Unhandled<UnpackException, Attribute[]>(attribute.getException());
            }
            attributes.push(attribute.get());
        }
        return new Unhandled<UnpackException, Attribute[]>(attributes);
    }

    private static fromAccessorPack(pack: AccessorPack): Unhandled<UnpackException, Accessor> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, Accessor>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        if (pack.type !== TeapotPackType.ACCESSOR) {
            return new Unhandled<UnpackException, Accessor>(new UnpackException(new IllegalArgumentException("Acccessor pack type invalid!")));
        }
        let expression: Unhandled<UnpackException, Expression> = TeapotUnpacker.fromExpressionPack(pack.expression);
        if (expression.isThrown()) {
            return new Unhandled<UnpackException, Accessor>(expression.getException());
        }
        let accessor: Unhandled<IllegalArgumentException, Accessor> = Accessor.from(expression.get());
        if (accessor.isThrown()) {
            return new Unhandled<UnpackException, Accessor>(new UnpackException(accessor.getException()));
        }
        return new Unhandled<UnpackException, Accessor>(accessor.get());
    }

    private static fromExpressionPack(pack: ExpressionPack): Unhandled<UnpackException, Expression> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, Expression>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        let expression: Expression;
        if (pack.type === TeapotPackType.BRACKETS) {
            let innerExpression: Unhandled<UnpackException, Expression> = TeapotUnpacker.fromExpressionPack(pack.innerExpression);
            if (innerExpression.isThrown()) {
                innerExpression.reset();
                return innerExpression;
            }
            let brackets: Unhandled<IllegalArgumentException, Brackets> = Brackets.from(innerExpression.get());
            if (brackets.isThrown()) {
                return new Unhandled<UnpackException, Expression>(new UnpackException(brackets.getException()));
            }
            expression = brackets.get();
        } else if (pack.type === TeapotPackType.OPERATOR) {
            let left: Unhandled<UnpackException, Expression> = TeapotUnpacker.fromExpressionPack(pack.left);
            if (left.isThrown()) {
                left.reset();
                return left;
            }
            let right: Unhandled<UnpackException, Expression> = TeapotUnpacker.fromExpressionPack(pack.right);
            if (right.isThrown()) {
                right.reset();
                return right;
            }
            let operator: Unhandled<IllegalArgumentException, Operator> = Operator.from(pack.operator, left.get(), right.get());
            if (operator.isThrown()) {
                return new Unhandled<UnpackException, Expression>(new UnpackException(operator.getException()));
            }
            expression = operator.get();
        } else if (pack.type === TeapotPackType.PROPERTY) {
            let fieldAccessors: Unhandled<UnpackException, FieldAccessor[]> = TeapotUnpacker.fromFieldAccessorPackArray(pack.fields);
            if (fieldAccessors.isThrown()) {
                return new Unhandled<UnpackException, Expression>(fieldAccessors.getException());
            }
            let property: Unhandled<IllegalArgumentException, Property> = Property.from(fieldAccessors.get());
            if (property.isThrown()) {
                return new Unhandled<UnpackException, Expression>(new UnpackException(property.getException()));
            }
            expression = property.get();
        } else if (pack.type === TeapotPackType.VALUE) {
            let value: Unhandled<IllegalArgumentException, Value> = Value.from(pack.value);
            if (value.isThrown()) {
                return new Unhandled<UnpackException, Expression>(new UnpackException(value.getException()));
            }
            expression = value.get();
        } else {
            return new Unhandled<UnpackException, Expression>(new UnpackException("Expression type does not exist!"));
        }
        return new Unhandled<UnpackException, Expression>(expression);
    }

    private static fromExpressionPackArray(packs: ExpressionPack[]): Unhandled<UnpackException, Expression[]> {
        if (!Checker.checkNotNull(packs)) {
            return new Unhandled<UnpackException, Expression[]>(new UnpackException(new IllegalArgumentException("Packs can not be null!")));
        }
        let expressions: Expression[] = [];
        for (let pack of packs) {
            let expression: Unhandled<UnpackException, Expression> = TeapotUnpacker.fromExpressionPack(pack);
            if (expression.isThrown()) {
                return new Unhandled<UnpackException, Expression[]>(expression.getException());
            }
            expressions.push(expression.get());
        }
        return new Unhandled<UnpackException, Expression[]>(expressions);
    }

    private static fromFieldAccessorPack(pack: FieldAccessorPack): Unhandled<UnpackException, FieldAccessor> {
        if (!Checker.checkNotNull(pack)) {
            return new Unhandled<UnpackException, FieldAccessor>(new UnpackException(new IllegalArgumentException("Pack can not be null!")));
        }
        let fieldAccessor: FieldAccessor;
        if (pack.type === TeapotPackType.ARRAY_FIELD_ACCESSOR) {
            let innerExpression: Unhandled<UnpackException, Expression> = TeapotUnpacker.fromExpressionPack(pack.innerExpression);
            if (innerExpression.isThrown()) {
                return new Unhandled<UnpackException, FieldAccessor>(innerExpression.getException());
            }
            let arrayFieldAccessor: Unhandled<IllegalArgumentException, ArrayFieldAccessor> = ArrayFieldAccessor.from(innerExpression.get());
            if (arrayFieldAccessor.isThrown()) {
                return new Unhandled<UnpackException, FieldAccessor>(new UnpackException(arrayFieldAccessor.getException()));
            }
            fieldAccessor = arrayFieldAccessor.get();
        } else if (pack.type === TeapotPackType.FUNCTION_FIELD_ACCESSOR) {
            let parameters: Unhandled<UnpackException, Expression[]> = TeapotUnpacker.fromExpressionPackArray(pack.parameters);
            if (parameters.isThrown()) {
                return new Unhandled<UnpackException, FieldAccessor>(parameters.getException());
            }
            let functionFieldAccessor: Unhandled<IllegalArgumentException, FunctionFieldAccessor> = FunctionFieldAccessor.from(parameters.get());
            if (functionFieldAccessor.isThrown()) {
                return new Unhandled<UnpackException, FieldAccessor>(new UnpackException(functionFieldAccessor.getException()));
            }
            fieldAccessor = functionFieldAccessor.get();
        } else if (pack.type === TeapotPackType.OBJECT_FIELD_ACCESSOR) {
            let objectFieldAccessor: Unhandled<IllegalArgumentException, ObjectFieldAccessor> = ObjectFieldAccessor.from(pack.accessor);
            if (objectFieldAccessor.isThrown()) {
                return new Unhandled<UnpackException, FieldAccessor>(new UnpackException(objectFieldAccessor.getException()));
            }
            fieldAccessor = objectFieldAccessor.get();
        } else {
            return new Unhandled<UnpackException, FieldAccessor>(new UnpackException("FieldAccessor type does not exist!"));
        }
        return new Unhandled<UnpackException, FieldAccessor>(fieldAccessor);
    }

    private static fromFieldAccessorPackArray(packs: FieldAccessorPack[]): Unhandled<UnpackException, FieldAccessor[]> {
        if (!Checker.checkNotNull(packs)) {
            return new Unhandled<UnpackException, FieldAccessor[]>(new UnpackException(new IllegalArgumentException("Packs can not be null!")));
        }
        let fieldAccessors: FieldAccessor[] = [];
        for (let pack of packs) {
            let fieldAccessor: Unhandled<UnpackException, FieldAccessor> = TeapotUnpacker.fromFieldAccessorPack(pack);
            if (fieldAccessor.isThrown()) {
                return new Unhandled<UnpackException, FieldAccessor[]>(fieldAccessor.getException());
            }
            fieldAccessors.push(fieldAccessor.get());
        }
        return new Unhandled<UnpackException, FieldAccessor[]>(fieldAccessors);
    }
}
