const test = require('tape')

const calculateNextLetter = require('../src/generate')._calculateNextLetter
const generateWord = require('../src/generate')._generateWord

const memoir = require('./characterisation/dig-dog-dot-dug/memoir-processed-3')

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
    'calculateNextLetter ' + JSON.stringify([fixture.word, fixture.random, fixture.expectedLetter]),
    t => {
      const actualLetter = calculateNextLetter(fixture.word, memoir, 3, fixture.random)
      t.equal(actualLetter, fixture.expectedLetter)
      t.end()
    }
  )
})
