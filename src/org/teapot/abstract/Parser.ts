import Packable from './Packable';
import Pack from './Pack';
import TemplateParseException from '../exception/TemplateParseException';
import Unhandled from '../util/Unhandled';

export default interface Parser<P extends Packable<T>, T extends Pack> {

    parse(html: string): Unhandled<TemplateParseException, P>;
}
