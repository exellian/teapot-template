[![Build Status](https://travis-ci.com/exellian/teapot-template.svg?branch=master)](https://travis-ci.com/exellian/teapot-template) [![![![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/exellian/teapot-template.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/exellian/teapot-template/context:javascript)

# teapot-template
 A template engine with annotation syntax
## Templates
 This example shows how you can create and render a template
 
```typescript

    let html = "<div class='class_@(test)'>" +
                    "@for(int i = 0;i < 10;i++)" +
                    "<div>@(test) @(i)</div>" +
               "</div>";

    let engine: TeapotTemplateEngine = new TeapotTemplateEngine;

    let templateParseResult: Unhandled<TemplateParseException, TeapotTemplate> = engine.parse(html);

    if (templateParseResult.isThrown()) {
        throw templateParseResult.getException();
    }

    let template: TeapotTemplate = templateParseResult.get();
    
    let pack: TeapotTemplatePack = template.pack();

    console.log(JSON.stringify(pack));

    let unpackedTemplate: Unhandled<UnpackException, TeapotTemplate> = engine.fromPack(pack);

    if (unpackedTemplate.isThrown()) {
        throw unpackedTemplate.getException();
    }

    let pack1: TeapotTemplatePack = unpackedTemplate.get().pack();

    console.log("");

    console.log(JSON.stringify(pack1));


```
 
