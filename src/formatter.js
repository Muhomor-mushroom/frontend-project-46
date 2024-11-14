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

const plain = (array) => {
  const iter = (arr, depth = '') => {
    const result = arr.map((object) => {
      switch (object.type) {
        case 'added': {
          return `Property '${depth}${object.key}' was added with value: ${stringify(object.value)}\n`;
        }
        case 'removed': {
          return `Property '${depth}${object.key}' was removed\n`;
        }
        case 'nested': {
          return `${iter(object.children, `${depth}${object.key}.`)}`;
        }
        case 'changed': {
          return `Property '${depth}${object.key}' was updated. From ${stringify(object.oldValue)} to ${stringify(object.newValue)}\n`;
        }
        default:
          return null
      }
    });
    const finalResult = result.join('');
    return finalResult;
  };
  return `${iter(array).slice(0, -1)}`;
};

const formatter = (array, format = 'stylish') => {
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
