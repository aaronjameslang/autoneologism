const util = require('./util')
const generateMemoirFromWords = require('../../index').generateMemoirFromWords

util.test((name, linkLength, test) => {
  test('characterise generateMemoirFromWords ' + name + ' ' + linkLength, t => {
    const wordsIn = util.getWordsIn(name)
    const actualMemoir = generateMemoirFromWords(wordsIn, linkLength)
    if (util.REGENERATE) util.setMemoir(name, linkLength, actualMemoir)
    const expectedMemoir = util.getMemoir(name, linkLength)
    t.deepEqual(actualMemoir, expectedMemoir)
    t.end()
  })
})
