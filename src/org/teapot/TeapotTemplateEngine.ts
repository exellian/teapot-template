import { TemplateEngine } from './abstract/TemplateEngine';
import TeapotTemplate from './template/TeapotTemplate';
import TeapotTemplatePack from './pack/TeapotTemplatePack';
import TeapotParser from './parser/TeapotParser';
import TeapotUnpacker from './pack/TeapotUnpacker';
import TeapotFlatBufferUnpacker from './flatbuffer/TeapotFlatBufferUnpacker';

export class TeapotTemplateEngine extends TemplateEngine<TeapotTemplate, TeapotTemplatePack, TeapotParser, TeapotUnpacker, TeapotFlatBufferUnpacker> {

    public constructor() {
        super(new TeapotParser(), new TeapotUnpacker(), new TeapotFlatBufferUnpacker());
    }

}
