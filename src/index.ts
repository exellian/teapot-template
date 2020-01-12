import VoidUnhandled from './org/teapot/util/VoidUnhandled';
import Template from './org/teapot/template/Template';

import * as fs from "fs";
import TemplateParseException from './org/teapot/exception/TemplateParseException';
import Pack from './org/teapot/package/Pack';
import Packer from './org/teapot/package/Packer';

class IO {

    public static listFiles(dir: string): string[] {
        var results: string[] = [];
        var list: string[] = fs.readdirSync(dir);
        for (let key in list) {
            let file: string = list[key];
            file = dir + '/' + file;
            var stat: fs.Stats = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(IO.listFiles(file));
            } else {
                results.push(file);
            }
        }
        return results;
    }
}

let files: string[] = IO.listFiles(__dirname);
for (let key in files) {
    let file = files[key];
    if (file.endsWith(".html")) {
        let t: Template = new Template(fs.readFileSync(file).toString());

        console.time('parse');

        let res: VoidUnhandled<TemplateParseException> = t.parse();



        if (res.isThrown()) {
            throw new Error(res.get().getMessage());
        }

        console.log(Packer.toJSON(t));

        console.timeEnd('parse');
    }
}
