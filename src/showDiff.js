import _ from 'lodash';
import * as fs from 'fs';
import parsing from './parsing.js';

const showDiff = (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
  const secondFile = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

  const firstParsedFile = parsing(firstFilePath, firstFile);
  const secondParsedFile = parsing(secondFilePath, secondFile);

  const searchDiffOfKeys = (firstFile, secondFile, depth = 1) => {
    const keysOfFirstFiles = Object.keys(firstFile);
    const keysOfSecondFiles = Object.keys(secondFile);

    let keysOfAllFiles = [...keysOfFirstFiles, keysOfSecondFiles];

    keysOfAllFiles = _.uniq(keysOfAllFiles);

    console.log(keysOfAllFiles);

    const diff = keysOfAllFiles.map((key) => {
      if (!_.isObject(firstFile[key]) && !_.isObject(secondFile[key])) {
        if (firstFile[key] === secondFile[key]) {
          return `${' '.repeat(depth)} ${key}: ${firstFile[key]}\n`;
        }
        if (!keysOfFirstFiles.includes(key) && keysOfSecondFiles.includes(key)) {
          return `${' '.repeat(depth)}+ ${key}: ${secondFile[key]}\n`;
        }
        if (keysOfFirstFiles.includes(key) && !keysOfSecondFiles.includes(key)) {
          return `${' '.repeat(depth)}- ${key}: ${firstFile[key]}\;`
        }
        return `${' '.repeat(depth)}- ${key}: ${firstFile[key]}\n${' '.repeat(depth)}+ ${key}: ${secondFile[key]}\n`
      }
      searchDiffOfKeys(firstFile[key], secondFile[key], depth + 1)
    })
    return diff;
  };
  const result = searchDiffOfKeys(firstParsedFile, secondParsedFile);
  console.log(`{\n${result.join('')}}`);
};
export default showDiff;
