import _ from 'lodash';
import * as fs from 'fs';
import parsing from './parsing.js';

const showDiff = (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
  const secndFile = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

  const firstParsedFile = parsing(firstFile);
  const secondParsedFile = parsing(secndFile);

  const keysOfFirstFiles = Object.keys(firstParsedFile);
  const keysOfSecondFiles = Object.keys(secondParsedFile);

  const keysOfAllFiles = _.uniq(keysOfFirstFiles, keysOfSecondFiles);

  const searchDiffOfKeys = keysOfAllFiles.map((key) => {
    if (!keysOfFirstFiles.includes(key)) {
      return `+ ${key}: ${secondParsedFile[key]}\n`;
    }
    if (keysOfSecondFiles.includes(key)) {
      return `- ${key}: ${firstParsedFile[key]}\n`;
    }
    if (firstParsedFile[key] === secondParsedFile[key]) {
      return `  ${key}: ${firstParsedFile[key]}\n`;
    }
    return `- ${key}: ${firstParsedFile[key]}\n+ ${key}: ${secondParsedFile[key]}\n`;
  });

  console.log(`{\n${searchDiffOfKeys.join('')}}`);
};
export default showDiff;
