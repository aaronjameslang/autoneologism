module.exports = {
  processMemoir: processMemoir
}

/**
 * Takes an unprocessed memoir, and processes it
 * to reduce space/time requirements when generating words
 * @param {{}} memoir An unprocessed memoir
 * @return {{}} A processed memoir
 */
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
