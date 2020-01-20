import { TeapotTemplateEngine } from "./org/teapot/TeapotTemplateEngine";
import Unhandled from './org/teapot/util/Unhandled';
import TemplateParseException from './org/teapot/exception/TemplateParseException';
import TeapotTemplate from './org/teapot/template/TeapotTemplate';
import ObjectField from './org/teapot/view/ObjectField';
import PrimitiveField from './org/teapot/view/PrimitiveField';
import View from './org/teapot/view/View';
import TeapotTemplatePack from './org/teapot/pack/TeapotTemplatePack';
import UnpackException from './org/teapot/exception/UnpackException';



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

    console.log(JSON.stringify(pack));

    let unpackedTemplate: Unhandled<UnpackException, TeapotTemplate> = engine.fromPack(pack);

    if (unpackedTemplate.isThrown()) {
        throw unpackedTemplate.getException();
    }

    let pack1: TeapotTemplatePack = unpackedTemplate.get().pack();

    console.log("");

    console.log(JSON.stringify(pack1));
}

main();
