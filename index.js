var log = require('debug')('um');
var la = require('lazy-ass');
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

function isHeading(token) {
  return token && token.type === 'heading';
}

// returns indices, both could be -1 or the end could be -1
function findSection(tokens, heading) {
  var text = headerText(heading);
  la(check.unemptyString(text), 'could not extract text from heading', heading);

  var headerIndex = _.findIndex(tokens, {type: 'heading', text: text});
  if (headerIndex === -1) {
    throw new Error('Could not find header text ' + heading);
  }
  var stopIndex = _.findIndex(tokens.slice(headerIndex + 1), isHeading);
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

  var newTokens = marked.lexer(newText);
  var links = _.assign({}, tokens.links, newTokens.links);

  if (hasNoEnd(indices)) {
    tokens.splice(indices.from, tokens.length);
    tokens = tokens.concat(newTokens);
  } else {
    la(indices.to >= indices.from, 'invalid indices', indices);
    tokens.splice.apply(tokens,
      [indices.from, indices.to - indices.from].concat(newTokens));
  }
  tokens.links = links;

  return tokens;
}

function replaceSection(tokens, heading, newText) {
  la(check.unemptyString(newText), 'missing new text');

  var indices = findSection(tokens, heading);
  la(check.object(indices), 'could not find section', heading);
  return updateTokens(tokens, newText, indices);
}

function updateMarkdownWith(title, markdownText, replacement) {
  la(check.unemptyString(title), 'missing section title');
  la(check.unemptyString(markdownText), 'missing markdown text');
  la(check.unemptyString(replacement), 'missing replacement text', replacement);

  var tokens = marked.lexer(markdownText);
  log('split source markdown into %d tokens', tokens.length);

  var updatedTokens = replaceSection(tokens, title, replacement);
  la(check.array(updatedTokens), 'could not update tokens', updatedTokens);

  var updatedText = parser.parse(updatedTokens);
  return updatedText;
}

function updatedContent(options) {

  la(check.unemptyString(options.filename), 'missing filename', options);
  var text = read(options.filename, 'utf-8');
  la(check.unemptyString(text), 'empty text in file', options.filename, text);
  log('read file %s', options.filename);

  var updatedText = updateMarkdownWith(options.title, text, options.text);
  return updatedText;
}

function updateMarkdown(options) {
  log('update markdown options', options);
  la(check.object(options), 'missing options', options);

  var updatedText = updatedContent(options);
  log('writing updatedText markdown to %s', options.filename);

  write(options.filename, updatedText);
  return updatedText;
}

module.exports = updateMarkdown;
