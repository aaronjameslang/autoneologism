const findSubmemoir = require('./findSubmemoir')

module.exports = {
  generateMemoirFromWords: generateMemoirFromWords,
  _digestWord: digestWord,
  _incrementSubmemoir: incrementSubmemoir
}

function generateMemoirFromWords (wordsIn, linkLength) {
  let memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, linkLength, word)
  })
  return memoir
}

/**
 * @param word String
 */
function digestWord (memoir, linkLength, word) {
  if (!memoir) throw new Error()
  if (!word) throw new Error('Falsey word: ' + JSON.stringify(word))

  const wordLength = word.length
  const links = buildLinksArray(linkLength, word, wordLength)
  for (let i = 0; i <= wordLength; i += 1) {
    incrementSubmemoir(memoir, links, i, linkLength)
  }
}

function buildLinksArray (linkLength, word, wordLength) {
  const links = new Array(linkLength + wordLength)
  links.fill('START', 0, linkLength - 1) // Start with n-1 'START's
  for (let i = 0; i < wordLength; i += 1) {
    links[linkLength + i - 1] = word[i] // Then add every letter of the word
  }
  links[links.length - 1] = 'END' // Then end with a single 'END'
  if (links.length !== linkLength + wordLength) throw new Error() // Check array preallocation is correct
  return links
}

/**
 * @param memoir array The memoir
 * @param link array The link describing the submemoir to be incremented
 */
function incrementSubmemoir (memoir, link, offset, length) {
  offset = offset || 0
  length = length || link.length
  if (!memoir) throw new Error()
  const submemoir = findSubmemoir(memoir, link, offset, length - 1)
  const end = offset + length - 1
  const lastLetter = link[end]
  submemoir[lastLetter] |= 0
  submemoir[lastLetter] += 1
}
