module.exports = {
  processMemoir: processMemoir
}

function processMemoir (memoir, conformity) {
  if (conformity === undefined) {
    conformity = 1
  }

  let newMemoir = null
  let runnningTotal = 0

  for (const letter in memoir) {
    if (typeof memoir[letter] === 'object') {
      newMemoir = newMemoir || {}
      newMemoir[letter] = processMemoir(memoir[letter], conformity)
    } else {
      newMemoir = newMemoir || []
      runnningTotal += memoir[letter]
      newMemoir.push([letter, runnningTotal])
    }
  }

  return newMemoir
}
