import * as fs from 'fs';

const parsing = (filepath) => {
  const parsedFile = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
  return parsedFile;
};
export default parsing;
