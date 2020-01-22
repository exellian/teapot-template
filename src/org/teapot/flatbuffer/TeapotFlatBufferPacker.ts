import { flatbuffers } from 'flatbuffers';
import { Teapot } from '../../../../scheme/teapot_generated';
import TeapotTemplatePack from '../pack/TeapotTemplatePack';
import RenderablePack from '../pack/RenderablePack';
import TextPartitionPack from '../pack/TextPartitionPack';
import AccessorPack from '../pack/AccessorPack';
import Checker from '../util/Checker';
import AttributePack from '../pack/AttributePack';
import ExpressionPack from '../pack/ExpressionPack';
import FieldAccessorPack from '../pack/FieldAccessorPack';

export default class TeapotFlatBufferPacker {

    public static pack(pack: TeapotTemplatePack): Uint8Array {
        if (!Checker.checkNotNull(pack)) {
            return null;
        }
        let builder: flatbuffers.Builder = new flatbuffers.Builder(1024);

        let root: number = (!Checker.checkNotNull(pack.root)) ? null : TeapotFlatBufferPacker.packRenderable(builder, pack.root);

        Teapot.TeapotTemplate.startTeapotTemplate(builder);
        Teapot.TeapotTemplate.addType(builder, pack.type);

        if (Checker.checkNotNull(root)) { Teapot.TeapotTemplate.addRoot(builder, root); }

        builder.finish(Teapot.TeapotTemplate.endTeapotTemplate(builder));
        return builder.asUint8Array();
    }

    private static packRenderable(builder: flatbuffers.Builder, pack: RenderablePack): number {
        if (!Checker.checkNotNull(pack)) {
            return null;
        }

        let next: number = (!Checker.checkNotNull(pack.next)) ? null : TeapotFlatBufferPacker.packRenderable(builder, pack.next);
        let textPartitions: number = (!Checker.checkNotNull(pack.textPartitions)) ? null : Teapot.Renderable.createTextPartitionsVector(builder, TeapotFlatBufferPacker.packTextPartitionArray(builder, pack.textPartitions));
        let name: number = (!Checker.checkNotNull(pack.name)) ? null : builder.createString(pack.name);
        let children: number = (!Checker.checkNotNull(pack.children)) ? null : Teapot.Renderable.createChildrenVector(builder, TeapotFlatBufferPacker.packRenderableArray(builder, pack.children));
        let attributes: number = (!Checker.checkNotNull(pack.attributes)) ? null : Teapot.Renderable.createAttributesVector(builder, TeapotFlatBufferPacker.packAttributeArray(builder, pack.attributes));
        let condition: number = (!Checker.checkNotNull(pack.condition)) ? null : TeapotFlatBufferPacker.packAccessor(builder, pack.condition);
        let definition: number = (!Checker.checkNotNull(pack.definition)) ? null : TeapotFlatBufferPacker.packAccessor(builder, pack.definition);
        let increment: number = (!Checker.checkNotNull(pack.increment)) ? null : TeapotFlatBufferPacker.packAccessor(builder, pack.increment);
        let definitionVariable: number = (!Checker.checkNotNull(pack.definitionVariable)) ? null : builder.createString(pack.definitionVariable);
        let incrementVariable: number = (!Checker.checkNotNull(pack.incrementVariable)) ? null : builder.createString(pack.incrementVariable);
        let iterable: number = (!Checker.checkNotNull(pack.iterable)) ? null : TeapotFlatBufferPacker.packAccessor(builder, pack.iterable);
        let variable: number = (!Checker.checkNotNull(pack.variable)) ? null : builder.createString(pack.variable);
        let accessor: number = (!Checker.checkNotNull(pack.accessor)) ? null : TeapotFlatBufferPacker.packAccessor(builder, pack.accessor);

        Teapot.Renderable.startRenderable(builder);
        Teapot.Renderable.addType(builder, pack.type);

        if (Checker.checkNotNull(pack.next)) { Teapot.Renderable.addNext(builder, next); }
        if (Checker.checkNotNull(pack.textPartitions)) { Teapot.Renderable.addTextPartitions(builder, textPartitions); }
        if (Checker.checkNotNull(pack.name)) { Teapot.Renderable.addName(builder, name); }
        if (Checker.checkNotNull(pack.children)) { Teapot.Renderable.addChildren(builder, children); }
        if (Checker.checkNotNull(pack.attributes)) { Teapot.Renderable.addAttributes(builder, attributes); }
        if (Checker.checkNotNull(pack.condition)) { Teapot.Renderable.addCondition(builder, condition); }
        if (Checker.checkNotNull(pack.definition)) { Teapot.Renderable.addDefinition(builder, definition); }
        if (Checker.checkNotNull(pack.increment)) { Teapot.Renderable.addIncrement(builder, increment); }
        if (Checker.checkNotNull(pack.definitionVariable)) { Teapot.Renderable.addDefinitionVariable(builder, definitionVariable); }
        if (Checker.checkNotNull(pack.incrementVariable)) { Teapot.Renderable.addIncrementVariable(builder, incrementVariable); }
        if (Checker.checkNotNull(pack.iterator)) { Teapot.Renderable.addIterator(builder, pack.iterator); }
        if (Checker.checkNotNull(pack.iterable)) { Teapot.Renderable.addIterable(builder, iterable); }
        if (Checker.checkNotNull(pack.variable)) { Teapot.Renderable.addVariable(builder, variable); }
        if (Checker.checkNotNull(pack.accessor)) { Teapot.Renderable.addAccessor(builder, accessor); }

        return Teapot.Renderable.endRenderable(builder);
    }

