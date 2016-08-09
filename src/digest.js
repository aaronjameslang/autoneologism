module.exports = {
  digestWord: digestWord,
  incrementSubmemoir: incrementSubmemoir
}

/**
 * @param word String
 */
function digestWord (memoir, word) {
  if (!memoir) throw new Error()
  if (!word) throw new Error()
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
 * @param memoir array
 * @param link array
 */
function incrementSubmemoir (memoir, link) {
  if (!memoir) throw new Error()
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
  submemoir[link[link.length - 1]] |= 0
  submemoir[link[link.length - 1]] += 1
}
