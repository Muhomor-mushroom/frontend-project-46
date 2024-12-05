import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormat from './jsonFormat.js';

const formatter = (array, format) => {
  switch (format) {
    case 'stylish': {
      return stylish(array);
    }
    case 'plain': {
      return plain(array);
    }
    case 'json':
      return jsonFormat(array);
    default:
      throw new Error('invalid format');
  }
};
export default formatter;