    private static packRenderableArray(builder: flatbuffers.Builder, packs: RenderablePack[]): number[] {
        if (!Checker.checkNotNull(packs)) {
            return null;
        }

        let data: number[] = [];
        for (let pack of packs) {
            data.push(TeapotFlatBufferPacker.packRenderable(builder, pack));
        }
        return data;
    }

    private static packTextPartition(builder: flatbuffers.Builder, pack: TextPartitionPack): number {
        if (!Checker.checkNotNull(pack)) {
            return null;
        }

        let text: number = (!Checker.checkNotNull(pack.text)) ? null : builder.createString(pack.text);
        let valueAccessor: number = (!Checker.checkNotNull(pack.valueAccessor)) ? null : TeapotFlatBufferPacker.packAccessor(builder, pack.valueAccessor);

        Teapot.TextPartition.startTextPartition(builder);
        Teapot.TextPartition.addType(builder, pack.type);

        if (Checker.checkNotNull(pack.text)) { Teapot.TextPartition.addText(builder, text); }
        if (Checker.checkNotNull(pack.valueAccessor)) { Teapot.TextPartition.addValueAccessor(builder, valueAccessor); }

        return Teapot.TextPartition.endTextPartition(builder);
    }

    private static packTextPartitionArray(builder: flatbuffers.Builder, packs: TextPartitionPack[]): number[] {
        if (!Checker.checkNotNull(packs)) {
            return null;
        }
        let data: number[] = [];
        for (let pack of packs) {
            data.push(TeapotFlatBufferPacker.packTextPartition(builder, pack));
        }
        return data;
    }

    private static packAccessor(builder: flatbuffers.Builder, pack: AccessorPack): number {
        if (!Checker.checkNotNull(pack)) {
            return null;
        }

        let expression: number = (!Checker.checkNotNull(pack.expression)) ? null : TeapotFlatBufferPacker.packExpression(builder, pack.expression);

        Teapot.Accessor.startAccessor(builder);
        Teapot.Accessor.addType(builder, pack.type);

        if (Checker.checkNotNull(pack.expression)) { Teapot.Accessor.addExpression(builder, expression); }

        return Teapot.Accessor.endAccessor(builder);
    }

