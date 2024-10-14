#!/usr/bin/env node
import { program } from 'commander';
import parsing from '../src/parsing.js';

program
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-v, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((parsing('/Users/ax/Desktop/2 project/frontend-project-46/file1.json', '/Users/ax/Desktop/2 project/frontend-project-46/file2.json')))
    
    program.parse();

const options = program.opts();
console.log(options); 