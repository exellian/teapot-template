import Field from './Field';

export default interface Function {

    execute(...params: any): Field;
}
