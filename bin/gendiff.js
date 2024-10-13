#!/usr/bin/env node
const { program } = require('commander');
const { path } = require('node:path');
const fs = require('node:fs');

program
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-v, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((file1,file2) => {
        console.log('hello, World!');
    })
    
    program.parse();

const options = program.opts();
console.log(options); 