import Annotation from './Annotation';
import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import TemplateParseException from '../exception/TemplateParseException';
import VoidUnhandled from '../util/VoidUnhandled';
import TemplateRenderException from '../exception/TemplateRenderException';
import Unhandled from '../util/Unhandled';
import Accessor from '../accessor/Accessor';
import ObjectField from '../view/ObjectField';
import AccessorParseException from '../exception/AccessorParseException';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import ArrayField from '../view/ArrayField';
import PrimitiveField from '../view/PrimitiveField';

export default class ForAnnotation extends Annotation {

    private readonly expression: string;
    private parsed: boolean;

    private condition: Accessor;
	private definition: Accessor;
	private increment: Accessor;
    private definitionVariable: string;
	private incrementVariable: string;

	private iterator: boolean;

	private iterable: Accessor;
    private variable: string;

    public constructor(expression: string, next: Renderable) {
        super(next);
        this.expression = expression;
        this.setParsed(false);
    }

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    private getExpression(): string {
        return this.expression;
    }

    public setCondition(condition: Accessor): void {
        this.condition = condition;
    }
    public getCondition(): Accessor {
        return this.condition;
    }
    public setDefinition(definition: Accessor): void {
        this.definition = definition;
    }
    public getDefinition(): Accessor {
        return this.definition;
    }
    public setIncrement(increment: Accessor): void {
        this.increment = increment;
    }
    public getIncrement(): Accessor {
        return this.increment;
    }
    public setIterator(iterator: boolean): void {
        this.iterator = iterator;
    }
    public isIterator(): boolean {
        return this.iterator;
    }
    public setIterable(iterable: Accessor): void {
        this.iterable = iterable;
    }
    public getIterable(): Accessor {
        return this.iterable;
    }
    public setVariable(variable: string): void {
        this.variable = variable;
    }
    public getVariable(): string {
        return this.variable;
    }
    public setDefinitionVariable(definitionVariable: string): void {
        this.definitionVariable = definitionVariable;
    }
    public getDefinitionVariable(): string {
        return this.definitionVariable;
    }
    public setIncrementVariable(incrementVariable: string): void {
        this.incrementVariable = incrementVariable;
    }
    public getIncrementVariable(): string {
        return this.incrementVariable;
    }

    //TODO remove split("=") and exchange to indexOf
    parse(): VoidUnhandled<TemplateParseException> {
        let expression: string = this.getExpression();
        var rest: string = null;
        var indexOfSemicolon: number = expression.indexOf(';');
        if (indexOfSemicolon === -1) {

            let indexOfColon: number = expression.indexOf(':');
            if (indexOfColon === -1) {
                return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For pattern invalid!"));
            }
            let variable: string = expression.substring(0, indexOfColon);
            let iterable: string = expression.substring(indexOfColon + 1);

            if (!variable.match(/\s*[a-zA-Z_]+\w*\s*/)) {
                return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For variable-name invalid!"));
            }

            let variableName: string = variable.match(/[a-zA-Z_]+\w*/)[0];

            let iterableAccessor: Accessor = new Accessor(iterable);
            let iterableAccessorRes: VoidUnhandled<AccessorParseException> = iterableAccessor.parse();
            if (iterableAccessorRes.isThrown()) {
                return new VoidUnhandled<TemplateParseException>(iterableAccessorRes.get());
            }

            this.setVariable(variableName);
            this.setIterable(iterableAccessor);
            this.setIterator(true);

            this.setCondition(null);
            this.setDefinition(null);
            this.setIncrement(null);
            this.setDefinitionVariable(null);
            this.setIncrementVariable(null);

            this.setParsed(true);
            return new VoidUnhandled<TemplateParseException>();
        }
        var definition: string = expression.substring(0, indexOfSemicolon);
        rest = expression.substring(indexOfSemicolon + 1);
        indexOfSemicolon = rest.indexOf(';');
        if (indexOfSemicolon === -1) {
            return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For pattern missing condition!"));
        }
        let condition: string = rest.substring(0, indexOfSemicolon);
        var increment: string = rest.substring(indexOfSemicolon + 1);

        if (condition.length === 0) {
            return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For condition can not be empty!"));
        }
        if (increment.length === 0) {
            return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For increment can not be empty!"));
        }

        if (definition.length !== 0) {
            let definitionParts: string[] = definition.split('=');
            if (definitionParts.length !== 2) {
                return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For defintion must contain an assignment!"));
            }

            if (!definitionParts[0].match(/\s*int\s+[a-zA-Z_]+\w*\s*/)) {
                return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For defintion must contain an int assignment!"));
            }

            let indexOfInt: number = definitionParts[0].indexOf('int');
            let definitionVariableName: string = definitionParts[0].substring(indexOfInt + 3).match(/[a-zA-Z_]+\w*/)[0];

            let definitionAccessor: Accessor = new Accessor(definitionParts[1]);
            let definitionAccessorRes: VoidUnhandled<AccessorParseException> = definitionAccessor.parse();
            if (definitionAccessorRes.isThrown()) {
                return new VoidUnhandled<TemplateParseException>(definitionAccessorRes.get());
            }
            this.setDefinition(definitionAccessor);
            this.setDefinitionVariable(definitionVariableName);
        } else {
            this.setDefinition(null);
            this.setDefinitionVariable("");
        }

        let incrementParts: string[] = increment.split('=');
        if (incrementParts.length !== 2) {
            return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For increment must contain an assignment!"));
        }
        if (!incrementParts[0].match(/\s*[a-zA-Z_]+\w*\s*/)) {
            return new VoidUnhandled<TemplateParseException>(new TemplateParseException("For increment assignment invalid!"));
        }
        let incrementVariableName: string = incrementParts[0].match(/[a-zA-Z_]+\w*/)[0];
        let incrementAccessor: Accessor = new Accessor(incrementParts[1]);
        let incrementAccessorRes: VoidUnhandled<AccessorParseException> = incrementAccessor.parse();
        if (incrementAccessorRes.isThrown()) {
            return new VoidUnhandled<TemplateParseException>(incrementAccessorRes.get());
        }
        this.setIncrement(incrementAccessor);
        this.setIncrementVariable(incrementVariableName);

        let conditionAccessor: Accessor = new Accessor(condition);
        let conditionAccessorRes: VoidUnhandled<AccessorParseException> = conditionAccessor.parse();
        if (conditionAccessorRes.isThrown()) {
            return new VoidUnhandled<TemplateParseException>(conditionAccessorRes.get());
        }
        this.setCondition(conditionAccessor);

        this.setIterator(false);
        this.setIterable(null);
        this.setVariable(null);

        this.setParsed(true);

        return new VoidUnhandled<TemplateParseException>();
    }
    isParsed(): boolean {
        return this.parsed;
    }

