import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const disClose = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const spacesCount = 4;
  const startSpaces = ' '.repeat((spacesCount * (depth + 1)) - 2);
  const endSpaces = ' '.repeat(spacesCount * depth - 2);
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    return `${startSpaces}  ${key}: ${disClose(value[key], depth + 1)}`
  })
  return `{\n${result.join('\n')}\n${endSpaces}  }`;
}

const formatter = (array, format = 'stylish') => {
  let iter;
  switch (format) {
    case 'stylish':
      iter = (arr, depth = 1) => {
        const spacesCount = 4;
        const spaces = ' '.repeat((spacesCount * depth) - 2);
        const result = arr.map((object) => {
          if (object.type === 'added') {
            return `${spaces}+ ${object.key}: ${disClose(object.value, depth)}`;
          }
          if (object.type === 'removed') {
            return `${spaces}- ${object.key}: ${disClose(object.value, depth)}`;
          }
          if (_.has(object, 'children')) {
            return `${spaces}  ${object.key}: {\n${iter(object.children, depth + 1)}\n${spaces}  }`;
          }
          if (object.type === 'unchanged') {
            return `${spaces}  ${object.key}: ${disClose(object.value, depth)}`;
          }
          return `${spaces}- ${object.key}: ${disClose(object.oldValue, depth)}\n${spaces}+ ${object.key}: ${disClose(object.newValue, depth)}`;
        });
        return result.join('\n');
      };
      return `{\n${iter(array)}\n}`;

    case 'plain':
      iter = (arr, depth = '') => {
        const result = arr.map((object) => {
          if (object.type === 'added') {
            return `Property '${depth}${object.key}' was added with value: ${stringify(object.value)}\n`;
          }
          if (object.type === 'removed') {
            return `Property '${depth}${object.key}' was removed\n`;
          }
          if (_.has(object, 'children')) {
            return `${iter(object.children, `${depth}${object.key}.`)}`;
          }
          if (object.type === 'changed') {
            return `Property '${depth}${object.key}' was updated. From ${stringify(object.oldValue)} to ${stringify(object.newValue)}\n`;
          }
          return null;
        });
        let finalResult = result.join('');
        return finalResult.slice(0, -1);
      };
      return `${iter(array)}`;
    case 'json':
      return JSON.stringify(array);
    default:
      throw new Error('invalid format');
  }
};
export default formatter;
