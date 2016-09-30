const [START, END] = require('./constants')
const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateMemoirFromWords: generateMemoirFromWords,
  _digestWord: digestWord,
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
  const links = new Array(linkLength + wordLength)
  links.fill(START, 0, linkLength - 1) // Start with n-1 'START's
  for (let i = 0; i < wordLength; i += 1) {
    links[linkLength + i - 1] = word[i] // Then add every letter of the word
  }
  links[links.length - 1] = END // Then end with a single 'END'
  return links
}

/**
 * @param memoir array The memoir
 * @param link array The link describing the submemoir to be incremented
 * @param offset int
 * @param length int
 */
function incrementSubmemoir (memoir, link, offset, length) {
  const submemoir = findSubmemoir(memoir, link, offset, length - 1)
  const end = offset + length - 1
  const lastLetter = link[end]
  submemoir[lastLetter] |= 0
  submemoir[lastLetter] += 1
}
