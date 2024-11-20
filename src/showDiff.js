import _ from 'lodash';
import * as fs from 'fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parsing from './parsing.js';
import formatter from './formatter.js';

const treeOfFiles = (file1, file2) => {
  const firstKeys = Object.keys(file1);
  const secondKeys = Object.keys(file2);
  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!firstKeys.includes(key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (!secondKeys.includes(key)) {
      return { key, value: file1[key], type: 'removed' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, children: treeOfFiles(file1[key], file2[key]), type: 'nested' };
    }
    if (file1[key] === file2[key]) {
      return { key, value: file1[key], type: 'unchanged' };
    }
    return {
      key, oldValue: file1[key], newValue: file2[key], type: 'changed',
    };
  });
};

const showDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const myCWD = cwd();
  const file1Path = path.resolve(`${myCWD}`, `${firstFilePath}`);
  const file2Path = path.resolve(`${myCWD}`, `${secondFilePath}`);

  const firstFile = fs.readFileSync(file1Path, { encoding: 'utf8' });
  const secondFile = fs.readFileSync(file2Path, { encoding: 'utf8' });

  const firstParsedFile = parsing(file1Path, firstFile);
  const secondParsedFile = parsing(file2Path, secondFile);

  console.log(secondParsedFile);

  const resultedArr = treeOfFiles(firstParsedFile, secondParsedFile);
  return formatter(resultedArr, format);
};
export default showDiff;
