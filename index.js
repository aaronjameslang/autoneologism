const R = require('ramda')

const generateUniqueWord = require('./src/generate').generateUniqueWord
const digestWord = require('./src/digest').digestWord

module.exports = {
  generateMemoirFromWords: generateMemoirFromWords,
  generateWordsFromMemoir: generateWordsFromMemoir
}

function generateMemoirFromWords (wordsIn, linkLength) {
  let memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, linkLength, word)
  })
  return memoir
}

function generateWordsFromMemoir (memoir, linkLength, numberOrWords, wordsToExclude, random) {
  random = random || Math.random
  if (!wordsToExclude.has) wordsToExclude = new Set(wordsToExclude)
  const wordsOut = R.times(() => {
    const word = generateUniqueWord(memoir, linkLength, random, wordsToExclude)
    wordsToExclude.add(word)
    return word
  }, numberOrWords)
  return wordsOut
}
