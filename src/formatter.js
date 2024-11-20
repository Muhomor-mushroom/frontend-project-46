import stylish from './formats/stylish.js';
import plain from './formats/plain.js';

const formatter = (array, format) => {
  switch (format) {
    case 'stylish': {
      return stylish(array);
    }
    case 'plain': {
      return plain(array);
    }
    case 'json':
      return JSON.stringify(array);
    default:
      throw new Error('invalid format');
  }
};
export default formatter;
