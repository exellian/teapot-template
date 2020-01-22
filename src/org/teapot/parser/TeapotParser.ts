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
import TextPartition from '../template/TextPartition';
import RawTextPartition from '../template/RawTextPartition';
import ValueTextPartition from '../template/ValueTextPartition';
import Accessor from '../accessor/Accessor';
import AccessorParser from './accessor/AccessorParser';

export default class TeapotParser implements Parser<TeapotTemplate, TeapotTemplatePack> {

    public parse(html: string): Unhandled<TemplateParseException, TeapotTemplate> {
        if (!Checker.checkNotNull(html)) {
            return new Unhandled<TemplateParseException, TeapotTemplate>(new TemplateParseException(new IllegalArgumentException("Html can not be null!")));
        }
        html = TeapotParser.replaceAnnotationCharacters(html);
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

    private static replaceAnnotationCharacters(html: string): string {
        let match: RegExpExecArray;
        let annotationPattern: RegExp = /@\s*[A-Za-z]*\s*\([^@.]+\)/;

        let final: string = "";
        while (match = annotationPattern.exec(html)) {
            final += html.substring(0, match.index);
            let annotation: string = match[0];
            annotation = annotation.split('<').join("%0");
            final += annotation;
            html = html.substring(match.index + annotation.length);
        }
        final += html;
        return final;
    }

    private static parseNode(element: ChildNode): Unhandled<TemplateParseException, Renderable> {
        if (element.nodeType == 3) {
            let textPartitions: Unhandled<TemplateParseException, TextPartition[]> = TeapotParser.parseValueAnnotations(element.nodeValue);
            if (textPartitions.isThrown()) {
                return new Unhandled<TemplateParseException, Renderable>(textPartitions.getException());
            }
            let text: Unhandled<IllegalArgumentException, Text> = Text.from(textPartitions.get());
            if (text.isThrown()) {
                return new Unhandled<TemplateParseException, Renderable>(new TemplateParseException(text.getException()));
            }
            return new Unhandled<TemplateParseException, Renderable>(text.get());
        }

        let tagName: string = element.nodeName;
        let children: Renderable[] = [];
        let attributes: Attribute[] = [];

        let nodeList: NodeListOf<ChildNode> = element.childNodes;

        let lastText: string = null;

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
                        lastText = nodeList[i].nodeValue;
                    } else {
                        if (lastText !== null) {
                            let parseRes: Unhandled<TemplateParseException, Renderable>
                                = TeapotParser.parseAnnotations(lastText, rendered);
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
                    let partitions: Unhandled<TemplateParseException, TextPartition[]> = TeapotParser.parseValueAnnotations(htmlElement.attributes[i].nodeValue);
                    if (partitions.isThrown()) {
                        return new Unhandled<TemplateParseException, Renderable>(partitions.getException());
                    }
                    let attribute: Unhandled<IllegalArgumentException, Attribute> = Attribute.from(htmlElement.attributes[i].nodeName, partitions.get());
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
        let globalPattern: RegExp = /(@\s*[A-Za-z]*\s*\([^@.]+\)\s*)+/;
        let match: RegExpExecArray = globalPattern.exec(text);
        if (!match) {
            return new Unhandled<TemplateParseException, Renderable>(tag);
        }
        if ((match.index + match[0].length) !== text.length) {
            return new Unhandled<TemplateParseException, Renderable>(tag);
        }
        let block: string = match[0];
        let annotationPattern: RegExp = /@\s*[A-Za-z]*\s*\([^@.]+\)/g;
        while (match = annotationPattern.exec(block)) {
            let annotation: string = match[0];
            annotation = annotation.split('%0').join('<');
            let indexOfFirstBracket: number = annotation.indexOf('(');
            let name: string = annotation.substring(1, indexOfFirstBracket).match(/[A-Za-z]*/)[0];
            let expression: string = annotation.substring(indexOfFirstBracket + 1, annotation.lastIndexOf(')'));
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

    private static parseValueAnnotations(text: string): Unhandled<TemplateParseException, TextPartition[]> {

        let partitions: TextPartition[] = [];
        let match: RegExpExecArray;
        let annotationPattern: RegExp = /@\s*\([^@.]+\)/; //TODO exclude @
        while (match = annotationPattern.exec(text)) {
            let before: string = text.substring(0, match.index);
            if (before.length !== 0) {
                let rp: Unhandled<IllegalArgumentException, RawTextPartition> = RawTextPartition.from(before);
                if (rp.isThrown()) {
                    return new Unhandled<TemplateParseException, TextPartition[]>(new TemplateParseException(rp.getException()));
                }
                partitions.push(rp.get());
            }
            let annotation: string = match[0];
            annotation = annotation.split('%0').join('<');
            let indexOfFirstBracket: number = annotation.indexOf('(');
            let expression: string = annotation.substring(indexOfFirstBracket + 1, annotation.lastIndexOf(')'));
            let accessor: Unhandled<TemplateParseException, Accessor> = AccessorParser.parse(expression);
            if (accessor.isThrown()) {
                return new Unhandled<TemplateParseException, TextPartition[]>(accessor.getException());
            }
            let vp: Unhandled<IllegalArgumentException, ValueTextPartition> = ValueTextPartition.from(accessor.get());
            if (vp.isThrown()) {
                return new Unhandled<TemplateParseException, TextPartition[]>(new TemplateParseException(vp.getException()));
            }
            partitions.push(vp.get());
            text = text.substring(match.index + annotation.length);
        }
        if (text.length !== 0) {
            let rp: Unhandled<IllegalArgumentException, RawTextPartition> = RawTextPartition.from(text);
            if (rp.isThrown()) {
                return new Unhandled<TemplateParseException, TextPartition[]>(new TemplateParseException(rp.getException()));
            }
            partitions.push(rp.get());
        }
        return new Unhandled<TemplateParseException, TextPartition[]>(partitions);
    }

    private static parseHtml(html: string): ChildNode {
        if (Runtime.isNodeJS()) {
            return TeapotParser.parseHtmlNodeJS(html);
        }
        return TeapotParser.parseHtmlBrowser(html);
    }

    private static parseHtmlBrowser(html: string): ChildNode {
        let docNode = null;
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
        //@ts-ignore
        /*const jsdom = require("jsdom");
        const { JSDOM } = jsdom;
        let dom = new JSDOM(html);
        return dom.window.document.body.children[0];*/
        return null;
    }

}
