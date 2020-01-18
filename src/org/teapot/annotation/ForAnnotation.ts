import Annotation from './Annotation';
import Scope from '../view/Scope';
import TemplateParseException from '../exception/TemplateParseException';
import TemplateRenderException from '../exception/TemplateRenderException';
import Unhandled from '../util/Unhandled';
import Accessor from '../accessor/Accessor';
import ObjectField from '../view/ObjectField';
import InvalidViewAccessException from '../exception/InvalidViewAccessException';
import Field from '../view/Field';
import ArrayField from '../view/ArrayField';
import PrimitiveField from '../view/PrimitiveField';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import RenderablePack from '../pack/RenderablePack';
import Renderable from '../template/Renderable';
import TeapotPackType from '../pack/TeapotPackType';

export default class ForAnnotation extends Annotation {

    private readonly iterator: boolean;

    private readonly condition: Accessor | null;
    private readonly definition: Accessor | null;
	private readonly increment: Accessor | null;
    private readonly definitionVariable: string | null;
	private readonly incrementVariable: string | null;

	private readonly iterable: Accessor | null;
    private readonly variable: string | null;

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

    public static from(condition: Accessor, definition: Accessor, increment: Accessor, definitionVariable: string, incrementVariable: string, next: Renderable): Unhandled<IllegalArgumentException, ForAnnotation> {
        if (!Checker.checkNotNull(condition)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("Condition can not be null!"));
        }/*
        if (!Checker.checkNotNull(definition)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("Definition can not be null!"));
        }*/
        if (!Checker.checkNotNull(increment)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("Increment can not be null!"));
        }
        if (!Checker.checkNotNull(definitionVariable)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("DefinitionVariable can not be null!"));
        }
        if (!Checker.checkNotNull(incrementVariable)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("IncrementVariable can not be null!"));
        }
        if (!Checker.checkNotNull(next)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("Next can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, ForAnnotation>(new ForAnnotation(false, condition, definition, increment, definitionVariable, incrementVariable, null, null, next));
    }

    public static fromIterable(iterable: Accessor, variable: string, next: Renderable): Unhandled<IllegalArgumentException, ForAnnotation> {
        if (!Checker.checkNotNull(iterable)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("iterable can not be null!"));
        }
        if (!Checker.checkNotNull(variable)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("Variable can not be null!"));
        }
        if (!Checker.checkNotNull(next)) {
            return new Unhandled<IllegalArgumentException, ForAnnotation>(new IllegalArgumentException("Next can not be null!"));
        }
        return new Unhandled<IllegalArgumentException, ForAnnotation>(new ForAnnotation(true, null, null, null, null, null, iterable, variable, next));
    }

    pack(): RenderablePack {
        let pack: RenderablePack = new RenderablePack(TeapotPackType.FOR);
        pack.iterator = this.isIterator();
        pack.iterable = (this.getLinkIterable() === null) ? null : this.getLinkIterable().pack();
        pack.variable = this.getVariable();
        pack.definition = (this.getLinkDefinition() === null) ? null : this.getLinkDefinition().pack();
        pack.condition = (this.getLinkCondition() === null) ? null : this.getLinkCondition().pack();
        pack.increment = (this.getLinkIncrement() === null) ? null : this.getLinkIncrement().pack();
        pack.definitionVariable = this.getDefinitionVariable();
        pack.incrementVariable = this.getIncrementVariable();
        pack.next = this.getLinkNext().pack();
        return pack;
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
    private getDefinitionVariable(): string {
        return this.definitionVariable;
    }
    private getIncrementVariable(): string {
        return this.incrementVariable;
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
            object.setLinkField(this.getDefinitionVariable(), startValue.get());
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
            object.setLinkField(this.getIncrementVariable(), increment.get());
        }
        return new Unhandled<TemplateRenderException, Node>(parent);
    }

    private static checkArrayField(field: Field): boolean {
		return field instanceof ArrayField;
	}

}
