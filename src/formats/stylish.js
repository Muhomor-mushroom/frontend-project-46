import _ from 'lodash';

const disClose = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const startSpaces = ' '.repeat((4 * (depth + 1)) - 2);
  const endSpaces = ' '.repeat(4 * depth - 2);
  const keys = Object.keys(value);
  const result = keys.map((key) => `${startSpaces}  ${key}: ${disClose(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${endSpaces}  }`;
};

const stylish = (array) => {
  const iter = (arr, depth = 1) => {
    const spaces = ' '.repeat((4 * depth) - 2);
    const result = arr.map((object) => {
      switch (object.type) {
        case 'added': {
          return `${spaces}+ ${object.key}: ${disClose(object.value, depth)}`;
        }
        case 'removed': {
          return `${spaces}- ${object.key}: ${disClose(object.value, depth)}`;
        }
        case 'nested': {
          return `${spaces}  ${object.key}: {\n${iter(object.children, depth + 1)}\n${spaces}  }`;
        }
        case 'unchanged': {
          return `${spaces}  ${object.key}: ${disClose(object.value, depth)}`;
        }
        case 'changed': {
          return `${spaces}- ${object.key}: ${disClose(object.oldValue, depth)}\n${spaces}+ ${object.key}: ${disClose(object.newValue, depth)}`;
        }
        default: {
          throw new Error('not the correct type');
        }
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(array)}\n}`;
};
export default stylish;
