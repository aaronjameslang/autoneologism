let test = require('tape')
let fs = require('fs')

let digestWord = require('../../src/digest').digestWord
let generateMemoirFromText = require('../../src/generate').generateMemoirFromText
let generateWordsFromMemoir = require('../../src/generate').generateWordsFromMemoir
const psuedoRandom = require('../_support/pseudo-random')()

let memoir = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-memoir.json')))
let wordsOut = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-words-out.json')))

test('hobbit generateMemoirFromText', function (t) {
  const text = String(fs.readFileSync(__dirname + '/hobbit.txt'))
  const actualMemoir = generateMemoirFromText(text)
  t.deepEqual(actualMemoir, memoir)
  t.end()
})

test('hobbit generateWordsFromMemoir', function (t) {
  var actualWordsOut = generateWordsFromMemoir(memoir, 100, psuedoRandom)
  t.deepEqual(actualWordsOut, wordsOut)
  t.end()
})
