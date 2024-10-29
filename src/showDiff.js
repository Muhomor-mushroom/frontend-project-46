import _ from 'lodash';
import * as fs from 'fs';
import parsing from './parsing.js';

const showDiff = (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
  const secondFile = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

  const firstParsedFile = parsing(firstFilePath, firstFile);
  const secondParsedFile = parsing(secondFilePath, secondFile);

  const searchDiffOfKeys = (file1, file2, depth = 1) => {
    const keysOfFirstFiles = Object.keys(file1);
    const keysOfSecondFiles = Object.keys(file2);
    const spacesCount = 4;
    const spaces = ' '.repeat((spacesCount * depth) - 2);
    
    let keysOfAllFiles = _.union(keysOfFirstFiles, keysOfSecondFiles).sort();
    const diff = keysOfAllFiles.map((key) => {
      if (!keysOfFirstFiles.includes(key)) {
          return `${spaces}+ ${key}: ${file2[key]}`;
        }
        if (!keysOfSecondFiles.includes(key)) {
          return `${spaces}- ${key}: ${file1[key]}`;
        }
        if (_.isObject(file1[key]) && _.isObject(file2[key])) {
          return `${spaces}  ${key}: {\n${searchDiffOfKeys(file1[key], file2[key], depth + 1)}\n${spaces}  }`
        }
        if (file1[key] === file2[key]) {
          return `${spaces}  ${key}: ${file1[key]}`;
        }
        return `${spaces}- ${key}: ${file1[key]}${spaces}\n${spaces}+ ${key}: ${file2[key]}`
    })
    return diff.join('\n');
  };
  const result = searchDiffOfKeys(firstParsedFile, secondParsedFile);
  console.log(`{\n${result}\n}`);
};
export default showDiff;
