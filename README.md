# is
Simple and tiny (2k) IS helpers based on Angus Croll's article on "Fixing the JavaScript typeof operator".

## Build your own
git clone git@github.com:ramoryan/is.git
npm install --save-dev (recommended: yarn --dev)
gulp build

After that you can find your new favourite, minyfied helper lib in the /dest folder.

### API
- defined | def
- object | obj
- array | arr
- string | str
- number | num
- integer | int
- float
- boolean | bool
- null
- element | el | elem
- function | func
- arrayLike
- contains | includes
- property | prop
- attribute | attr
- type | a
- functionExists
- same
- equals | eq
- numeric
- nan
- finite
- falsy
- truthy

### Usage
```html
<script src="myvendors/is.js"></script>
```

Basic:
```js
is.str('myString') // true
is.arr([]) // true
is.int('12345') // false
is.obj([ 1, 2, 3 ]) // false
is.contains('myString', 'Str') // true
is.contains('abcdefgh', 'efgh', 4) // true
```

Advanced:
```js
is('myString').str() // true
is([]).arr() // true
is([]).a('array') // true
is(0).falsy() // false
is(1).bool() // false
```