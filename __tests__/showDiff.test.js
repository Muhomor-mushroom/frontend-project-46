import path from 'node:path';
import { cwd } from 'node:process';
import showDiff from '../src/showDiff.js';
import showDiffExpected from '../__fixtures__/showDiffExpected.js';
import showDiffPlainExpected from '../__fixtures__/showDiffPlainExpected.js';
import showDiffJsonExpected from '../__fixtures__/showDiffJsonExpected.js';

const myCWD = cwd();

test('showDiffJsons', () => {
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.json'), path.resolve(myCWD, '__fixtures__/file2.json'));
  expect(result).toEqual(showDiffExpected());
});
test('ShowDiffYamls', () => {
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.yml'), path.resolve(myCWD, '__fixtures__/file2.yml'));
  expect(result).toEqual(showDiffExpected());
});
test('ShowDiffPlainJson', () => {
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.json'), path.resolve(myCWD, '__fixtures__/file2.json'), 'plain');
  expect(result).toEqual(showDiffPlainExpected());
});
test('ShowDiffPlainYamls', () => {
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.yml'), path.resolve(myCWD, '__fixtures__/file2.yml'), 'plain');
  expect(result).toEqual(showDiffPlainExpected());
});
test('ShowDiffJsonInJson', () => {
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.json'), path.resolve(myCWD, '__fixtures__/file2.json'), 'json');
  expect(result).toEqual(showDiffJsonExpected());
});
test('ShowDiffPlainYamlsInJson', () => {
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.yml'), path.resolve(myCWD, '__fixtures__/file2.yml'), 'json');
  expect(result).toEqual(showDiffJsonExpected());
});
