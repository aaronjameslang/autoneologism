const R = require('ramda')

const generateWord = require('./src/generate').generateWord
const digestWord = require('./src/digest').digestWord

module.exports = {
  generateWordsInFromText: generateWordsInFromText,
  generateMemoirFromWords: generateMemoirFromWords,
  generateWordsFromMemoir: generateWordsFromMemoir
}

function generateWordsInFromText (text) {
  let words = text.toLowerCase().split(/[^a-z'-]/).filter(word => !!word)
  words = R.uniq(words)
  return words
}

function generateMemoirFromWords (wordsIn) {
  let memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, word)
  })
  return memoir
}

function generateWordsFromMemoir (memoir, number, random) {
  random = random || Math.random
  let wordsOut = []
  for (const i of Array(number).keys()) {
    const word = generateWord(memoir, random)
    wordsOut.push(word)
  }
  return wordsOut
}
