import Exception from './Exception';

export default class NumberFormatException extends Exception {

    public constructor(message: string) {
        super(message);
    }
}
