import Renderable from '../util/Renderable';
import Scope from '../view/Scope';
import Unhandled from '../util/Unhandled';
import VoidUnhandled from '../util/VoidUnhandled';
import Parsable from '../util/Parsable';
import TemplateParseException from '../exception/TemplateParseException';
import Runtime from '../util/Runtime';
import Text from './Text';
import Tag from './Tag';
import TemplateRenderException from '../exception/TemplateRenderException';
import AnnotationType from '../annotation/AnnotationType';
import Annotation from '../annotation/Annotation';
import Attribute from './Attribute';

export default class Template implements Parsable<TemplateParseException> {

    private readonly html: string;
    private parsed: boolean;

    private root: Renderable;

    public constructor(html: string) {
        this.html = html;
        this.setParsed(false);
    }

    public static from(renderable: Renderable): Template {
        let o: Template = new Template(null);
        o.parsed = true;
        o.root = renderable;
        return o;
    }

    private getHtml(): string {
        return this.html;
    }

    public setLinkRoot(root: Renderable): void {
        this.root = root;
    }

    public getLinkRoot(): Renderable {
        return this.root;
    }

    private setParsed(parsed: boolean): void {
        this.parsed = parsed;
    }

    parse(): VoidUnhandled<TemplateParseException> {

        let element: ChildNode = Template.parseHtml(this.getHtml());

        console.time('parseNode');


        let renderRes: Unhandled<TemplateParseException, Renderable> = this.parseNode(element);
        if (renderRes.isThrown()) {
            return new VoidUnhandled<TemplateParseException>(renderRes.getException());
        }
        this.setLinkRoot(renderRes.get());
        this.setParsed(true);

        console.timeEnd('parseNode');
        return new VoidUnhandled<TemplateParseException>();
    }

    private parseNode(element: ChildNode): Unhandled<TemplateParseException, Renderable> {
        if (element.nodeType == 3) {
            return new Unhandled<TemplateParseException, Renderable>(new Text(element.nodeValue));
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
                    let renderedRes: Unhandled<TemplateParseException, Renderable> = this.parseNode(nodeList[i]);
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
                                = this.parseAnnotations(lastText.getText(), <Tag>rendered);
                            if (parseRes.isThrown()) {
                                parseRes.reset();
                                return parseRes;
                            }
                            rendered = parseRes.get();
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
                    if (Template.hasAttribute(attributes, htmlElement.attributes[i].nodeName)) {
                        continue;
                    }
                    attributes.push(new Attribute(htmlElement.attributes[i].nodeName, htmlElement.attributes[i].nodeValue));
                }
            }
        }
        return new Unhandled<TemplateParseException, Renderable>(new Tag(tagName, children, attributes));
    }

    private static hasAttribute(attributes: Attribute[], name: string): boolean {
        for (let a of attributes) {
            if (a.getName() === name) {
                return true;
            }
        }
        return false;
    }

    private parseAnnotations(text: string, tag: Renderable): Unhandled<TemplateParseException, Renderable> {
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
                    let annotation: Annotation = type.newInstance(expression, tag);
                    let parseRes: VoidUnhandled<TemplateParseException> = annotation.parse();
                    if (parseRes.isThrown()) {
                        return new Unhandled<TemplateParseException, Renderable>(parseRes.get());
                    }
                    tag = annotation;
                    break;
                }
            }
        }
        return new Unhandled<TemplateParseException, Renderable>(tag);
    }

    isParsed(): boolean {
        return this.parsed;
    }

    public render(scope: Scope): Unhandled<TemplateRenderException, Node> {
        return this.getLinkRoot().render(scope);
    }

    private static parseHtml(html: string): ChildNode {
        if (Runtime.isNodeJS()) {
            return Template.parseHtmlNodeJS(html);
        }
        return Template.parseHtmlBrowser(html);
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