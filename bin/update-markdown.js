#!/usr/bin/env node

var log = require('debug')('um');
var Promise = require('bluebird');
var updateMarkdown = require('..');

function getCliOptions(argv) {
  switch (argv.length) {
    case 2:
      console.error('um <filename.md> <section header>');
      console.error('for example: um some-file.md "## foo"')
      console.error('updates section with title "## foo" inside file "some-filemd"');
      process.exit(-1);
    break;
    case 4:
      // text comes from STDIN
      return {
        filename: process.argv[2],
        title: process.argv[3]
      };
    break;
    case 5:
      return {
        filename: process.argv[2],
        title: process.argv[3],
        textFilename: process.argv[4]
      };
    break;
    default:
      console.error('Do not know how to handle arguments');
      console.error(argv.slice(2));
      process.exit(-1);
  }
}

function getNewText(options) {
  var read = require('fs').readFileSync;
  if (!options.text && options.textFilename) {
    log('reading new contents from file %s', options.textFilename);
    return Promise.resolve(read(options.textFilename, 'utf-8'));
  }

  log('reading new contents from STDIN');
  return require('get-stdin-promise');
}

var options = getCliOptions(process.argv);
log('cli options', options);

getNewText(options)
  .then(function (text) {
    options.text = text;
    updateMarkdown(options);
  });
