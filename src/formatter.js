import _ from 'lodash';

const formatter = (array, format = 'stylish') => {
        if (format === 'stylish') {
            const iter = (array, depth = 1) => {
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
    }
}
export default formatter