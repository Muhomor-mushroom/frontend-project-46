import path from 'node:path';
import { cwd } from 'node:process';
import showDiff from '../src/showDiff.js';
import showDiffExpected from '../__fixtures__/showDiffExpected.js';

test('showDiffJsons', () => {
  const myCWD = cwd();
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.json'), path.resolve(myCWD, '__fixtures__/file2.json'));
  expect(result).toEqual(showDiffExpected());
});
test('ShowDiffYamls', () => {
  const myCWD = cwd()
  const result = showDiff(path.resolve(myCWD, '__fixtures__/file1.yml'), path.resolve(myCWD, '__fixtures__/file2.yml'));
  expect(result).toEqual(showDiffExpected())
})
