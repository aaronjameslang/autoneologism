const [START, END] = require('./constants')
const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateMemoirFromWords: generateMemoirFromWords,
  _incrementSubmemoir: incrementSubmemoir
}

/**
 * Generate a memoir from a list of input words
 * The memoir can later be used to generate output words
 * @param {array} wordsIn
 * @param {int} linkLength
 * @returns {object} memoir
 */
function generateMemoirFromWords (wordsIn, linkLength) {
  const memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, linkLength, word)
  })
  return memoir
}

/**
 * Take a memoir, and mutate it according to the decomposition of the word
 * @param {object} memoir This is mutated
 * @param {int} linkLength
 * @param {string} word
 */
function digestWord (memoir, linkLength, word) {
  const wordLength = word.length
  const links = buildLinksArray(linkLength, word, wordLength)
  for (let i = 0; i <= wordLength; i += 1) {
    incrementSubmemoir(memoir, links, i, linkLength)
  }
}

/**
 * Convert a word into an array, from which links can be specified
 * @param {int} linkLength
 * @param {string} word
 * @param {int} wordLength
 * @returns {array}
 */
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
 * Taking a memoir, and information to specify a leaf of it, increment that leaf
 * @param {array} memoir
 * @param {array} links The array containing the link describing the submemoir to be incremented
 * @param {int} offset The position of the link within the links array
 * @param {int} length The length of the link
 */
function incrementSubmemoir (memoir, links, offset, length) {
  const leafMemoir = findSubmemoir(memoir, links, offset, length - 1)
  const end = offset + length - 1
  const lastLetter = links[end]
  leafMemoir[lastLetter] |= 0
  leafMemoir[lastLetter] += 1
}
