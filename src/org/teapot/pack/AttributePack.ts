import Pack from '../abstract/Pack';

export default class AttributePack extends Pack {

    public name: string;
    public value: string;

    public toJSON(): string {
        return JSON.stringify(this);
    }

}
