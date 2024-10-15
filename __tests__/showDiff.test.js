import showDiff from '../src/showDiff';
import showDiffExpected from '../__fixtures__/showDiff.js';

test('showDiff', () => {
  expect(showDiff('/Users/ax/Desktop/2 project/frontend-project-46/file1.json', '/Users/ax/Desktop/2 project/frontend-project-46/file2.json')).toEqual(showDiffExpected);
});
