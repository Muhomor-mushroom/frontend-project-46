import _ from 'lodash';
import * as fs from 'fs';
import parsing from './parsing.js';

const showDiff = (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
  const secondFile = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

  const firstParsedFile = parsing(firstFilePath, firstFile);
  const secondParsedFile = parsing(secondFilePath, secondFile);

  const keysOfFirstFiles = Object.keys(firstParsedFile);
  const keysOfSecondFiles = Object.keys(secondParsedFile);

let keysOfAllFiles = []

  keysOfFirstFiles.forEach((key) => keysOfAllFiles.push(key));
  keysOfSecondFiles.forEach((key) => keysOfAllFiles.push(key));

  keysOfAllFiles = _.uniq(keysOfAllFiles);

   const searchDiffOfKeys = keysOfAllFiles.map((key) => {
    if (firstParsedFile[key] == secondParsedFile[key]) {
      return `  ${key}: ${firstParsedFile[key]}\n`;}
    if (!keysOfFirstFiles.includes(key) && keysOfSecondFiles.includes(key)) {
      return `+ ${key}: ${secondParsedFile[key]}\n`;
    }
    if (keysOfFirstFiles.includes(key) && !keysOfSecondFiles.includes(key)) {
      return `- ${key}: ${firstParsedFile[key]}\n`;
    }
    return `- ${key}: ${firstParsedFile[key]}\n+ ${key}: ${secondParsedFile[key]}\n`;
  });

  console.log(`{\n${searchDiffOfKeys.join('')}}`);
};
export default showDiff;
