const test = require('tape')
const fs = require('fs')
const path = require('path')

const generateMemoirFromWords = require('../../index').generateMemoirFromWords
const generateWordsFromMemoir = require('../../index').generateWordsFromMemoir

const PsuedoRandom = require('../_support/pseudo-random')

const REGENERATE = !!process.env.REGENERATE

fs.readdirSync(__dirname).forEach(textName => {
  if (fs.statSync(path.join(__dirname, textName)).isDirectory()) {
    processDirectory(textName)
  }
})

function processDirectory (name) {
  testGenerateMemoirFromWords(name, 3)
  testGenerateWordsFromMemoir(name, 3)
}

function testGenerateMemoirFromWords (name, linkLength) {
  test('characterise generateMemoirFromWords ' + name, function (t) {
    const wordsIn = readWordList(name)
    const memoirPath = path.join(__dirname, name, 'memoir-' + linkLength + '.json')
    const actualMemoir = generateMemoirFromWords(wordsIn, linkLength)
    if (REGENERATE) writeJsonFile(memoirPath, actualMemoir)
    const expectedMemoir = require(memoirPath)
    t.deepEqual(actualMemoir, expectedMemoir)
    t.end()
  })
}

function testGenerateWordsFromMemoir (name, linkLength) {
  test('characterise generateWordsFromMemoir ' + name, function (t) {
    const psuedoRandom = PsuedoRandom()
    const wordsIn = readWordList(name)
    const memoirPath = path.join(__dirname, name, 'memoir-' + linkLength + '.json')
    const wordsOutPath = path.join(__dirname, name, 'words-out-' + linkLength + '.json')
    const memoir = require(memoirPath)
    const actualWordsOut = generateWordsFromMemoir(memoir, linkLength, 100, wordsIn, psuedoRandom)
    if (REGENERATE) writeJsonFile(wordsOutPath, actualWordsOut)
    const expectedWordsOut = require(wordsOutPath)
    t.deepEqual(actualWordsOut, expectedWordsOut)
    t.end()
  })
}

function writeJsonFile (filepath, data) {
  return fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

function readWordList (name) {
  const filepath = getWordsInPath(name)
  const text = String(fs.readFileSync(filepath))
  const words = text.split(/\s+/).filter(word => !!word)
  return words
}

function getWordsInPath(name) {
  return path.join(__dirname, name, 'words-in.txt')
}
