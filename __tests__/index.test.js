import showDiff from '../src/showDiff';

test('reverse', () => {
  expect(reverse('hello')).toEqual('olleh');
  expect(reverse('')).toEqual('');
});
