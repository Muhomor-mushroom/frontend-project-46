import * as fs from 'fs';
import { cwd } from 'node:process';


const parsing = (filepath1, filepath2) => {
    const currentDir = cwd();
    console.log(JSON.parse(fs.readFileSync(filepath1, { encoding: 'utf8'})));
    console.log(JSON.parse(fs.readFileSync(filepath2, { encoding: 'utf8'})));
}
export default parsing