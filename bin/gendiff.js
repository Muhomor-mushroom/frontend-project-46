#!/usr/bin/env node
import { program } from 'commander';
import path from 'node:path';
import { cwd } from 'node:process';
import showDiff from '../src/showDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>, <filepath2>')
  .option('-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const myCWD = cwd();
    const opts = program.opts();
    console.log(`first path is ${filepath1}, second path is ${filepath2}`);
    showDiff(path.resolve(`${myCWD}`, `${filepath1}`), path.resolve(`${myCWD}`, `${filepath2}`), opts.format);
  });

program.parse();
