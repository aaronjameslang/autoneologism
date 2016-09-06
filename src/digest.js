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
  var link = new Array(linkLength).fill('START')
  for (let i = 0; i < word.length; i += 1) {
    let letter = word[i]
    link.shift()
    link.push(letter)
    incrementSubmemoir(memoir, link)
  }

  link.shift()
  link.push('END')

  incrementSubmemoir(memoir, link)
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
