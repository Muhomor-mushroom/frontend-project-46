const fs = require('node:fs');
const path = require('node:path'); 
const { cwd } = require('node:process');


const parsing = (filepath) => {
    const currentDir = cwd();
    return(fs.readFileSync(filepath));
}
console.log(parsing())