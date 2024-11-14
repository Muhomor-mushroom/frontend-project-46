import _ from 'lodash';
import * as fs from 'fs';
import parsing from './parsing.js';
import formatter from './formatter.js';

const searchDiffOfKeys = (file1, file2) => {
  const keysOfFirstFiles = Object.keys(file1);
  const keysOfSecondFiles = Object.keys(file2);
  const keysOfAllFiles = _.union(keysOfFirstFiles, keysOfSecondFiles);
  const sortedKeys = _.sortBy(keysOfAllFiles);
  const diff = sortedKeys.map((keys) => {
    if (!keysOfFirstFiles.includes(keys)) {
      return { key: keys, value: file2[keys], type: 'added' };
    }
    if (!keysOfSecondFiles.includes(keys)) {
      return { key: keys, value: file1[keys], type: 'removed' };
    }
    if (_.isObject(file1[keys]) && _.isObject(file2[keys])) {
      return { key: keys, children: searchDiffOfKeys(file1[keys], file2[keys]) };
    }
    if (file1[keys] === file2[keys]) {
      return { key: keys, value: file1[keys], type: 'unchanged' };
    }
    return {
      key: keys, oldValue: file1[keys], type: 'changed', newValue: file2[keys],
    };
  });
  return diff;
};

const showDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstFile = fs.readFileSync(firstFilePath, { encoding: 'utf8' });
  const secondFile = fs.readFileSync(secondFilePath, { encoding: 'utf8' });

  const firstParsedFile = parsing(firstFilePath, firstFile);
  const secondParsedFile = parsing(secondFilePath, secondFile);

  const resultedObj = searchDiffOfKeys(firstParsedFile, secondParsedFile);
  const formattedResult = formatter(resultedObj, format);
  return formattedResult;
};
export default showDiff;
