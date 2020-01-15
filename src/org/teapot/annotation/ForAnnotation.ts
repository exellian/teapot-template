import Annotation from './Annotation';
import Scope from '../view/Scope';
import TemplateParseException from '../exception/TemplateParseException';
import TemplateRenderException from '../exception/TemplateRenderException';
import Unhandled from '../util/Unhandled';
import Accessor from '../accessor/Accessor';
import ObjectField from '../view/ObjectField';
import AccessorParseException from '../exception/AccessorParseException';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import ArrayField from '../view/ArrayField';
import PrimitiveField from '../view/PrimitiveField';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import RenderablePack from '../pack/RenderablePack';
import Renderable from '../template/Renderable';

export default class ForAnnotation extends Annotation {

    private readonly iterator: boolean;

    private readonly condition: Accessor;
    private readonly definition: Accessor;
	private readonly increment: Accessor;
    private readonly definitionVariable: string;
	private readonly incrementVariable: string;

	private readonly iterable: Accessor;
    private readonly variable: string;

    private constructor(iterator: boolean, condition: Accessor, definition: Accessor, increment: Accessor, definitionVariable: string, incrementVariable: string, iterable: Accessor, variable: string, next: Renderable) {
        super(next);
        this.iterator = iterator;
        this.condition = condition;
        this.definition = definition;
        this.increment = increment;
        this.definitionVariable = definitionVariable;
        this.incrementVariable = incrementVariable;
        this.iterable = iterable;
        this.variable = variable;
    }

    pack(): RenderablePack {
        throw new Error("Method not implemented.");
    }

    private getLinkCondition(): Accessor {
        return this.condition;
    }
    private getLinkDefinition(): Accessor {
        return this.definition;
    }
    private getLinkIncrement(): Accessor {
        return this.increment;
    }
    private isIterator(): boolean {
        return this.iterator;
    }
    private getLinkIterable(): Accessor {
        return this.iterable;
    }
    private getVariable(): string {
        return this.variable;
    }
    private getDefinitionletiable(): string {
        return this.definitionVariable;
    }
    private getIncrementletiable(): string {
        return this.incrementVariable;
    }

    public static parse(expression: string, next: Renderable): Unhandled<TemplateParseException, ForAnnotation> {
        if (Checker.checkNotNull(expression)) {
            throw new IllegalArgumentException("Expression can not be null!");
        }
        if (Checker.checkNotNull(next)) {
            throw new IllegalArgumentException("Next can not be null!");
        }

        let rest: string = null;
        let indexOfSemicolon: number = expression.indexOf(';');
        if (indexOfSemicolon === -1) {

            let indexOfColon: number = expression.indexOf(':');
            if (indexOfColon === -1) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For pattern invalid!"));
            }
            let letiable: string = expression.substring(0, indexOfColon);
            let iterable: string = expression.substring(indexOfColon + 1);

            if (!letiable.match(/\s*[a-zA-Z_]+\w*\s*/)) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For letiable-name invalid!"));
            }

            let letiableName: string = letiable.match(/[a-zA-Z_]+\w*/)[0];

            let iterableAccessor: Unhandled<AccessorParseException, Accessor> = Accessor.parse(iterable);
            if (iterableAccessor.isThrown()) {
                return new Unhandled<TemplateParseException, ForAnnotation>(iterableAccessor.getException());
            }

