const [START, END] = require('./constants')
const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateMemoirFromWords: generateMemoirFromWords,
  _incrementSubmemoir: incrementSubmemoir
}

function generateMemoirFromWords (wordsIn, linkLength) {
  const memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, linkLength, word)
  })
  return memoir
}

/**
 * @param memoir Array
 * @param linkLength Int
 * @param word String
 */
function digestWord (memoir, linkLength, word) {
  const wordLength = word.length
  const links = buildLinksArray(linkLength, word, wordLength)
  for (let i = 0; i <= wordLength; i += 1) {
    incrementSubmemoir(memoir, links, i, linkLength)
  }
}

function buildLinksArray (linkLength, word, wordLength) {
  const linkLengthMinusOne = linkLength - 1
  const links = new Array(linkLength + wordLength)
  links.fill(START, 0, linkLengthMinusOne) // Start with n-1 'START's
  for (let i = 0; i < wordLength; i += 1) {
    links[linkLengthMinusOne + i] = word[i] // Then add every letter of the word
  }
  links[linkLengthMinusOne + wordLength] = END // Then end with a single 'END'
  return links
}

/**
 * @param memoir array The memoir
 * @param links array The array containing the link describing the submemoir to be incremented
 * @param offset int The position of the link within the links array
 * @param length int The length of the link
 */
function incrementSubmemoir (memoir, links, offset, length) {
  const leafMemoir = findSubmemoir(memoir, links, offset, length - 1)
  const end = offset + length - 1
  const lastLetter = links[end]
  leafMemoir[lastLetter] |= 0
  leafMemoir[lastLetter] += 1
}
