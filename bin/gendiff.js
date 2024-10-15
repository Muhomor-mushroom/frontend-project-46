#!/usr/bin/env node
import { program } from 'commander';
import showDiff from '../src/showDiff.js';
import path from 'node:path'
import { cwd } from 'node:process'

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>', '<filepath2>')
  .option('-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((showDiff(path.resolve(filepath1), path.resolve(filepath2))));

program.parse();

const options = program.opts();
console.log(options);
