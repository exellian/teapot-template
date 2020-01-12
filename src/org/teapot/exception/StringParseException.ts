import Exception from './Exception';

export default class StringParseException extends Exception {

    public constructor(message: string) {
        super(message);
    }
}
