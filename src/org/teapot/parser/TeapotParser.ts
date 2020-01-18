import Parser from '../abstract/Parser';
import TeapotTemplate from '../template//TeapotTemplate';
import TeapotTemplatePack from '../pack/TeapotTemplatePack';
import Unhandled from '../util/Unhandled';
import TemplateParseException from '../exception/TemplateParseException';
import Checker from '../util/Checker';
import IllegalArgumentException from '../exception/IllegalArgumentException';
import Runtime from '../util/Runtime';
import Renderable from '../template/Renderable';
import Text from '../template//Text';
import Attribute from '../template//Attribute';
import Tag from '../template//Tag';
import Annotation from '../annotation/Annotation';
import AnnotationType from './annotation/AnnotationType';

export default class TeapotParser implements Parser<TeapotTemplate, TeapotTemplatePack> {

    public parse(html: string): Unhandled<TemplateParseException, TeapotTemplate> {
        if (!Checker.checkNotNull(html)) {
            return new Unhandled<TemplateParseException, TeapotTemplate>(new TemplateParseException(new IllegalArgumentException("Html can not be null!")));
        }
        let element: ChildNode = TeapotParser.parseHtml(html);

        let renderable: Unhandled<TemplateParseException, Renderable> = TeapotParser.parseNode(element);
        if (renderable.isThrown()) {
            return new Unhandled<TemplateParseException, TeapotTemplate>(renderable.getException());
        }
        let teapotTemplate: Unhandled<IllegalArgumentException, TeapotTemplate> = TeapotTemplate.from(renderable.get());
        if (teapotTemplate.isThrown()) {
            return new Unhandled<TemplateParseException, TeapotTemplate>(new TemplateParseException(teapotTemplate.getException()));
        }
        return new Unhandled<TemplateParseException, TeapotTemplate>(teapotTemplate.get());
    }

    private static parseNode(element: ChildNode): Unhandled<TemplateParseException, Renderable> {
        if (element.nodeType == 3) {
            let text: Unhandled<IllegalArgumentException, Text> = Text.from(element.nodeValue);
            if (text.isThrown()) {
                return new Unhandled<TemplateParseException, Renderable>(new TemplateParseException(text.getException()));
            }
            return new Unhandled<TemplateParseException, Renderable>(text.get());
        }

        let tagName: string = element.nodeName;
        let children: Renderable[] = [];
        let attributes: Attribute[] = [];

        let nodeList: NodeListOf<ChildNode> = element.childNodes;

        let lastText: Text = null;

        if (nodeList !== null && nodeList !== undefined) {
            if (nodeList.length) {
                for (let i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        if (nodeList[i].nodeValue.replace(/\s*/, '').length === 0) {
                            continue;
                        }
                    }
                    let renderedRes: Unhandled<TemplateParseException, Renderable> = TeapotParser.parseNode(nodeList[i]);
                    if (renderedRes.isThrown()) {
                        renderedRes.reset();
                        return renderedRes;
                    }
                    let rendered: Renderable = renderedRes.get();
                    if (nodeList[i].nodeType == 3) {
                        lastText = <Text>rendered;
                    } else {
                        if (lastText !== null) {
                            let parseRes: Unhandled<TemplateParseException, Renderable>
                                = TeapotParser.parseAnnotations(lastText.getText(), rendered);
                            if (!parseRes.isThrown()) {
                                //TODO slice out annotations
                                children.pop();
                                rendered = parseRes.get();
                            }
                        }
                    }
                    children.push(rendered);
                }
            }
        }
        if (element['attributes'] !== null && element['attributes'] !== undefined) {
            if (element['attributes'].length) {
                let htmlElement: HTMLElement = <HTMLElement>element;

                for (var i = 0; i < htmlElement.attributes.length; i++) {
                    if (TeapotParser.hasAttribute(attributes, htmlElement.attributes[i].nodeName)) {
                        continue;
                    }
                    let attribute: Unhandled<IllegalArgumentException, Attribute> = Attribute.from(htmlElement.attributes[i].nodeName, htmlElement.attributes[i].nodeValue);
                    if (attribute.isThrown()) {
                        return new Unhandled<TemplateParseException, Renderable>(new TemplateParseException(attribute.getException()));
                    }
                    attributes.push(attribute.get());
                }
            }
        }
        let tag: Unhandled<IllegalArgumentException, Tag> = Tag.from(tagName, children, attributes);
        if (tag.isThrown()) {
            return new Unhandled<TemplateParseException, Renderable>(new TemplateParseException(tag.getException()));
        }
        return new Unhandled<TemplateParseException, Renderable>(tag.get());
    }

    private static hasAttribute(attributes: Attribute[], name: string): boolean {
        for (let a of attributes) {
            if (a.getName() === name) {
                return true;
            }
        }
        return false;
    }

    private static parseAnnotations(text: string, tag: Renderable): Unhandled<TemplateParseException, Renderable> {
        let globalPattern: RegExp = /(@\s*[A-Za-z]*\s*\(.+\)\s*)+/;
        let match: RegExpExecArray = globalPattern.exec(text);
        if (!match) {
            return new Unhandled<TemplateParseException, Renderable>(tag);
        }
        if ((match.index + match[0].length) !== text.length) {
            return new Unhandled<TemplateParseException, Renderable>(tag);
        }
        let block: string = match[0];
        let annotationPattern: RegExp = /@\s*[A-Za-z]*\s*\(.+\)/g;
        while (match = annotationPattern.exec(block)) {
            let annotation: string = match[0];
            let indexOfFirstBracket: number = annotation.indexOf('(');
            let name: string = annotation.substring(1, indexOfFirstBracket).match(/[A-Za-z]*/)[0];
            let expression: string = annotation.substring(indexOfFirstBracket + 1, annotation.lastIndexOf(')'))
            for (let type of AnnotationType.getValues()) {
                if (type.getName() === name) {
                    let annotation: Unhandled<TemplateParseException, Annotation> = type.parse(expression, tag);
                    if (annotation.isThrown()) {
                        return new Unhandled<TemplateParseException, Renderable>(annotation.getException());
                    }
                    tag = annotation.get();
                    break;
                }
            }
        }
        return new Unhandled<TemplateParseException, Renderable>(tag);
    }

    private static parseHtml(html: string): ChildNode {
        if (Runtime.isNodeJS()) {
            return TeapotParser.parseHtmlNodeJS(html);
        }
        return TeapotParser.parseHtmlBrowser(html);
    }

    private static parseHtmlBrowser(html: string): ChildNode {
        var docNode = null;
        //@ts-ignore
        if (window.DOMParser) {
            let parser: DOMParser = new DOMParser();
            docNode = parser.parseFromString(html, "text/xml");
        } else { // Microsoft strikes again
            //@ts-ignore
            docNode = new ActiveXObject("Microsoft.XMLDOM");
            docNode.async = false;
            docNode.loadXML(html);
        }
        return docNode.firstChild;
    }

    private static parseHtmlNodeJS(html: string): ChildNode {
        const jsdom = require("jsdom");
        const { JSDOM } = jsdom;
        let dom = new JSDOM(html);
        return dom.window.document.body.children[0];
    }

}
