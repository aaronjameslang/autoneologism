let digestWord = require('./digest').digestWord

module.exports = {
  calculateArrayOfPotentialLetters: calculateArrayOfPotentialLetters,
  generateNextLetterFromArray: generateNextLetterFromArray,
  generateNextLetter: generateNextLetter,
  generateWord: generateWord,
  generateMemoirFromText: generateMemoirFromText,
  generateWordsFromMemoir: generateWordsFromMemoir,
  generateWordsFromText: generateWordsFromText
}

function generateWordsFromText (text, number) {
  let wordsIn = generateWordsInFromText(text)
  return generateWordsFromWords(wordsIn, number)
}

function generateWordsInFromText (text) {
  return text.toLowerCase().split(/[^a-z'-]/).filter(function(word) {
    return !!word
  })
}

function generateWordsFromMemoir (memoir, number, random) {
  random = random || Math.random
  let wordsOut = []
  for (const i of Array(number).keys()) {
    const word = generateWord(memoir, random)
    wordsOut.push(word)
  }
  return wordsOut
}

function generateWordsFromWords (wordsIn, number) {
  let memoir = generateMemoirFromWords(wordsIn)
  const wordsOut = generateWordsFromMemoir(memoir, number)
  return wordsOut
}

function generateMemoirFromText (text) {
  let wordsIn = generateWordsInFromText(text)
  return generateMemoirFromWords(wordsIn)
}

function generateMemoirFromWords (wordsIn) {
  let memoir = {}
  wordsIn.forEach(function (word) {
    digestWord(memoir, word)
  })
  return memoir
}

function generateNextLetter (word, memoir, random) {
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

function generateWord (memoir, random) {
  var word = ''
  var letter = ''
  while (letter !== 'END') {
    word += letter
    letter = generateNextLetter(word, memoir, random)
  }
  return word
}

function calculateArrayOfPotentialLetters (submemoir) {
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
  return array[index]
}
