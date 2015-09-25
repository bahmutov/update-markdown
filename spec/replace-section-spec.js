require('lazy-ass');
var check = require('check-more-types');
var describeIt = require('describe-it');

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

describeIt(filename, 'replaceSection(tokens, heading)', function (codeExtract) {
  var tokens = [
    { type: 'heading', depth: 1, text: 'title' },
    { type: 'paragraph', text: 'some text' },
    { type: 'heading', depth: 2, text: 'foo' },
    { type: 'paragraph', text: 'this is foo' },
    { type: 'heading', depth: 2, text: 'bar' },
    { type: 'paragraph', text: 'this is bar' },
  ];

  var replaceSection;

  beforeEach(function () {
    replaceSection = codeExtract();
    la(check.fn(replaceSection));
  });

  it('replaces last section with given heading', function () {
    var heading = 'bar';
    var replaced = replaceSection(tokens, heading);
    la(check.array(replaced), 'returns an array');
  });

});
