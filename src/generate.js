const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateNextLetter: generateNextLetter,
  generateWord: generateWord,
  generateUniqueWord: generateUniqueWord
}

function generateNextLetter (wordSoFar, memoir, linkLength, random) {
  if (typeof wordSoFar !== 'string') throw new Error()
  if (wordSoFar.length > 100) throw new Error()
  const link = wordSoFar.slice(-linkLength + 1).split('')
  while (link.length < linkLength - 1) {
    link.unshift('START')
  }
  const submemoir = findSubmemoir(memoir, link)
  return generateLetterFromSubmemoir(submemoir, random())
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
    letter = generateNextLetter(word, memoir, linkLength, random)
  }
  return word
}

function generateLetterFromSubmemoir (submemoir, random) {
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
