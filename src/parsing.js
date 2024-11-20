import yaml from 'js-yaml';
import path from 'node:path';

const extensionOfFile = (file) => {
  const extname = path.extname(file);
  return extname;
};

const parsing = (filepath, readedFile) => {
  switch (extensionOfFile(filepath)) {
    case '.json': {
      const parsedFile = JSON.parse(readedFile);
      return parsedFile;
    }
    case '.yml': {
      const yamlInJson = yaml.load(readedFile);
      return yamlInJson;
    }
    default: {
      return null;
    }
  }
};
export default parsing;
