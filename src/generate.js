const [START, END] = require('./constants')
const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateWordsFromMemoir: generateWordsFromMemoir,
  _calculateNextLetter: calculateNextLetter,
  _generateWord: generateWord
}

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

function generateWord (memoir, linkLength, random) {
  let word = ''
  let letter = ''
  while (letter !== END) {
    word += letter
    letter = calculateNextLetter(word, memoir, linkLength, random())
  }
  return word
}

function calculateNextLetter (wordSoFar, memoir, linkLength, index) {
  const link = wordSoFar.slice(-linkLength + 1).split('')
  while (link.length < linkLength - 1) {
    link.unshift(START)
  }
  const memoirLeaf = findSubmemoir(memoir, link, 0, linkLength - 1)
  return findLetterInMemoirLeaf(memoirLeaf, index)
}

function findLetterInMemoirLeaf (memoirLeaf, index) {
  const total = memoirLeaf[memoirLeaf.length - 2]
  index *= total
  for (var i = 0; index >= memoirLeaf[i]; i += 2) {}
  const letter = memoirLeaf[i + 1]
  return letter
}
