(function(win, doc, module, define) {

'use strict'

var OBJ = {}

// Angus Croll's article on "Fixing the JavaScript typeof operator"
function getType(obj) {
  /*
  'myString' == string
  window == window (instead of object)
  [] == array (instead of object)
  {} == object
  Array == function
  Object == function
  new Date() == date (instead of object)
  new Error() == error (instead of object)
  /a-z/ == regexp (instead of object)
  null == null (instead of object)
  JSON == json (instead of object)
  navigator == navigator (instead of object)
  screen == screen (instead of object)
  history == history (instead of object)
  location == location (instead of object)
  document == htmldocument (instead of object)
  console == console (instead of object)
  console.memory == memoryinfo (instead of object)
  Element == function
  Date == function
  NodeList == function
  Attr == function
  NaN == number
  true|false == boolean
  RegExp == function
  Infinity == number
  arguments == arguments (instead of object)
  document.createElement('style') == htmlstyleelement (instead of object)
  */

  var o = (OBJ).toString.call(obj), // do NOT use Object instead of ({})
      m = o.match(/\s([a-zA-Z]+)/)

  return m[1].toLowerCase()
}

function get(elem) {
  return (is.string(elem)) ? doc.getElementById(elem) : elem
}

var is = {
  defined : function (param) {
    return (getType(param) !== 'undefined')
  },

  object : function (param) {
    return (getType(param) === 'object')
  },

  array : function (param) {
    return (getType(param) === 'array')
  },

  string : function (param) {
    return (getType(param) === 'string')
  },

  number : function (param) {
    return (getType(param) === 'number')
  },

  integer : function (param) {
    return (this.number(param) && param % 1 === 0)
  },

  float : function (param) {
    return (this.number(param) && param % 1 !== 0)
  },

  boolean : function (param) {
    return (getType(param) === 'boolean')
  },

  'null' : function (param) {
    return (param === null)
  },

  element : function (param) {
    return (param instanceof HTMLElement)
  },

  'function' : function (param) {
    return (getType(param) === 'function')
  },

  arrayLike : function (param) {
    return (
      this.array(param) ||
      ( ! this.function(param) && this.prop(param, 'length'))
    )
  },

  // TODO: crossbrowser indexOf?
  // container can be String or Array
  contains : function (container, search, start) {
    if (container.includes) {
        return container.includes(search, start)
    }

    // no ES6 includes
    var len = container.length

    start = this.num(start) ? start : 0

    if (start + search.length > len) {
      return false
    }

    return container.indexOf(search, start) !== -1
  },

  // Properties are defined by DOM.
  property : function (elem, prop) {
    elem = get(elem)

    return elem.hasOwnProperty(prop)
  },

  // Attributes are defined by HTML
  attribute : function (elem, attr) {
    elem = get(elem)

    return elem.hasAttribute(attr)
  },

  type : function (param, type) {
    return getType(param) === type
  },

  functionExists : function (f) {
    f = (this.str(f)) ? win[f] : f

    return this.func(f)
  },

  same : function (param1, param2) {
    return getType(param1) === getType(param2)
  },

  equals : function (param1, param2) {
    // TODO: http://www.w3schools.com/jsref/jsref_type_conversion.asp

    return param1 == param2
  },

  numeric : function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  },

  // wrapper for global isNaN
  'nan' : function (n) {
    // TODO: NaN | Nan | nan ?
    return isNaN(n) // because NaN != NaN
  },

  // wrapper for global isFinite
  finite : function (n) {
    return isFinite(n)
  },

  falsy : function (bool) {
    /*
    0 == false (instead of true)
    '' == false (instead of true)
    ' ' == false (instead of true)
    undefined == false (instead of true)
    */

    return this.boolean(bool) && bool === false
  },

  truthy : function (bool) {
    /*
    1 == false (instead of true)
    "0" == false (instead of true)
    "1" == false (instead of true)
    Infinity == false (instead of true)
    [] == false (instead of true)
    */

    return this.boolean(bool) && bool === true
  }

  // TODO:
  // empty (array, object, string, element)
  // length (array, object, string)
  // JSON - parse, try-catch
}

// aliases / shortcuts
is.def  = is.defined
is.str  = is.string
is.arr  = is.array
is.obj  = is.object
is.attr = is.attribute
is.prop = is.property
is.el   = is.elem = is.element
is.int  = is.integer
is.num  = is.number
is.bool = is.boolean
is.func = is.function // don't add is.fn!
is.eq   = is.equals
is.a    = is.type
is.includes = is.contains // just for ES6

// ------ ADVANCED IS ------
// For advanced usage: is('asdf').str()

var MAGIC_STR = 'wb\_k8E9(VE/]ar.',
    invest    = MAGIC_STR

function advancedIs () {
  invest = arguments[0]

  return advancedIs
}

for (var funcName in is) {
  var func = is[funcName]

  addApi(funcName, func)
}

function addApi (funcName, func) {
  advancedIs[funcName] = function () {
    if (invest === MAGIC_STR) {
      return func.apply(is, arguments)
    }

    var args = Array.prototype.slice.call(arguments)

    args.unshift(invest)

    var result = func.apply(is, args)

    invest = MAGIC_STR

    return result
  }
}

// ------ EXPORT ------

// support CommonJs
if (is.def(module) && module.exports) {
  module.exports = advancedIs
}
// support RequireJs / AMD
else if (is.def(define) && is.obj(define.amd)) {
  define(advancedIs)
}
// support browser
else {
  win.is = advancedIs
}

})
(
  typeof window   !== 'undefined' ? window   : {},
  typeof document !== 'undefined' ? document : {},
  typeof module   !== 'undefined' ? module   : undefined,
  typeof define   !== 'undefined' ? define   : undefined
);
