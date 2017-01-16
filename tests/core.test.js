var is = (typeof require !== 'undefined') ? require('../src/core.js') : is

// defined
describe('defined', () => {
  it('undefined == false', () => {
    expect(is.defined(undefined)).toBeFalsy()
  })

  it('"undefined" == true', () => {
    expect(is.defined('undefined')).toBeTruthy()
  })

  it('12345 == true', () => {
    expect(is.defined(12345)).toBeTruthy()
  })
})

// object
describe('object', () => {
  it('[] == false', () => {
    expect(is.object([])).toBeFalsy()
  })

  it('{} == true', () => {
    expect(is.object({})).toBeTruthy()
  })
})

// array
describe('array', () => {
  it('[] == true', () => {
    expect(is.array([])).toBeTruthy()
  })

  it('{} == false', () => {
    expect(is.array({})).toBeFalsy()
  })
})

// string
describe('string', () => {
  it('"myTestString" == true', () => {
    expect(is.string('myTestString')).toBeTruthy()
  })

  it('12345 == false', () => {
    expect(is.string(12345)).toBeFalsy()
  })

  it('"12345" == true', () => {
    expect(is.string('12345')).toBeTruthy()
  })
})

// number
describe('number', () => {
  it('Infinite == true', () => {
    expect(is.number(Number.POSITIVE_INFINITY)).toBeTruthy()
  })

  it('"12345" == false', () => {
    expect(is.number('12345')).toBeFalsy()
  })

  it('12345 == true', () => {
    expect(is.number(12345)).toBeTruthy()
  })

  it('1234.5 == true', () => {
    expect(is.number(1234.5)).toBeTruthy()
  })

  it('Infinite == true', () => {
    expect(is.number(Number.POSITIVE_INFINITY)).toBeTruthy()
  })

  it('-Infinite == true', () => {
    expect(is.number(Number.NEGATIVE_INFINITY)).toBeTruthy()
  })

  it('MAX_VALUE == false', () => {
    expect(is.number(Number.MAX_VALUE)).toBeTruthy()
  })

  it('MIN_VALUE == false', () => {
    expect(is.number(Number.MIN_VALUE)).toBeTruthy()
  })

  it('Infinity == true', () => {
    expect(is.number(Infinity)).toBeTruthy()
  })

  it('NaN == true', () => {
    expect(is.number(NaN)).toBeTruthy()
  })
})

// integer
describe('integer', () => {
  it('"12345" == false', () => {
    expect(is.integer('12345')).toBeFalsy()
  })

  it('12345 == true', () => {
    expect(is.integer(12345)).toBeTruthy()
  })

  it('1234.56 == false', () => {
    expect(is.integer(1234.56)).toBeFalsy()
  })

  it('-12340 == true', () => {
    expect(is.integer(-12340)).toBeTruthy()
  })

  it('Infinite == false', () => {
    expect(is.integer(Number.POSITIVE_INFINITY)).toBeFalsy()
  })

  it('Infinity == false', () => {
    expect(is.integer(Infinity)).toBeFalsy()
  })
})

// float
describe('float', () => {
  it('"12345" == false', () => {
    expect(is.float('12345')).toBeFalsy()
  })

  it('12345 == false', () => {
    expect(is.float(12345)).toBeFalsy()
  })

  it('1234.56 == true', () => {
    expect(is.float(1234.56)).toBeTruthy()
  })
})

// boolean
describe('boolean', () => {
  it('"true" == false', () => {
    expect(is.boolean('true')).toBeFalsy()
  })

  it('0 == false', () => {
    expect(is.boolean(0)).toBeFalsy()
  })

  it('false == true', () => {
    expect(is.boolean(false)).toBeTruthy()
  })

  it('true == true', () => {
    expect(is.bool(true)).toBeTruthy()
  })
})

// null
describe('null', () => {
  it('null == true', () => {
    expect(is.null(null)).toBeTruthy()
  })

  it('0 == false', () => {
    expect(is.null(0)).toBeFalsy()
  })

  it('NaN == false', () => {
    expect(is.null(NaN)).toBeFalsy()
  })
})