            return new Unhandled<TemplateParseException, ForAnnotation>(new ForAnnotation(true, null, null, null, null, null, iterableAccessor.get(), letiableName, next));
        }
        let definition: string = expression.substring(0, indexOfSemicolon);
        rest = expression.substring(indexOfSemicolon + 1);
        indexOfSemicolon = rest.indexOf(';');
        if (indexOfSemicolon === -1) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For pattern missing condition!"));
        }
        let condition: string = rest.substring(0, indexOfSemicolon);
        let increment: string = rest.substring(indexOfSemicolon + 1);

        if (condition.length === 0) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For condition can not be empty!"));
        }
        if (increment.length === 0) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For increment can not be empty!"));
        }
        let definitionAccessor: Accessor = null;
        let definitionVariable: string = null;
        if (definition.length !== 0) {
            let defintionEqualsIndex: number = definition.indexOf('=');
            if (defintionEqualsIndex === -1) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For defintion must contain an assignment!"));
            }
            let definitionParts: [string, string] = [definition.substring(0, defintionEqualsIndex), definition.substring(defintionEqualsIndex + 1)];
            if (!definitionParts[0].match(/\s*int\s+[a-zA-Z_]+\w*\s*/)) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For defintion must contain an int assignment!"));
            }

            let indexOfInt: number = definitionParts[0].indexOf('int');
            definitionVariable = definitionParts[0].substring(indexOfInt + 3).match(/[a-zA-Z_]+\w*/)[0];

            let definitionAccessorRes: Unhandled<AccessorParseException, Accessor> = Accessor.parse(definitionParts[1]);
            if (definitionAccessorRes.isThrown()) {
                return new Unhandled<TemplateParseException, ForAnnotation>(definitionAccessorRes.getException());
            }
            definitionAccessor = definitionAccessorRes.get();
        }

        let incrementEqualsIndex: number = increment.indexOf('=');
        if (incrementEqualsIndex === -1) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For increment must contain an assignment!"));
        }
        let incrementParts: [string, string] = [increment.substring(0, incrementEqualsIndex), increment.substring(incrementEqualsIndex + 1)];
        if (!incrementParts[0].match(/\s*[a-zA-Z_]+\w*\s*/)) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For increment assignment invalid!"));
        }
        let incrementVariable: string = incrementParts[0].match(/[a-zA-Z_]+\w*/)[0];
        let incrementAccessor: Unhandled<AccessorParseException, Accessor> = Accessor.parse(incrementParts[1]);
        if (incrementAccessor.isThrown()) {
            return new Unhandled<TemplateParseException, ForAnnotation>(incrementAccessor.getException());
        }

        let conditionAccessor: Unhandled<AccessorParseException, Accessor> = Accessor.parse(condition);
        if (conditionAccessor.isThrown()) {
            return new Unhandled<TemplateParseException, ForAnnotation>(conditionAccessor.getException());
        }
        return new Unhandled<TemplateParseException, ForAnnotation>(new ForAnnotation(false, conditionAccessor.get(), definitionAccessor, incrementAccessor.get(), definitionVariable, incrementVariable, null, null, next));
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

		let field: Unhandled<InvalidViewAccessException, Field> = this.getLinkIterable().getField(scope);
        if (field.isThrown()) {
            return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(field.getException()));
        }

        let newScope: Scope = scope.newScope(object);

		if (!ForAnnotation.checkArrayField(field.get())) {
			return new Unhandled<TemplateRenderException, Node>(new TemplateRenderException("Can only iterate over array!"));
		}

		let array: Field[] = (<ArrayField>field.get()).getLinkFields();
        let letiable: string = this.getVariable();
		for (let key in array) {
			let field: Field = array[key];
            object.setLinkField(letiable, field);
			let renderRes: Unhandled<TemplateRenderException, Node> = next.render(newScope);
            if (renderRes.isThrown()) {
                renderRes.reset();
                return renderRes;
            }
            parent.appendChild(renderRes.get());
		}
		return new Unhandled<TemplateRenderException, Node>(parent);
    }

    private renderNormal(object: ObjectField, parent: Node, scope: Scope, next: Renderable): Unhandled<TemplateRenderException, Node> {

        if (this.getLinkDefinition() !== null) {
            let startValue: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkDefinition().getPrimitveField(scope);
            if (startValue.isThrown()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(startValue.getException()));
            }
            if (!startValue.get().isInteger()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateRenderException("For start value must be an integer!"));
            }
            object.setLinkField(this.getDefinitionletiable(), startValue.get());
        }

        let newScope: Scope = scope.newScope(object);

        while (true) {
            let condition: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkCondition().get(newScope);
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

            let increment: Unhandled<InvalidViewAccessException, PrimitiveField> = this.getLinkIncrement().get(newScope);
            if (increment.isThrown()) {
                return new Unhandled<TemplateRenderException, Node>(new TemplateParseException(increment.getException()));
            }
            object.setLinkField(this.getIncrementletiable(), increment.get());
        }
        return new Unhandled<TemplateRenderException, Node>(parent);
    }

    private static checkArrayField(field: Field): boolean {
		return field instanceof ArrayField;
	}

}
