module.exports = {
  calculateArrayOfPotentialLetters: calculateArrayOfPotentialLetters,
  generateNextLetterFromArray: generateNextLetterFromArray,
  generateNextLetter: generateNextLetter,
  generateWord: generateWord,
  generateUniqueWord: generateUniqueWord
}

function generateNextLetter (word, memoir, linkLength, random) {
  if (typeof word !== 'string') throw new Error()
  switch (word.length) {
    case 0:
      var submemoir = memoir['START']['START']
      break
    case 1:
      submemoir = memoir['START'][word[word.length - 1]]
      break
    default:
      submemoir = memoir[word[word.length - 2]][word[word.length - 1]]
      break
  }

  var array = calculateArrayOfPotentialLetters(submemoir)
  var letter = generateNextLetterFromArray(array, random)
  return letter
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

function calculateArrayOfPotentialLetters (submemoir) {
  if (typeof submemoir !== 'object') throw new Error()
  var array = []
  for (const letter in submemoir) {
    let weight = submemoir[letter]
    for (let i = 0; i < weight; i += 1) {
      array.push(letter)
    }
  }
  return array
}

function generateNextLetterFromArray (array, random) {
  let index = Math.floor(random() * array.length)
  var letter = array[index]
  if (typeof letter !== 'string') throw new Error()
  return letter
}
