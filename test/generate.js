let test = require('tape')
let calculateArrayOfPotentialLetters = require('../src/generate').calculateArrayOfPotentialLetters
let generateNextLetterFromArray = require('../src/generate').generateNextLetterFromArray
let generateNextLetter = require('../src/generate').generateNextLetter
let generateWord = require('../src/generate').generateWord

var memoir = {
  'START': {
    'START': {
      'd': 4
    },
    'd': {
      'o': 2,
      'i': 1,
      'u': 1
    }
  },
  'd': {
    'o': {
      'g': 1,
      't': 1
    },
    'i': {
      'g': 1
    },
    'u': {
      'g': 1
    }
  },
  'o': {
    'g': {
      'END': 1
    },
    't': {
      'END': 1
    }
  },
  'i': {
    'g': {
      'END': 1
    }
  },
  'u': {
    'g': {
      'END': 1
    }
  }
}

test('generateWord', function (t) {
  [
    {
      random: [0, 0, 0, 0],
      expectedWord: 'dog'
    },
    {
      random: [0, 0, 0.5, 0],
      expectedWord: 'dot'
    },
    {
      random: [0, 0.5, 0, 0],
      expectedWord: 'dig'
    },
    {
      random: [0, 0.5, 0.99, 0],
      expectedWord: 'dig'
    },
    {
      random: [0.99, 0.5, 0.99, 0],
      expectedWord: 'dig'
    }
  ].forEach(function (fixture) {
    t.test(
      'should correctly generate ' + JSON.stringify([fixture.expectedWord, fixture.random]),
      function (t) {
        var actualWord = generateWord(memoir, function () {
          return fixture.random.shift()
        })
        t.equal(actualWord, fixture.expectedWord)
        t.end()
      }
    )
  })
})

test('generateNextLetter', function (t) {
  [
    {
      word: '',
      random: 0,
      expectedLetter: 'd'
    },
    {
      word: '',
      random: 0.99,
      expectedLetter: 'd'
    },
    {
      word: 'd',
      random: 0.2,
      expectedLetter: 'o'
    },
    {
      word: 'd',
      random: 0.4,
      expectedLetter: 'o'
    },
    {
      word: 'd',
      random: 0.6,
      expectedLetter: 'i'
    }, {
      word: 'd',
      random: 0.8,
      expectedLetter: 'u'
    },
    {
      word: 'do',
      random: 0.49,
      expectedLetter: 'g'
    },
    {
      word: 'do',
      random: 0.5,
      expectedLetter: 't'
    },
    {
      word: 'dig',
      random: 0,
      expectedLetter: 'END'
    },
    {
      word: 'dig',
      random: 0.99,
      expectedLetter: 'END'
    }
  ].forEach(function (fixture) {
    t.test(
      'should correctly calculate ' + JSON.stringify([fixture.word, fixture.random, fixture.expectedLetter]),
      function (t) {
        var actualLetter = generateNextLetter(fixture.word, memoir, function () {
          return fixture.random
        })
        t.equal(actualLetter, fixture.expectedLetter)
        t.end()
      }
    )
  })
})

test('calculateArrayOfPotentialLetters', function (t) {
  [
    {
      submemoir: {'t': 1, 'g': 3},
      expectedArray: ['t', 'g', 'g', 'g']
    }
  ].forEach(function (fixture) {
    t.test(
      'should correctly calculate ' + JSON.stringify(fixture.submemoir),
      function (t) {
        var actualArray = calculateArrayOfPotentialLetters(fixture.submemoir)
        t.deepEqual(actualArray, fixture.expectedArray)
        t.end()
      }
    )
  })
})

test('generateNextLetterFromArray', function (t) {
  [
    {
      array: ['a', 'b', 'c', 'd'],
      random: 0,
      expectedLetter: 'a'
    },
    {
      array: ['a', 'b', 'c', 'd'],
      random: 0.24,
      expectedLetter: 'a'
    },
    {
      array: ['a', 'b', 'c', 'd'],
      random: 0.25,
      expectedLetter: 'b'
    },
    {
      array: ['a', 'b', 'c', 'd'],
      random: 0.49,
      expectedLetter: 'b'
    },
    {
      array: ['a', 'b', 'c', 'd'],
      random: 0.5,
      expectedLetter: 'c'
    },
    {
      array: ['a', 'b', 'd', 'd'],
      random: 0.75,
      expectedLetter: 'd'
    },
    {
      array: ['a', 'b', 'c', 'd'],
      random: 0.99,
      expectedLetter: 'd'
    }
  ].forEach(function (fixture) {
    t.test(
      'should correctly generate next letter ' + JSON.stringify(fixture.array) + ' ' + fixture.random,
      function (t) {
        function random () {
          return fixture.random
        }
        var actualLetter = generateNextLetterFromArray(fixture.array, random)
        t.equal(actualLetter, fixture.expectedLetter)
        t.end()
      }
    )
  })
})