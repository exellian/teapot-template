import TeapotTemplateEngine from "./org/teapot/TeapotTemplateEngine";
import Unhandled from './org/teapot/util/Unhandled';
import TemplateParseException from './org/teapot/exception/TemplateParseException';
import TeapotTemplate from './org/teapot/template/TeapotTemplate';
import TeapotTemplatePack from './org/teapot/pack/TeapotTemplatePack';
import TeapotFlatBufferPacker from './org/teapot/flatbuffer/TeapotFlatBufferPacker';
import TeapotFlatBufferUnpacker from './org/teapot/flatbuffer/TeapotFlatBufferUnpacker';
import { TeapotTemplateMessage, ITeapotTemplateMessage } from '../proto/teapot';
let main = function() {

    let html = "<div>" +
                    "@for(int i = 0;i < 10;i++) <div>@(test)</div>" +
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
    console.time("deserialization FlatBuffer");

    for (let i = 0;i < 1;i++) {
        TeapotFlatBufferUnpacker.parse(raw);
    }

    console.timeEnd("deserialization FlatBuffer");

    console.time("deserialization JSON");

    for (let i = 0;i < 1;i++) {
        JSON.parse(json);
    }

    console.timeEnd("deserialization JSON");

    let message = TeapotTemplateMessage.create(<ITeapotTemplateMessage>pack);
    let buffer = TeapotTemplateMessage.encode(message).finish();

    console.time("deserialization Protobuf");

    for (let i = 0;i < 1;i++) {
        let obj = TeapotTemplateMessage.decode(buffer);
    }

    console.timeEnd("deserialization Protobuf");
      //console.log(JSON.stringify(obj));

      console.log(Uint8ToString(buffer));


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