// function
describe('function', () => {
  it('is.function == true', () => {
    expect(is.function(is.function)).toBeTruthy()
  })

  it('Anonym function == true', () => {
    expect(is.function( () => {} )).toBeTruthy()
  })
})

// arrayLike
describe('arrayLike', () => {
  it('arguments == true', function () { // do NOT use arrow func here!
    expect(is.arrayLike(arguments)).toBeTruthy()
  })

  it('[] == true', () => {
    expect(is.arrayLike([])).toBeTruthy()
  })

  it('{} == false', () => {
    expect(is.arrayLike({})).toBeFalsy()
  })
})

// contains
describe('contains', () => {
    var str = 'abcdefgh'

    it('str contains "abcd"', () => {
      expect(is.contains(str, 'abcd')).toBeTruthy()
    })

    it('str NOT contains "xxxx"', () => {
      expect(is.contains(str, 'xxxx')).toBeFalsy()
    })

    it('str contains "efgh"', () => {
      expect(is.contains(str, 'efgh')).toBeTruthy()
    })

    it('str contains "efgh" when uses start at position 4', () => {
      expect(is.contains(str, 'efgh', 4)).toBeTruthy()
    })

    it('str NOT contains "efgh" when uses start at position 6', () => {
      expect(is.contains(str, 'efgh', 6)).toBeFalsy()
    })
})

describe('type', () => {
  it('"myString" == string', () => {
    expect(is.type("myString", 'string')).toBeTruthy()
  })

  it('1234 == number', () => {
    expect(is.type(1234, 'number')).toBeTruthy()
  })

  it('{} == object', () => {
    expect(is.type({}, 'object')).toBeTruthy()
  })

  it('[] == true', () => {
    expect(is.a([], 'array')).toBeTruthy()
  })

  it('null == null', () => {
    expect(is.a(null, 'null')).toBeTruthy()
  })

  it('undefined == undefined', () => {
    expect(is.a(undefined, 'undefined')).toBeTruthy()
  })

  if (typeof window !== 'undefined') {
    it('window == window', () => {
      expect(is.a(window, 'window')).toBeTruthy()
    })
  }

  it('Math == math', () => {
    expect(is.a(Math, 'math')).toBeTruthy()
  })

  it('String == function', () => {
    expect(is.a(String, 'function')).toBeTruthy()
  })

  it('Number == function', () => {
    expect(is.a(Number, 'function')).toBeTruthy()
  })

  it('Date == function', () => {
    expect(is.a(Date, 'function')).toBeTruthy()
  })

  it('new Date() == date', () => {
    expect(is.a(new Date(), 'date')).toBeTruthy()
  })

  it('new Error() == error', () => {
    expect(is.a(new Error(), 'error')).toBeTruthy()
  })

  it('Array == function', () => {
    expect(is.a(Array, 'function')).toBeTruthy()
  })

  it('Object == function', () => {
    expect(is.a(Object, 'function')).toBeTruthy()
  })

  it('Infinity == number', () => {
    expect(is.a(Infinity, 'number')).toBeTruthy()
  })

  it('RegExp == function', () => {
    expect(is.a(RegExp, 'function')).toBeTruthy()
  })

  it('NaN == number', () => {
    expect(is.a(NaN, 'number')).toBeTruthy()
  })

  if (typeof navigator !== 'undefined') {
    it('navigator == navigator', () => {
      expect(is.type(navigator, 'navigator')).toBeTruthy()
    })
  }

  if (typeof screen !== 'undefined') {
    it('screen == screen', () => {
      expect(is.type(screen, 'screen')).toBeTruthy()
    })
  }

  if (typeof history !== 'undefined') {
    it('history == history', () => {
      expect(is.type(history, 'history')).toBeTruthy()
    })
  }

  if (typeof location !== 'undefined') {
    it('location == location', () => {
      expect(is.type(location, 'location')).toBeTruthy()
    })
  }

  if (typeof document !== 'undefined') {
    it('document == htmldocument', () => {
      expect(is.type(document, 'htmldocument')).toBeTruthy()
    })
  }

  if (typeof console !== 'undefined') {
    /*it('console == console', function() {
      expect(is.type(console, 'console')).toBeTruthy()
    })*/

    /*it('console.memory == memoryinfo', () => {
      expect(is.type(console.memory, 'memoryinfo')).toBeTruthy()
    })*/
  }

  if (typeof Element !== 'undefined') {
    it('Element == function', () => {
      expect(is.type(Element, 'function')).toBeTruthy()
    })
  }

  if (typeof NodeList !== 'undefined') {
    it('NodeList == function', () => {
      expect(is.type(NodeList, 'function')).toBeTruthy()
    })
  }

  if (typeof Attr !== 'undefined') {
    it('Attr == function', () => {
      expect(is.type(Attr, 'function')).toBeTruthy()
    })
  }

  it('arguments == arguments', function () {
    expect(is.type(arguments, 'arguments')).toBeTruthy()
  })

  it('JSON == json', () => {
    expect(is.type(JSON, 'json')).toBeTruthy()
  })

  if (typeof document !== 'undefined') {
    it('document.createElement("style") == htmlstyleelement', () => {
      expect(is.type(document.createElement('style'), 'htmlstyleelement')).toBeTruthy()
    })
  }
})

