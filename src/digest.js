module.exports = {
  digestWord: digestWord,
  incrementSubmemoir: incrementSubmemoir
}

/**
 * @param word String
 */
function digestWord (memoir, word) {
  if (!memoir) throw new Error()
  if (!word) throw new Error('Falsey word: ' + JSON.stringify(word))
  var link = ['START', 'START', 'START']
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
function incrementSubmemoir (memoir, link) {
  if (!memoir) throw new Error()
  var submemoir = findSubmemoir(memoir, link)
  const lastLetter = link[link.length - 1]
  submemoir[lastLetter] |= 0
  submemoir[lastLetter] += 1
}

function findSubmemoir (memoir, link) {
  let submemoir = memoir
  link.forEach(function (linkLetter, index) {
    if (index === link.length - 1) {
      return // skip last
    }
    if (!submemoir[linkLetter]) {
      submemoir[linkLetter] = {}
    }
    submemoir = submemoir[linkLetter]
  })

  return submemoir
}
