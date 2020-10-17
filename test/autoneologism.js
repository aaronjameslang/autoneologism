const test = require('tape')

const PsuedoRandom = require('./_support/pseudo-random')
const anl = require('..')

;[
  {
    wordsIn: ['another', 'open', 'penmanship', 'answer'],
    expectedOut: { attempts: 10000, efficiency: 0.0007, words: ['openmanship', 'anship', 'penmanother', 'penmanswer', 'pen', 'openmanswer', 'openmanother'] }
  }
].forEach(fixture => {
  test.test(
    'generateWords ' + JSON.stringify(fixture.wordsIn),
    t => {
      const psuedorandom = new PsuedoRandom()
      const actualOut = anl.generateWords(fixture.wordsIn, undefined, undefined, undefined, psuedorandom)
      t.deepEqual(actualOut, fixture.expectedOut)
      t.end()
    }
  )
})
