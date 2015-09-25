require('lazy-ass');
var check = require('check-more-types');
var describeIt = require('describe-it');
var _ = require('lodash');

var filename = __dirname + '/../index.js';

describeIt(filename, 'headerText(text)', function (codeExtract) {
  var headerText;
  beforeEach(function () {
    headerText = codeExtract();
    la(check.fn(headerText));
  });

  it('extracts just the title', function () {
    var text = headerText('## bar');
    la(text === 'bar', 'could not get bar', text);
  });

  it('works with 3rd level', function () {
    var text = headerText('### foo bar - baz');
    la(text === 'foo bar - baz', 'could not get text', text);
  });
});

describeIt(filename, 'replaceSection(tokens, heading, newText)', function (codeExtract) {
  var tokens, replaceSection;
  var newText = 'new text';

  beforeEach(function () {
    replaceSection = codeExtract();
    la(check.fn(replaceSection));
    tokens = [
      { type: 'heading', depth: 1, text: 'title' },
      { type: 'paragraph', text: 'some text' },
      { type: 'heading', depth: 2, text: 'foo' },
      { type: 'paragraph', text: 'this is foo' },
      { type: 'heading', depth: 2, text: 'bar' },
      { type: 'paragraph', text: 'this is bar' },
    ];
  });

  function hasNewText(tokenList) {
    return _.findIndex(tokenList, {text: newText}) !== -1;
  }

  beforeEach(function () {
    la(!hasNewText(tokens));
  });

  it('replaces middle section with given heading', function () {
    var heading = 'foo';
    var replaced = replaceSection(tokens, heading, newText);
    la(check.array(replaced), 'returns an array');
    la(hasNewText(replaced), 'has updated tokens', replaced);
  });

  it('replaces last section with given heading', function () {
    var heading = 'bar';
    var replaced = replaceSection(tokens, heading, newText);
    la(check.array(replaced), 'returns an array');
    la(hasNewText(replaced), 'has updated tokens', replaced);
  });

});
