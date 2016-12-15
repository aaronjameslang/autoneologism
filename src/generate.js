const [START, END] = require('./constants')
const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateWordsFromMemoir: generateWordsFromMemoir,
  _calculateNextLetter: calculateNextLetter,
  _generateWord: generateWord
}

/**
 * Generate words from a memoir describing what the output should look like
 *
 * @param {{}} Memoir, an object describing what the output words should be like
 * @param {int} linkLength The link length used to generate the memoir
 * @param {int} [maxNumberOfWords] The number of words to output, generation may stop before this if maxNumberOfAttempts is reached, 100 by default
 * @param {string[]} wordsToExclude Words to include from the output, can be empty
 * @param {function} [random] Function returning ints between 0 and 1, default is Math.random
 * @param {int} [maxNumberOfAttempts] Maximum number of attempts, an attempt fails if it generates a word in wordsToExclude, default is 100*maxNumberOfWords
 * @return {{attempts: int, efficiency: float, words: string[]}}
 */
function generateWordsFromMemoir (memoir, linkLength, maxNumberOfWords, wordsToExclude, random, maxNumberOfAttempts) {
  maxNumberOfWords = maxNumberOfWords || 100
  random = random || Math.random
  maxNumberOfAttempts = maxNumberOfAttempts || maxNumberOfWords * 100
  if (!wordsToExclude.has) wordsToExclude = new Set(wordsToExclude)

  const wordsOut = []
  let numberOfAttempts = 0

  while (wordsOut.length < maxNumberOfWords && numberOfAttempts < maxNumberOfAttempts) {
    const word = generateWord(memoir, linkLength, random)
    numberOfAttempts += 1

    if (!wordsToExclude.has(word)) {
      wordsOut.push(word)
      wordsToExclude.add(word)
    }
  }

  return {
    attempts: numberOfAttempts,
    efficiency: wordsOut.length / numberOfAttempts,
    words: wordsOut
  }
}

/**
 * Generate a word from a memoir
 *
 * @param {{}} Memoir, an object describing what the output words should be like
 * @param {int} linkLength The link length used to generate the memoir
 * @param {function} random Function returning ints between 0 and 1
 */
function generateWord (memoir, linkLength, random) {
  let word = ''
  let letter = ''
  while (letter !== END) {
    word += letter
    letter = calculateNextLetter(word, memoir, linkLength, random())
  }
  return word
}

/**
 * Generate the next letter in the word, based on the memoir and the letters generated so far
 *
 * @param {string} wordSoFar The begining of the word, as much as has been built so far
 * @param {{}} memoir The memoir describing the options for the next letter
 * @param {int} linkLength The linkLength used to generate the memoir
 * @param {int} index A nuber between 0 and 1, used to select which letter to choose
 */
function calculateNextLetter (wordSoFar, memoir, linkLength, index) {
  const link = wordSoFar.slice(-linkLength + 1).split('')
  while (link.length < linkLength - 1) {
    link.unshift(START)
  }
  const memoirLeaf = findSubmemoir(memoir, link, 0, linkLength - 1)
  return findLetterInMemoirLeaf(memoirLeaf, index)
}

/**
 * Navigate the memoir leaf, and return the letter at index
 *
 * @param {array} memoirLeaf An array of letter probabilites
 * @param {int} index The value used to select a letter from the options
 */
function findLetterInMemoirLeaf (memoirLeaf, index) {
  const total = memoirLeaf[memoirLeaf.length - 2]
  index *= total
  for (var i = 0; index >= memoirLeaf[i]; i += 2) {}
  const letter = memoirLeaf[i + 1]
  return letter
}
