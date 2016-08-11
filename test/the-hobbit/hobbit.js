let test = require('tape')
let fs = require('fs')

let generateMemoirFromText = require('../../src/generate').generateMemoirFromText
let generateWordsFromMemoir = require('../../src/generate').generateWordsFromMemoir
const psuedoRandom = require('../_support/pseudo-random')()

test('hobbit generateMemoirFromText', function (t) {
  const text = String(fs.readFileSync(__dirname + '/hobbit.txt'))
  const actualMemoir = generateMemoirFromText(text)
  // fs.writeFileSync(__dirname + '/hobbit-memoir.json', JSON.stringify(actualMemoir, null, 2))
  const expectedMemoir = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-memoir.json')))
  t.deepEqual(actualMemoir, expectedMemoir)
  t.end()
})

test('hobbit generateWordsFromMemoir', function (t) {
  const memoir = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-memoir.json')))
  const actualWordsOut = generateWordsFromMemoir(memoir, 100, psuedoRandom)
  // fs.writeFileSync(__dirname + '/hobbit-words-out.json', JSON.stringify(actualWordsOut, null, 2))
  const expectedWordsOut = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-words-out.json')))
  t.deepEqual(actualWordsOut, expectedWordsOut)
  t.end()
})
