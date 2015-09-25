var log = require('debug')('um');
require('lazy-ass');
var check = require('check-more-types');
var read = require('fs').readFileSync;
var write = require('fs').writeFileSync;
var _ = require('lodash');

var marked = require('marked');
var mdRenderer = require('marked-to-md');
var renderer = mdRenderer(new marked.Renderer());
var parser = new marked.Parser({renderer: renderer});

// '## bar' -> 'bar'
function headerText(text) {
  la(check.unemptyString(text), 'missing text', text);
  var tokens = marked.lexer(text);
  la(tokens.length, 'missing tokens', tokens, 'from', text);
  return tokens[0].text;
}

// returns indices, both could be -1 or the end could be -1
function findSection(tokens, heading) {
  var text = headerText(heading);
  la(check.unemptyString(text), 'could not extract text from heading', heading);

  var headerIndex = _.findIndex(tokens, {type: 'heading', text: text});
  if (headerIndex === -1) {
    throw new Error('Could not find header text ' + heading);
  }
  var stopIndex = _.findIndex(tokens.slice(headerIndex + 1), {type: 'heading'});
  if (stopIndex !== -1) {
    stopIndex = headerIndex + 1 + stopIndex;
  }
  log('replacing section %s between indices %d to %d', heading, headerIndex, stopIndex);

  return {
    from: headerIndex + 1,
    to: stopIndex
  };
}

function hasStart(indices) {
  return indices.from !== -1;
}

function hasNoEnd(indices) {
  return indices.to === -1;
}

function updateTokens(tokens, newText, indices) {
  la(check.object(indices), 'missing indices');
  la(hasStart(indices), 'no start index', indices);

  // TODO preserve links, are we loosing them?

  var newTokens = marked.lexer(newText);
  if (hasNoEnd(indices)) {
    tokens.splice(indices.from, tokens.length);
    return tokens.concat(newTokens);
  } else {
    la(indices.to >= indices.from, 'invalid indices', indices);
    tokens.splice.apply(tokens,
      [indices.from, indices.to - indices.from].concat(newTokens));
  }

  return tokens;
}

function replaceSection(tokens, heading, newText) {
  la(check.unemptyString(newText), 'missing new text');

  var indices = findSection(tokens, heading);
  la(check.object(indices), 'could not find section', heading);
  return updateTokens(tokens, newText, indices);
}

function updatedContent(options) {

  la(check.unemptyString(options.filename), 'missing filename', options);
  var text = read(options.filename, 'utf-8');
  la(check.unemptyString(text), 'empty text in file', options.filename, text);

  var tokens = marked.lexer(text);
  log('read file %s and split into %d markdown tokens',
    options.filename, tokens.length);

  console.log(tokens);

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
