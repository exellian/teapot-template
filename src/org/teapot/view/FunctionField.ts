import Function from './Function';
import Field from './Field';
import Scope from './Scope';
import PrimitiveFieldAccessor from '../accessor/PrimitiveFieldAccessor';
import Unhandled from '../util/Unhandled';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';

export default class FunctionField implements Field {

	public constructor(private readonly func: Function) {}

    get(_scope: Scope, _accessor: PrimitiveFieldAccessor): Unhandled<InvalidViewAccessException, Field> {
        return new Unhandled<InvalidViewAccessException, Field>(new InvalidViewAccessException("Can not access FunctionField ion primitive way!"));
    }

    public execute(...params: any): Field {
        return this.getLinkFunction().execute(params);
    }

	private getLinkFunction(): Function {
		return this.func;
	}
}
