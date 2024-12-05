import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (array) => {
  const iter = (arr, depth = '') => {
    const result = arr.map((object) => {
      switch (object.type) {
        case 'added':
          return `Property '${depth}${object.key}' was added with value: ${stringify(object.value)}\n`;

        case 'removed':
          return `Property '${depth}${object.key}' was removed\n`;

        case 'nested':
          return `${iter(object.children, `${depth}${object.key}.`)}`;

        case 'changed':
          return `Property '${depth}${object.key}' was updated. From ${stringify(object.oldValue)} to ${stringify(object.newValue)}\n`;

        case 'unchanged':
          return null;

        default:
          throw new Error('Error');
      }
    });
    return result.join('');
  };
  return `${iter(array).slice(0, -1)}`;
};
export default plain;
