import { PackFactory } from '../abstract/PackFactory';
import TeapotTemplate from './TeapotTemplate';
import TeapotTemplatePack from '../pack/TeapotTemplatePack';

export default class TeapotTemplatePackFactory implements PackFactory<TeapotTemplate, TeapotTemplatePack> {

    fromJSON(json: string): TeapotTemplatePack {
        throw new Error("Method not implemented.");
    }
    from(pack: TeapotTemplatePack): TeapotTemplate {
        throw new Error("Method not implemented.");
    }


}
