const test = require('tape')
const fs = require('fs')
const path = require('path')

const calculateArrayOfPotentialLetters = require('../src/generate').calculateArrayOfPotentialLetters
const generateNextLetterFromArray = require('../src/generate').generateNextLetterFromArray
const generateNextLetter = require('../src/generate').generateNextLetter
const generateWord = require('../src/generate').generateWord

const memoir = JSON.parse(String(fs.readFileSync(path.join(__dirname, '/characterisation/dig-dog-dot-dug/memoir.json'))))

;[
  {
    random: [0, 0.49, 0, 0],
    expectedWord: 'dog'
  },
  {
    random: [0, 0.49, 0.5, 0],
    expectedWord: 'dot'
  },
  {
    random: [0, 0, 0, 0],
    expectedWord: 'dig'
  },
  {
    random: [0, 0, 0.99, 0],
    expectedWord: 'dig'
  },
  {
    random: [0.99, 0, 0.99, 0],
    expectedWord: 'dig'
  }
].forEach(fixture => {
  test.test(
    'generateWord ' + JSON.stringify([fixture.expectedWord, fixture.random]),
    t => {
      const actualWord = generateWord(memoir, 3, () => fixture.random.shift())
      t.equal(actualWord, fixture.expectedWord)
      t.end()
    }
  )
})

;[
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
    expectedLetter: 'i'
  },
  {
    word: 'd',
    random: 0.4,
    expectedLetter: 'o'
  },
  {
    word: 'd',
    random: 0.6,
    expectedLetter: 'o'
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
].forEach(fixture => {
  test.test(
    'generateNextLetter ' + JSON.stringify([fixture.word, fixture.random, fixture.expectedLetter]),
    t => {
      var actualLetter = generateNextLetter(fixture.word, memoir, 3, () => fixture.random)
      t.equal(actualLetter, fixture.expectedLetter)
      t.end()
    }
  )
})

;[
  {
    submemoir: {'t': 1, 'g': 3},
    expectedArray: ['t', 'g', 'g', 'g']
  }
].forEach(fixture => {
  test.test(
    'calculateArrayOfPotentialLetters ' + JSON.stringify(fixture.submemoir),
    t => {
      var actualArray = calculateArrayOfPotentialLetters(fixture.submemoir)
      t.deepEqual(actualArray, fixture.expectedArray)
      t.end()
    }
  )
})

;[
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
].forEach(fixture => {
  test.test(
    'generateNextLetterFromArray ' + JSON.stringify(fixture.array) + ' ' + fixture.random,
    t => {
      var actualLetter = generateNextLetterFromArray(fixture.array, () => fixture.random)
      t.equal(actualLetter, fixture.expectedLetter)
      t.end()
    }
  )
})
