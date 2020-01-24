import TeapotTemplateEngine from "./org/teapot/TeapotTemplateEngine";
import Unhandled from './org/teapot/util/Unhandled';
import TemplateParseException from './org/teapot/exception/TemplateParseException';
import TeapotTemplate from './org/teapot/template/TeapotTemplate';
import TeapotTemplatePack from './org/teapot/pack/TeapotTemplatePack';
import { TeapotTemplateMessage, ITeapotTemplateMessage } from '../proto/teapot';
import ObjectField from './org/teapot/view/ObjectField';
import PrimitiveField from './org/teapot/view/PrimitiveField';
import View from './org/teapot/view/View';
let main = function() {


    let html = "<div>" +
                    "@for(int i = 0;i < 10;i++) <div>@(test) @(2 + 3 * i + 5)</div>" +
               "</div>";






    let engine: TeapotTemplateEngine = new TeapotTemplateEngine;

    let templateParseResult: Unhandled<TemplateParseException, TeapotTemplate> = engine.parse(html);

    if (templateParseResult.isThrown()) {
        throw templateParseResult.getException();
    }

    let template: TeapotTemplate = templateParseResult.get();



    let pack: TeapotTemplatePack = template.pack();

    let message = TeapotTemplateMessage.create(<ITeapotTemplateMessage>pack);
    let buffer = TeapotTemplateMessage.encode(message).finish();

    console.time("All");

    //console.time("deserialization Protobuf");

    let t = engine.fromPack(<TeapotTemplatePack><unknown>TeapotTemplateMessage.decode(buffer));

    //console.timeEnd("deserialization Protobuf");
      //console.log(JSON.stringify(obj));

    //console.log(Uint8ToString(buffer));

    let field: ObjectField = new ObjectField();

    field.setLinkField("test", new PrimitiveField("Hallo World!"))

    let view = new View(field);

    //console.time("rendering");

    let element = template.render(view);
    if (element.isThrown()) {
        throw element.getException();
    }
    document.body.appendChild(element.get());

    //console.timeEnd("rendering");

    console.timeEnd("All");

}
function Uint8ToString(u8a){
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}
// Usage
var u8 = new Uint8Array([65, 66, 67, 68]);
var b64encoded = btoa(Uint8ToString(u8));

main();
