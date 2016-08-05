module.exports = {
  calculateArrayOfPotentialLetters: calculateArrayOfPotentialLetters,
  generateNextLetterFromArray: generateNextLetterFromArray
}

function calculateArrayOfPotentialLetters (submemoir) {
  var array = []
  for (letter in submemoir) {
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
