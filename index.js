const generateMemoirFromWords = require('./src/digest').generateMemoirFromWords
const processMemoir = require('./src/process').processMemoir
const generateWordsFromMemoir = require('./src/generate').generateWordsFromMemoir

/**
 * Generate words like the words passed in
 *
 * @param {string[]} wordsIn Words to base the output on
 * @param {int} linkLength Minimum 2, larger numbers will make the output more closely match the input
 * @param {int} maxNumberOfWords The number of words to output, generation may stop before this if maxNumberOfAttempts is reached
 * @param {string[]} [wordsToExclude] Words to include from the output, can be empty, default is wordsIn
 * @param {function} [random] Function returning ints between 0 and 1, default is Math.random
 * @param {int} [maxNumberOfAttempts] Maximum number of attempts, an attempt fails if it generates a word in wordsToExclude, default is 100*maxNumberOfWords
 * @return {{attempts: int, efficiency: float, words: string[]}}
 */
function generateWords (wordsIn, linkLength, maxNumberOfWords, wordsToExclude, random, maxNumberOfAttempts) {
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
