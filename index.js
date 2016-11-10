const generateMemoirFromWords = require('./src/digest').generateMemoirFromWords
const processMemoir = require('./src/process').processMemoir
const generateWordsFromMemoir = require('./src/generate').generateWordsFromMemoir

function generateWords (wordsIn, linkLength, maxNumberOfWords, wordsToExclude, random, maxNumberOfAttempts) {
  linkLength = linkLength || 3
  wordsToExclude = wordsToExclude || wordsIn
  const memoir = generateMemoirFromWords(wordsIn, linkLength)
  const processedMemoir = processMemoir(memoir)
  const wordsOut = generateWordsFromMemoir(processedMemoir, linkLength, maxNumberOfWords, wordsToExclude, random, maxNumberOfAttempts)
  return wordsOut
}

module.exports = {
  generateMemoirFromWords: require('./src/digest').generateMemoirFromWords,
  processMemoir: require('./src/process').processMemoir,
  generateWordsFromMemoir: require('./src/generate').generateWordsFromMemoir,
  generateWords: generateWords
}