    protected render0(scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {
        let element: Node = document.createElement("div");
        let object: ObjectField = new ObjectField();
        if (this.isIterator()) {
            return this.renderIterable(object, element, scope, next);
        }
        return this.renderNormal(object, element, scope, next);
    }

    private renderIterable(object: ObjectField, parent: Node, scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {

		let field: Unhandled<InvalidViewAccessException, Field> = this.getIterable().getField(scope);
        if (field.isThrown()) {
            return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(field.getException()));
        }

        let newScope: Scope = scope.newScope(object);

		if (!ForAnnotation.checkArrayField(field.get())) {
			return new Unhandled<TemplateRenderException, Node>(new TemplateRenderException("Can only iterate over array!"));
		}

		let array: Field[] = (<ArrayField>field.get()).getLinkFields();
        let variable: string = this.getVariable();
		for (let key in array) {
			let field: Field = array[key];
            object.setLinkField(variable, field);
			let renderRes: Unhandled<TemplateRenderException, Node> = next.render(newScope);
            if (renderRes.isThrown()) {
                renderRes.reset();
                return renderRes;
            }
            parent.appendChild(renderRes.get());
		}
		return new Unhandled<TemplateRenderException, Node>(parent);
    }

    protected renderNormal(object: ObjectField, parent: Node, scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {

        if (this.getDefinition() !== null) {
            let startValue: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getDefinition().getPrimitveField(scope);
            if (startValue.isThrown()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(startValue.getException()));
            }
            if (!startValue.get().isInteger()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateRenderException("For start value must be an integer!"));
            }
            object.setLinkField(this.getDefinitionVariable(), startValue.get());
        }

        let newScope: Scope = scope.newScope(object);

        while (true) {
            let condition: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getCondition().get(newScope);
            if (condition.isThrown()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(condition.getException()));
            }
            if (!condition.get().isBoolean()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateRenderException("For condition value must be of type boolean!"));
            }
            if (condition.get().getAsBoolean() !== true) {
                break;
            }
            let renderRes: Unhandled<TemplateRenderException, Node> = next.render(newScope);
            if (renderRes.isThrown()) {
                renderRes.reset();
                return renderRes;
            }
            parent.appendChild(renderRes.get());

            let increment: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getIncrement().get(newScope);
            if (increment.isThrown()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(increment.getException()));
            }
            object.setLinkField(this.getIncrementVariable(), increment.get());
        }
        return new Unhandled<TemplateRenderException, Node>(parent);
    }

    private static checkArrayField(field: Field): boolean {
		return field instanceof ArrayField;
	}

}
