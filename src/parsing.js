import yaml from 'js-yaml';
import path from 'node:path';

const extensionOfFile = (file) => {
  const extname = path.extname(file);
  return extname;
};

const parsing = (filepath, readedFile) => {
  if (extensionOfFile(filepath) === 'json') {
    const parsedFile = JSON.parse(readedFile);
    return parsedFile;
  }

  const yamlInJson = yaml.load(readedFile);
  return yamlInJson;
};
export default parsing;
