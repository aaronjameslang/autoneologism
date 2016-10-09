const util = require('./util')
const PsuedoRandom = require('../_support/pseudo-random')
const generateWordsFromMemoir = require('../../index').generateWordsFromMemoir

util.test((name, linkLength, test) => {
  test('characterise generateWordsFromMemoir ' + name + '' + linkLength, t => {
    const psuedoRandom = PsuedoRandom()
    const wordsIn = util.getWordsIn(name)
    const processedMemoir = util.getProcessedMemoir(name, linkLength)
    const actualWordsOut = generateWordsFromMemoir(processedMemoir, linkLength, 100, wordsIn, psuedoRandom)
    if (util.REGENERATE) util.setWordsOut(name, linkLength, actualWordsOut)
    const expectedWordsOut = util.getWordsOut(name, linkLength)
    t.deepEqual(actualWordsOut, expectedWordsOut)
    t.end()
  })
})
