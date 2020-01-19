import { TemplateEngine } from './abstract/TemplateEngine';
import TeapotTemplate from './template/TeapotTemplate';
import TeapotTemplatePack from './pack/TeapotTemplatePack';
import TeapotParser from './parser/TeapotParser';
import TeapotUnpacker from './pack/TeapotUnpacker';
import TeapotFlatBufferParser from './flatbuffer/TeapotFlatBufferParser';

export class TeapotTemplateEngine extends TemplateEngine<TeapotTemplate, TeapotTemplatePack, TeapotParser, TeapotUnpacker, TeapotFlatBufferParser> {

    public constructor() {
        super(new TeapotParser(), new TeapotUnpacker(), new TeapotFlatBufferParser());
    }

}