describe('functionExists', () => {

})

describe('same', () => {
  it('1234 == 1234 == true', () => {
    expect(is.same(1234, 1234)).toBeTruthy()
  })

  it('1234 == "1234" == false', () => {
    expect(is.same(1234, '1234')).toBeFalsy()
  })

  it('null == {} == false', () => {
    expect(is.same({}, null)).toBeFalsy()
  })
})

describe('equals', () => {
  it('1234 == 1234 == true', () => {
    expect(is.equals(1234, 1234)).toBeTruthy()
  })

  it('1234 == "1234" == true', () => {
    expect(is.equals(1234, '1234')).toBeTruthy()
  })

  it('0 == null == false', () => {
    expect(is.eq(0, null)).toBeFalsy()
  })
})

describe('numeric', () => {
  it('"1234" == true', () => {
    expect(is.numeric('1234')).toBeTruthy()
  })

  it('1234 == true', () => {
    expect(is.numeric(1234)).toBeTruthy()
  })

  it('Infinite == false', () => {
    expect(is.numeric(Number.POSITIVE_INFINITY)).toBeFalsy()
  })

  it('Infinity == false', () => {
    expect(is.numeric(Infinity)).toBeFalsy()
  })

  it('-Infinite == false', () => {
    expect(is.numeric(Number.NEGATIVE_INFINITY)).toBeFalsy()
  })

  it('MAX_VALUE == true', () => {
    expect(is.numeric(Number.MAX_VALUE)).toBeTruthy()
  })

  it('MIN_VALUE == true', () => {
    expect(is.numeric(Number.MIN_VALUE)).toBeTruthy()
  })

  it('Math.PI == true', () => {
    expect(is.numeric(Math.PI)).toBeTruthy()
  })
})

describe('NaN', () => {
  it('NaN == true', () => {
    expect(is.nan(NaN)).toBeTruthy()
  })
})

describe('falsy', () => {
  it('false == true', () => {
    expect(is.falsy(false)).toBeTruthy()
  })

  it('"false" == false', () => {
    expect(is.falsy("false")).toBeFalsy()
  })

  it('0 == false', () => {
    expect(is.falsy(0)).toBeFalsy()
  })
})

describe('truthy', () => {
  it('true == true', () => {
    expect(is.truthy(true)).toBeTruthy()
  })

  it('"true" == false', () => {
    expect(is.truthy("true")).toBeFalsy()
  })

  it('1 == false', () => {
    expect(is.truthy(1)).toBeFalsy()
  })
})