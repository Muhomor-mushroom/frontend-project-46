import showDiff from '../src/showDiff.js';
import showDiffExpected from '../__fixtures__/showDiffExpected.js';
import path from 'node:path';
import { cwd } from 'node:process';

test('showDiff', () => {
  const myCWD = cwd();
  const result = showDiff(path.resolve(myCWD, 'file1.json'), path.resolve(myCWD, 'file2.json'));
  expect(result).toBe(showDiffExpected());
});
