const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateWordsFromMemoir: generateWordsFromMemoir,
  calculateNextLetter: calculateNextLetter,
  generateWord: generateWord
}

function generateWordsFromMemoir (memoir, linkLength, maxNumberOfWords, wordsToExclude, random, maxNumberOfAttempts) {
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

function calculateNextLetter (wordSoFar, memoir, linkLength, random) {
  const link = wordSoFar.slice(-linkLength + 1).split('')
  while (link.length < linkLength - 1) {
    link.unshift('START')
  }
  const submemoir = findSubmemoir(memoir, link, 0, linkLength - 1)
  return findLetterInSubmemoir(submemoir, random)
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
