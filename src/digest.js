const R = require('ramda')

module.exports = {
  digestWord: digestWord,
  incrementSubmemoir: incrementSubmemoir
}

/**
 * @param word String
 */
function digestWord (memoir, linkLength, word) {
  if (!memoir) throw new Error()
  if (!word) throw new Error('Falsey word: ' + JSON.stringify(word))
  var link = new Array(linkLength).fill('START')
  R.times(i => {
    let letter = word[i]
    link.shift()
    link.push(letter)
    incrementSubmemoir(memoir, link)
  }, word.length)

  link.shift()
  link.push('END')

  incrementSubmemoir(memoir, link)
}

/**
 * @param memoir array The memoir
 * @param link array The link describing the submemoir to be incremented
 */
function incrementSubmemoir (memoir, link) {
  if (!memoir) throw new Error()
  const submemoir = findSubmemoir(memoir, link)
  const lastLetter = link[link.length - 1]
  submemoir[lastLetter] |= 0
  submemoir[lastLetter] += 1
}

/**
 * @param memoir array
 * @param link array
 * @returns submemoir array
 */
function findSubmemoir (memoir, link) {
  let submemoir = memoir
  link.forEach(function (linkLetter, index) {
    if (index === link.length - 1) {
      return // skip last
    }
    submemoir[linkLetter] = submemoir[linkLetter] || {}
    submemoir = submemoir[linkLetter]
  })
  return submemoir
}
