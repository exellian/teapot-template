import * as fs from "fs";
import TemplateParseException from './org/teapot/exception/TemplateParseException';
import TeapotTemplate from './org/teapot/template/TeapotTemplate';
import Unhandled from './org/teapot/util/Unhandled';

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
        let t: Unhandled<TemplateParseException, TeapotTemplate> = TeapotTemplate.parse(fs.readFileSync(file).toString());

        console.time('parse');

        console.timeEnd('parse');
    }
}
