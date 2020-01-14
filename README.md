# teapot-template
 A template engine with annotation syntax
## Templates
 This example shows how you can create and render a template
 
```typescript

let template: Template = new Template("<div>" +
                                        "@for(int i = 0;i < 10;i++)" + 
                                        "<div>@(test) @(i)</div>" +
                                      "</div>");

let exception: VoidUnhandled<TemplateParseException> = template.parse();

if (exception.isThrown()) {
 throw new Error(exception.get().getMessage());
}

let viewObject: ObjectField = new ObjectField();

viewObject.setLinkField("test", new PrimitiveField("Hallo Welt!"));

let view: View = new View(viewObject);

let element: Node = template.render(view);

document.getElementById("root").innerHTML = "";
document.getElementById("root").appendChild(element);


```
 
