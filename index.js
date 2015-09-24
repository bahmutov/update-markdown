var log = require('debug')('um');
require('lazy-ass');
var check = require('check-more-types');
var read = require('fs').readFileSync;
var write = require('fs').writeFileSync;

function updatedContent(options) {
  la(check.unemptyString(options.filename), 'missing filename', options);
  var text = read(options.filename);
  return text;
}

function updateMarkdown(options) {
  options = options || {};
  la(check.unemptyString(options.filename), 'missing filename', options);
  var updatedText = updatedContent(options);
  log('writing updatedText markdown to %s', options.filename);
  write(options.filename, updatedText);
  return updatedText;
}

module.exports = updateMarkdown;
