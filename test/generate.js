let test = require('tape')
let calculateArrayOfPotentialLetters = require('../src/generate').calculateArrayOfPotentialLetters
let generateNextLetterFromArray = require('../src/generate').generateNextLetterFromArray

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
