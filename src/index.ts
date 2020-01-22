import TeapotTemplateEngine from "./org/teapot/TeapotTemplateEngine";
import Unhandled from './org/teapot/util/Unhandled';
import TemplateParseException from './org/teapot/exception/TemplateParseException';
import TeapotTemplate from './org/teapot/template/TeapotTemplate';
import ObjectField from './org/teapot/view/ObjectField';
import PrimitiveField from './org/teapot/view/PrimitiveField';
import View from './org/teapot/view/View';
import TeapotTemplatePack from './org/teapot/pack/TeapotTemplatePack';
import UnpackException from './org/teapot/exception/UnpackException';
import TeapotFlatBufferPacker from './org/teapot/flatbuffer/TeapotFlatBufferPacker';
import { flatbuffers } from 'flatbuffers';
import { Teapot } from '../scheme/teapot_generated';
import TeapotFlatBufferUnpacker from './org/teapot/flatbuffer/TeapotFlatBufferUnpacker';


let main = function() {

    let html = "<div class='lel'>" +
                    "@for(int i = 0;i < 10;i++)" +
                    "<div>@(test) @(i)</div>" +
               "</div>";

    let engine: TeapotTemplateEngine = new TeapotTemplateEngine;

    let templateParseResult: Unhandled<TemplateParseException, TeapotTemplate> = engine.parse(html);

    if (templateParseResult.isThrown()) {
        throw templateParseResult.getException();
    }

    let template: TeapotTemplate = templateParseResult.get();
    let pack: TeapotTemplatePack = template.pack();
    let raw = TeapotFlatBufferPacker.pack(pack);
    let json = JSON.stringify(pack);
    console.time("serialization0");

    for (let i = 0;i < 100;i++) {
        TeapotFlatBufferUnpacker.parse(raw);
    }

    console.timeEnd("serialization0");

    console.time("serialization");

    for (let i = 0;i < 100;i++) {
        JSON.parse(json);
    }

    console.timeEnd("serialization");

}


main();
