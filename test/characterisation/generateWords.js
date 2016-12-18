const util = require('./util')
const PsuedoRandom = require('../_support/pseudo-random')
const generateWords = require('../../index').generateWords

util.test((name, linkLength, test) => {
  test('characterise generateWords ' + name + '' + linkLength, t => {
    const wordsIn = util.getWordsIn(name)
    const psuedoRandom = PsuedoRandom()
    const actualWordsOut = generateWords(wordsIn, linkLength, null, null, psuedoRandom)
    const expectedWordsOut = util.getWordsOut(name, linkLength)
    t.deepEqual(actualWordsOut, expectedWordsOut)
    t.end()
  })
})
