import _ from 'lodash';
import * as fs from 'fs';
import parsing from './parsing.js';
import formatter from './formatter.js';

const searchDiffOfKeys = (file1, file2) => {
  const firstKeys = Object.keys(file1);
  const secondKeys = Object.keys(file2);
  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(firstKeys, key)) {
      return { key: key, value: file2[key], type: 'added' };
    }
    if (!_.has(secondKeys, key)) {
      return { key: key, value: file1[key], type: 'removed' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key: key, children: searchDiffOfKeys(file1[key], file2[key]), type: 'nested' };
    }
    if (file1[key] === file2[key]) {
      return { key: key, value: file1[key], type: 'unchanged' };
    }
    return { key: key, oldValue: file1[key], type: 'changed', newValue: file2[key] };
  });
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
