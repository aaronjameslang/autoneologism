const R = require('ramda')

const generateUniqueWord = require('./src/generate').generateUniqueWord
const digestWord = require('./src/digest').digestWord

module.exports = {
  generateMemoirFromWords: generateMemoirFromWords,
  generateWordsFromMemoir: generateWordsFromMemoir
}

function generateMemoirFromWords (wordsIn, linkLength) {
  linkLength = linkLength || 3
  let memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, linkLength, word)
  })
  return memoir
}

function generateWordsFromMemoir (memoir, number, wordsToExclude, random) {
  random = random || Math.random
  if (!wordsToExclude.has) wordsToExclude = new Set(wordsToExclude)
  const wordsOut = R.times(() => {
    const word = generateUniqueWord(memoir, random, wordsToExclude)
    wordsToExclude.add(word)
    return word
  }, number)
  return wordsOut
}
