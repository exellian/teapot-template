import Scope from './Scope';
import ObjectField from './ObjectField';

export default class View extends Scope {

    public constructor(root: ObjectField) {
        super(root);
    }
}
