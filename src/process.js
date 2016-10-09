module.exports = {
  processMemoir: processMemoir
}

function processMemoir (memoir) {
  let newMemoir = null
  let runnningTotal = 0

  for (const letter in memoir) {
    if (typeof memoir[letter] === 'object') {
      newMemoir = newMemoir || {}
      newMemoir[letter] = processMemoir(memoir[letter])
    } else {
      newMemoir = newMemoir || []
      runnningTotal += memoir[letter]
      newMemoir.push(runnningTotal, letter)
    }
  }

  return newMemoir
}
