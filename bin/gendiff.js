#!/usr/bin/env node
import { program } from 'commander';
import showDiff from '../src/showDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>, <filepath2>')
  .option('-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const opts = program.opts();
    console.log(showDiff(filepath1, filepath2, opts.format));
  });

program.parse();
