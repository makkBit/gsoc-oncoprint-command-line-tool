#!/usr/bin/env node

/**********************************************************************
    Entry point of the app, includes all necessary configurations
**********************************************************************/


// light-weight, expressive, and powerful command-line framework for node.js.
const program = require('commander');


const main = require('./src/main');
main(program);


