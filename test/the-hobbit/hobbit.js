let test = require('tape')
let fs = require('fs')

let digestWord = require('../../src/digest').digestWord
let generateMemoirFromText = require('../../src/generate').generateMemoirFromText
let generateWordsFromMemoir = require('../../src/generate').generateWordsFromMemoir

let memoir = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-memoir.json')))
let wordsOut = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-words-out.json')))

let seed = 1
function random () {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

test('hobbit digestWord', function (t) {
  const text = String(fs.readFileSync(__dirname + '/hobbit.txt'))
  const actualMemoir = generateMemoirFromText(text)
  t.deepEqual(actualMemoir, memoir)
  t.end()
})

test('hobbit generateWord', function (t) {
  var actualWordsOut = generateWordsFromMemoir(memoir, 100, random)
  t.deepEqual(actualWordsOut, wordsOut)
  t.end()
})
