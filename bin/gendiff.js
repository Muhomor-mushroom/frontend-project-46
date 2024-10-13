#!/usr/bin/env node
const { program } = require('commander');

program
    .description('Compares two configuration files and shows a difference.')

program
    .option('-v, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information')
    
    program.parse();

const options = program.opts();
console.log(options);