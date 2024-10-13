#!/usr/bin/env node
const { program } = require('commander');

program
    .description('Compares two configuration files and shows a difference.')

program
    .argument('<filepath1>')
    .argument('<filepath1>')
program
    .option('-v, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    
    program.parse();

const options = program.opts();
console.log(options);