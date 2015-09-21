#!/usr/bin/env node

var updateMarkdown = require('..');
var read = require('fs').readFileSync;

function getCliOptions(argv) {
  switch (argv.length) {
    case 2:
      console.error('um <filename.md> <section header>');
      console.error('for example: um some-file.md "## foo"')
      console.error('updates section with title "## foo" inside file "some-filemd"');
      process.exit(-1);
    break;
    case 4:
      return {
        filename: process.argv[2],
        title: process.argv[3]
      };
    break;
    case 5:
      return {
        filename: process.argv[2],
        title: process.argv[3],
        text: read(process.argv[4])
      };
    break;
    default:
      console.error('Do not know how to handle arguments');
      console.error(argv.slice(2));
      process.exit(-1);
  }
}

var options = getCliOptions(process.argv);
updateMarkdown(options);
