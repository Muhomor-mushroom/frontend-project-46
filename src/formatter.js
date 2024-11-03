import _ from 'lodash';

const formatter = (array, format = 'stylish') => {
    let iter;    
    switch (format) {
            case 'stylish':
                iter = (array, depth = 1) => {
                    const spacesCount = 4;
                    const spaces = ' '.repeat((spacesCount * depth) - 2);
                    const result = array.map((object) => {
                    if (object.type === 'added') {
                        return `${spaces}+ ${object.key}: ${object.value}`;
                    };
                    if (object.type === 'removed') {
                        return `${spaces}- ${object.key}: ${object.value}`;
                    };
                    if (_.has(object, 'children')) {
                        return `${spaces}  ${object.key}: {\n${iter(object.children, depth + 1)}\n${spaces}  }`;
                    }
                    if (object.type === 'unchanged') {
                        return `${spaces}  ${object.key}: ${object.value}`;
                    }
                    return `${spaces}- ${object.key}: ${object.oldValue}${spaces}\n${spaces}+ ${object.key}: ${object.newValue}`;
                })
                return result.join('\n');
                }
                return `{\n${iter(array)}\n}`;
                break;
            
            case 'plain':
                iter = (array) => {
                    const result = array.map((object) => {
                    if (object.type === 'added') {
                        return `Property '${object.key}' was added with value: ${object.value}`;
                    };
                    if (object.type === 'removed') {
                        return `Property '${object.key}' was removed`;
                    };
                    if (_.has(object, 'children')) {
                        return `Property '${object.key}.${iter(object.children)}'`;
                    }
                    if (object.type === 'changed') {
                        return `Property '${object.key}' was updated. From '${object.oldValue}' to '${object.newValue}'`
                    }
                })
                return result.join('\n');
                }
                return `${iter(array)}`;
                break;
    }
}
export default formatter