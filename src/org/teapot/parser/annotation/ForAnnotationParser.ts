import Renderable from '../../template/Renderable';
import Unhandled from '../../util/Unhandled';
import TemplateParseException from '../../exception/TemplateParseException';
import AnnotationParser from './AnnotationParser';
import ForAnnotation from '../../annotation/ForAnnotation';
import Checker from '../../util/Checker';
import IllegalArgumentException from '../../exception/IllegalArgumentException';
import AccessorParseException from '../../exception/AccessorParseException';
import Accessor from '../../accessor/Accessor';
import AccessorParser from '../accessor/AccessorParser';

export default class ForAnnotationParser implements AnnotationParser<ForAnnotation> {

    public parse(expression: string, next: Renderable): Unhandled<TemplateParseException, ForAnnotation> {
        if (!Checker.checkNotNull(expression)) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException(new IllegalArgumentException("Expression can not be null!")));
        }
        if (!Checker.checkNotNull(next)) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException(new IllegalArgumentException("Next can not be null!")));
        }

        let rest: string = null;
        let indexOfSemicolon: number = expression.indexOf(';');
        if (indexOfSemicolon === -1) {

            let indexOfColon: number = expression.indexOf(':');
            if (indexOfColon === -1) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For pattern invalid!"));
            }
            let variable: string = expression.substring(0, indexOfColon);
            let iterable: string = expression.substring(indexOfColon + 1);

            if (!variable.match(/\s*[a-zA-Z_]+\w*\s*/)) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For letiable-name invalid!"));
            }

            let variableName: string = variable.match(/[a-zA-Z_]+\w*/)[0];

            let iterableAccessor: Unhandled<AccessorParseException, Accessor> = AccessorParser.parse(iterable);
            if (iterableAccessor.isThrown()) {
                return new Unhandled<TemplateParseException, ForAnnotation>(iterableAccessor.getException());
            }
            let forAnnotation: Unhandled<IllegalArgumentException, ForAnnotation> = ForAnnotation.fromIterable(iterableAccessor.get(), variableName, next);
            if (forAnnotation.isThrown()) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException(forAnnotation.getException()));
            }
            return new Unhandled<TemplateParseException, ForAnnotation>(forAnnotation.get());
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

            let definitionAccessorRes: Unhandled<AccessorParseException, Accessor> = AccessorParser.parse(definitionParts[1]);
            if (definitionAccessorRes.isThrown()) {
                return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException(definitionAccessorRes.getException()));
            }
            definitionAccessor = definitionAccessorRes.get();
        }

        increment = ForAnnotationParser.replaceIncrement(increment);
        let incrementEqualsIndex: number = increment.indexOf('=');
        if (incrementEqualsIndex === -1) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For increment must contain an assignment!"));
        }
        let incrementParts: [string, string] = [increment.substring(0, incrementEqualsIndex), increment.substring(incrementEqualsIndex + 1)];
        if (!incrementParts[0].match(/\s*[a-zA-Z_]+\w*\s*/)) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException("For increment assignment invalid!"));
        }
        let incrementVariable: string = incrementParts[0].match(/[a-zA-Z_]+\w*/)[0];
        let incrementAccessor: Unhandled<AccessorParseException, Accessor> = AccessorParser.parse(incrementParts[1]);
        if (incrementAccessor.isThrown()) {
            return new Unhandled<TemplateParseException, ForAnnotation>(incrementAccessor.getException());
        }

        let conditionAccessor: Unhandled<AccessorParseException, Accessor> = AccessorParser.parse(condition);
        if (conditionAccessor.isThrown()) {
            return new Unhandled<TemplateParseException, ForAnnotation>(conditionAccessor.getException());
        }
        let forAnnotation: Unhandled<IllegalArgumentException, ForAnnotation> = ForAnnotation.from(conditionAccessor.get(), definitionAccessor, incrementAccessor.get(), definitionVariable, incrementVariable, next);
        if (forAnnotation.isThrown()) {
            return new Unhandled<TemplateParseException, ForAnnotation>(new TemplateParseException(forAnnotation.getException()));
        }
        return new Unhandled<TemplateParseException, ForAnnotation>(forAnnotation.get());
    }

    private static replaceIncrement(increment: string): string {
        return increment.split("i++").join("i=i+1").split("++i").join("i=i+1").split("i--").join("i=i-1").split("--i").join("i=i-1");
    }

}
