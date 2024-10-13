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
    .action((filepath1,filepath2) => {
        console.log(parsing(filepath1));
        console.log(parsing(filepath2));
    })
    
    program.parse();

const options = program.opts();
console.log(options); 