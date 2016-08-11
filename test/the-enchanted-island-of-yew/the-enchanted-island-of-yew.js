const test = require('tape')
const fs = require('fs')

const generateWordsFromText = require('../../src/generate').generateWordsFromText
const psuedoRandom = require('../_support/pseudo-random')()

test('generateWordsFromText the-enchanted-island-of-yew', function (t) {
  const text = String(fs.readFileSync(__dirname + '/the-enchanted-island-of-yew.txt'))
  const actualWordsOut = generateWordsFromText(text, 100, psuedoRandom)
  // fs.writeFileSync(__dirname + '/the-enchanted-island-of-yew.words-out.json', JSON.stringify(actualWordsOut, null, 2))
  const expectedWordsOut = JSON.parse(String(fs.readFileSync(__dirname + '/the-enchanted-island-of-yew.words-out.json')))
  t.deepEqual(actualWordsOut, expectedWordsOut)
  t.end()
})