    private static packExpression(builder: flatbuffers.Builder, pack: ExpressionPack): number {

        if (!Checker.checkNotNull(pack)) {
            return null;
        }
        let innerExpression: number = (!Checker.checkNotNull(pack.innerExpression)) ? null : TeapotFlatBufferPacker.packExpression(builder, pack.innerExpression);
        let operator: number = (!Checker.checkNotNull(pack.operator)) ? null : builder.createString(pack.operator);
        let left: number = (!Checker.checkNotNull(pack.left)) ? null : TeapotFlatBufferPacker.packExpression(builder, pack.left);
        let right: number = (!Checker.checkNotNull(pack.right)) ? null : TeapotFlatBufferPacker.packExpression(builder, pack.right);
        let fields: number = (!Checker.checkNotNull(pack.fields)) ? null : Teapot.Expression.createFieldsVector(builder, TeapotFlatBufferPacker.packFieldAccessorArray(builder, pack.fields));
        let value: number = null;
        if (Checker.checkNotNull(pack.value)) {
            if (typeof pack.value === "string") {
                value = TeapotFlatBufferPacker.packString(builder, <string>pack.value);
            } else if (typeof pack.value === "number") {
                if (Number.isInteger(pack.value)) {
                    value = Teapot.Int.createInt(builder, <number>pack.value);
                } else {
                    Teapot.Float.createFloat(builder, <number>pack.value);
                }
            } else if (typeof pack.value === "boolean") {
                value = Teapot.Bool.createBool(builder, <boolean>pack.value);
            }
        }

        Teapot.Expression.startExpression(builder);
        Teapot.Expression.addType(builder, pack.type);

        if (Checker.checkNotNull(pack.innerExpression)) { Teapot.Expression.addInnerExpression(builder, innerExpression); }
        if (Checker.checkNotNull(pack.operator)) { Teapot.Expression.addOperator(builder, operator); }
        if (Checker.checkNotNull(pack.left)) { Teapot.Expression.addLeft(builder, left); }
        if (Checker.checkNotNull(pack.right)) { Teapot.Expression.addRight(builder, right); }
        if (Checker.checkNotNull(pack.fields)) { Teapot.Expression.addFields(builder, fields); }
        if (Checker.checkNotNull(pack.value)) {
            if (typeof pack.value === "string") {
                Teapot.Expression.addValue(builder, value);
            } else if (typeof pack.value === "number") {
                if (Number.isInteger(pack.value)) {
                    Teapot.Expression.addValue(builder, value);
                } else {
                    Teapot.Expression.addValue(builder, value);
                }
            } else if (typeof pack.value === "boolean") {
                Teapot.Expression.addValue(builder, value);
            }
        }
        return Teapot.Expression.endExpression(builder);
    }
    private static packExpressionArray(builder: flatbuffers.Builder, packs: ExpressionPack[]): number[] {
        if (!Checker.checkNotNull(packs)) {
            return null;
        }

        let data: number[] = [];
        for (let pack of packs) {
            data.push(TeapotFlatBufferPacker.packExpression(builder, pack));
        }
        return data;
    }

    private static packFieldAccessor(builder: flatbuffers.Builder, pack: FieldAccessorPack): number {
        if (!Checker.checkNotNull(pack)) {
            return null;
        }
        let innerExpression: number = (!Checker.checkNotNull(pack.innerExpression)) ? null : TeapotFlatBufferPacker.packExpression(builder, pack.innerExpression);
        let parameters: number = (!Checker.checkNotNull(pack.parameters)) ? null : Teapot.FieldAccessor.createParametersVector(builder, TeapotFlatBufferPacker.packExpressionArray(builder, pack.parameters));
        let accessor: number = (!Checker.checkNotNull(pack.accessor)) ? null : builder.createString(pack.accessor);

        Teapot.FieldAccessor.startFieldAccessor(builder);
        Teapot.FieldAccessor.addType(builder, pack.type);

        if (Checker.checkNotNull(pack.innerExpression)) { Teapot.FieldAccessor.addInnerExpression(builder, innerExpression); }
        if (Checker.checkNotNull(pack.parameters)) { Teapot.FieldAccessor.addParameters(builder, parameters); }
        if (Checker.checkNotNull(pack.accessor)) { Teapot.FieldAccessor.addAccessor(builder, accessor); }

        return Teapot.FieldAccessor.endFieldAccessor(builder);
    }
    private static packFieldAccessorArray(builder: flatbuffers.Builder, packs: FieldAccessorPack[]): number[] {
        if (!Checker.checkNotNull(packs)) {
            return null;
        }
        let data: number[] = [];
        for (let pack of packs) {
            data.push(TeapotFlatBufferPacker.packFieldAccessor(builder, pack));
        }
        return data;
    }
    private static packAttribute(builder: flatbuffers.Builder, pack: AttributePack): number {
        if (!Checker.checkNotNull(pack)) {
            return null;
        }
        let name: number = (!Checker.checkNotNull(pack.name)) ? null : builder.createString(pack.name);
        let value: number = (!Checker.checkNotNull(pack.value)) ? null : Teapot.Attribute.createValueVector(builder, TeapotFlatBufferPacker.packTextPartitionArray(builder, pack.value));

        Teapot.Attribute.startAttribute(builder);
        Teapot.Attribute.addType(builder, pack.type);

        if (Checker.checkNotNull(pack.name)) { Teapot.Attribute.addName(builder, name); }
        if (Checker.checkNotNull(pack.value)) { Teapot.Attribute.addValue(builder, value); }

        return Teapot.Attribute.endAttribute(builder);
    }
    private static packAttributeArray(builder: flatbuffers.Builder, packs: AttributePack[]): number[] {
        if (!Checker.checkNotNull(packs)) {
            return null;
        }
        let data: number[] = [];
        for (let pack of packs) {
            data.push(TeapotFlatBufferPacker.packAttribute(builder, pack));
        }
        return data;
    }

    private static packString(builder: flatbuffers.Builder, value: string): number {
        Teapot.String.startString(builder);
        Teapot.String.addValue(builder, builder.createString(value));
        return Teapot.String.endString(builder);
    }

}
