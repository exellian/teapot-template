import TeapotTemplatePack from '../pack/TeapotTemplatePack';
import { Teapot } from '../../../../scheme/teapot_generated';
import { flatbuffers } from 'flatbuffers';
import ExpressionPack from '../pack/ExpressionPack';
import RenderablePack from '../pack/RenderablePack';
import TextPartitionPack from '../pack/TextPartitionPack';
import AccessorPack from '../pack/AccessorPack';
import AttributePack from '../pack/AttributePack';
import FieldAccessorPack from '../pack/FieldAccessorPack';
import Checker from '../util/Checker';
import FlatBufferUnpacker from '../abstract/FlatBufferUnpacker';

export default class TeapotFlatBufferUnpacker implements FlatBufferUnpacker<TeapotTemplatePack> {

    public parse(data: Uint8Array): TeapotTemplatePack {
        let buffer: flatbuffers.ByteBuffer = new flatbuffers.ByteBuffer(data);
        let template: Teapot.TeapotTemplate = Teapot.TeapotTemplate.getRootAsTeapotTemplate(buffer);
        return TeapotFlatBufferUnpacker.fromTeapotTemplate(template);
    }

    private static fromTeapotTemplate(buf: Teapot.TeapotTemplate): TeapotTemplatePack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: TeapotTemplatePack = new TeapotTemplatePack(buf.type());
        pack.root = TeapotFlatBufferUnpacker.fromRenderable(buf.root());
        return pack;
    }

    private static fromTextPartition(buf: Teapot.TextPartition): TextPartitionPack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: TextPartitionPack = new TextPartitionPack(buf.type());
        pack.text = buf.text();
        pack.valueAccessor = TeapotFlatBufferUnpacker.fromAccessor(buf.valueAccessor());
        return pack;
    }

    private static fromTextPartitionArray(length: number, get: (index: number) => Teapot.TextPartition): TextPartitionPack[] {
        let packs: TextPartitionPack[] = [];
        for (let i = 0;i < length;i++) {
            packs.push(TeapotFlatBufferUnpacker.fromTextPartition(get(i)));
        }
        return packs;
    }

    private static fromAccessor(buf: Teapot.Accessor): AccessorPack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: AccessorPack = new AccessorPack(buf.type());
        pack.expression = TeapotFlatBufferUnpacker.fromExpression(buf.expression());
        return pack;
    }

    private static fromRenderable(buf: Teapot.Renderable): RenderablePack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: RenderablePack = new RenderablePack(buf.type());

        pack.textPartitions = TeapotFlatBufferUnpacker.fromTextPartitionArray(buf.textPartitionsLength(), buf.textPartitions);
        pack.name = buf.name();
        pack.children = TeapotFlatBufferUnpacker.fromRenderableArray(buf.childrenLength(), buf.children);
        pack.attributes = TeapotFlatBufferUnpacker.fromAttributeArray(buf.attributesLength(), buf.attributes);
        pack.next = TeapotFlatBufferUnpacker.fromRenderable(buf.next());
        pack.condition = TeapotFlatBufferUnpacker.fromAccessor(buf.condition());
        pack.definition = TeapotFlatBufferUnpacker.fromAccessor(buf.definition());
        pack.increment = TeapotFlatBufferUnpacker.fromAccessor(buf.increment());
        pack.definitionVariable = buf.definitionVariable();
        pack.incrementVariable = buf.incrementVariable();
        pack.iterator = buf.iterator();
        pack.iterable = TeapotFlatBufferUnpacker.fromAccessor(buf.iterable());
        pack.variable = buf.variable();
        pack.accessor = TeapotFlatBufferUnpacker.fromAccessor(buf.accessor());

        return pack;
    }

    private static fromRenderableArray(length: number, get: (index: number) => Teapot.Renderable): RenderablePack[] {
        let packs: RenderablePack[] = [];
        for (let i = 0;i < length;i++) {
            packs.push(TeapotFlatBufferUnpacker.fromRenderable(get(i)));
        }
        return packs;
    }

    private static fromExpression(buf: Teapot.Expression): ExpressionPack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: ExpressionPack = new ExpressionPack(buf.type());

        pack.innerExpression = TeapotFlatBufferUnpacker.fromExpression(buf.innerExpression());
        pack.operator = buf.operator();
    	pack.left = TeapotFlatBufferUnpacker.fromExpression(buf.left());
    	pack.right = TeapotFlatBufferUnpacker.fromExpression(buf.right());
        pack.fields = TeapotFlatBufferUnpacker.fromFieldAccessorArray(buf.fieldsLength(), buf.fields);

        if (buf.valueType() === Teapot.Any.NONE) {
            pack.value = null;
        } else if (buf.valueType() === Teapot.Any.Float) {
            pack.value = buf.value(new Teapot.Float()).value();
        } else if (buf.valueType() === Teapot.Any.Int) {
            pack.value = buf.value(new Teapot.Int()).value();
        } else if (buf.valueType() === Teapot.Any.Bool) {
            pack.value = buf.value(new Teapot.Bool()).value();
        } else if (buf.valueType() === Teapot.Any.String) {
            pack.value = buf.value(new Teapot.String()).value();
        }

        return pack;
    }

    private static fromExpressionArray(length: number, get: (index: number) => Teapot.Expression): ExpressionPack[] {
        let packs: ExpressionPack[] = [];
        for (let i = 0;i < length;i++) {
            packs.push(TeapotFlatBufferUnpacker.fromExpression(get(i)));
        }
        return packs;
    }

    private static fromAttribute(buf: Teapot.Attribute): AttributePack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: AttributePack = new AttributePack(buf.type());
        pack.name = buf.name();
        pack.value = TeapotFlatBufferUnpacker.fromTextPartitionArray(buf.valueLength(), buf.value);
        return pack;
    }

    private static fromAttributeArray(length: number, get: (index: number) => Teapot.Attribute): AttributePack[] {
        let packs: AttributePack[] = [];
        for (let i = 0;i < length;i++) {
            packs.push(TeapotFlatBufferUnpacker.fromAttribute(get(i)));
        }
        return packs;
    }

    private static fromFieldAccessor(buf: Teapot.FieldAccessor): FieldAccessorPack {
        if (!Checker.checkNotNull(buf)) {
            return null;
        }
        let pack: FieldAccessorPack = new FieldAccessorPack(buf.type());

        pack. innerExpression = TeapotFlatBufferUnpacker.fromExpression(buf.innerExpression());
        pack. parameters = TeapotFlatBufferUnpacker.fromExpressionArray(buf.parametersLength(), buf.parameters);
        pack. accessor = buf.accessor();

        return pack;
    }

    private static fromFieldAccessorArray(length: number, get: (index: number) => Teapot.FieldAccessor): FieldAccessorPack[] {
        let packs: FieldAccessorPack[] = [];
        for (let i = 0;i < length;i++) {
            packs.push(TeapotFlatBufferUnpacker.fromFieldAccessor(get(i)));
        }
        return packs;
    }


}
