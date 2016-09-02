const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateWordsFromMemoir: generateWordsFromMemoir,
  calculateNextLetter: calculateNextLetter,
  generateWord: generateWord,
  generateUniqueWord: generateUniqueWord
}

function generateWordsFromMemoir (memoir, linkLength, maxNumberOfWords, wordsToExclude, random, maxNumberOfAttempts) {
  random = random || Math.random
  maxNumberOfAttempts = maxNumberOfAttempts || maxNumberOfWords * 100
  if (!wordsToExclude.has) wordsToExclude = new Set(wordsToExclude)
  const wordsOut = []
  let numberOfAttempts = 0
  while (wordsOut.length < maxNumberOfWords && numberOfAttempts < maxNumberOfAttempts) {
    const word = generateUniqueWord(memoir, linkLength, random, wordsToExclude)
    numberOfAttempts += 1
    wordsOut.push(word)
    wordsToExclude.add(word)
  }
  return wordsOut
}

function calculateNextLetter (wordSoFar, memoir, linkLength, random) {
  if (typeof wordSoFar !== 'string') throw new Error()
  if (wordSoFar.length > 100) throw new Error()
  const link = wordSoFar.slice(-linkLength + 1).split('')
  while (link.length < linkLength - 1) {
    link.unshift('START')
  }
  const submemoir = findSubmemoir(memoir, link)
  return findLetterInSubmemoir(submemoir, random)
}

/**
 * @param memoir
 * @param random
 * @param previousWords Set
 */
function generateUniqueWord (memoir, linkLength, random, previousWords) {
  let word = ''
  let counter = 100
  do {
    word = generateWord(memoir, linkLength, random)
    counter -= 1
  } while (counter && previousWords.has(word))
  return counter && word || null
}

function generateWord (memoir, linkLength, random) {
  var word = ''
  var letter = ''
  while (letter !== 'END') {
    word += letter
    letter = calculateNextLetter(word, memoir, linkLength, random())
  }
  return word
}

function findLetterInSubmemoir (submemoir, random) {
  const total = submemoir[submemoir.length - 1][1]
  const index = random * total
  let letter = null
  for (let i = 0; i <= submemoir.length; i += 1) {
    if (index < submemoir[i][1]) {
      letter = submemoir[i][0]
      break
    }
  }
  return letter
}
