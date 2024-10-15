import parsing from "./parsing.js";
import _ from "lodash";

const jsonInArray = (json) => {
    const entries = Object.entries(json)
    let result = [];
    for (let [key, value] of entries) {
        result = [...result, `${key} = ${value}`]
    }
    return result;
}

const showDiff = (firstFilePath, secondFilePath) => {
    const firstParsedFile = parsing(firstFilePath);
    const secondParsedFile = parsing(secondFilePath);

    const firstParsedInArr = jsonInArray(firstParsedFile).sort();
    const secondParsedInArr = jsonInArray(secondParsedFile).sort();

    const difference = _.difference(firstParsedInArr, secondParsedInArr)

    let result = {};

for (let key in firstParsedInArr) {
    if (secondParsedInArr.includes(key)) {
        const splittedKey = key.split(' ');
        console.log(splittedKey);
        result.splicedKey[0] = splittedKey[2];
    }
}

    
    console.log(result);
}

export default showDiff;