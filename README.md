# update-markdown
> Updates part of existing markdown document

[![update-markdown-icon](https://nodei.co/npm/update-markdown.png?downloads=true)](https://nodei.co/npm/update-markdown.png?downloads=true)

[![Build status](https://travis-ci.org/bahmutov/update-markdown.svg?branch=master) ](https://travis-ci.org/bahmutov/update-markdown)
[![dependencies](https://david-dm.org/bahmutov/update-markdown.svg) ](https://david-dm.org/bahmutov/update-markdown)
[![devdependencies](https://david-dm.org/bahmutov/update-markdown/dev-status.svg) ](https://david-dm.org/bahmutov/update-markdown#info=devDependencies)

## install and use

```
npm install -g update-markdown
```
If a file `filename.md` exists with the following contents

```
# title
some text
## foo
this is foo
## bar
this is bar
```
and another file `new.md` with new text for section `## foo` we can replace it using

```
cat new.md | um filename.md "## foo"
```
updating the `filename.md` to have

```
# title
some text
## foo
<content from new.md>
## bar
this is bar
```
You can also specify new content from another markdown file, same command as above will be

```
um filename.md "## foo" new.md
```
Want to see it in action? Check out the list of 3rd party modules below - we are generating it using
the [modules-used](https://github.com/bahmutov/modules-used) tool in build script in the [package.json](package.json).

```json
"scripts": {
  "3rd-party": "modules-used | um README.md '### 3rd party modules'"
}
```

### 3rd party modules

- [bluebird](https://github.com/petkaantonov/bluebird) - Full featured Promises/A+ implementation with exceptionally good performance
- [check-more-types](https://github.com/kensho/check-more-types) - Large collection of predicates
- [debug](https://github.com/visionmedia/debug) - small debugging utility
- [get-stdin-promise](https://github.com/metaraine/get-stdin-promise) - Return stdin as a promise
- [lazy-ass](https://github.com/bahmutov/lazy-ass) - Lazy assertions without performance penalty
- [lodash](https://lodash.com/) - The modern build of lodash modular utilities.
- [marked](https://github.com/chjj/marked) - A markdown parser built for speed
- [marked-to-md](https://github.com/partageit/marked-to-md) - Markdown renderer for marked

### Small print
Author: Gleb Bahmutov &copy; 2015


- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](http://glebbahmutov.com)
- [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don&#39;t blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/update-markdown/issues) on Github

## MIT License
Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the &quot;Software&quot;), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

