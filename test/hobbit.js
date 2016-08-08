let test = require('tape')
let fs = require('fs')

let digestWord = require('../src/digest').digestWord
let generateWord = require('../src/generate').generateWord

let wordsIn = String(fs.readFileSync(__dirname + '/hobbit.txt')).toLowerCase().split(' ')
let memoir = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-memoir.json')))
let wordsOut = JSON.parse(String(fs.readFileSync(__dirname + '/hobbit-words-out.json')))

let seed = 1
function random () {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

test('hobbit digestWord', function (t) {
  var actualMemoir = {}
  wordsIn.forEach(function (word) {
    digestWord(actualMemoir, word)
  })
  t.deepEqual(actualMemoir, memoir)
  t.end()
})

test('hobbit generateWord', function (t) {
  var actualWordsOut = []
  for (let i = 0; i < 100; i += 1) {
    actualWordsOut.push(generateWord(memoir, random))
  }
  t.deepEqual(actualWordsOut, wordsOut)
  t.end()
})
