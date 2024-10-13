import fs from 'node:fs';
import { cwd } from 'node:process';


const parsing = (filepath) => {
    const currentDir = cwd();
    return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8'}));
}
export default parsing