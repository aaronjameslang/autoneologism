const test = require('tape')
const fs = require('fs')
const path = require('path')

const generateWordsInFromText = require('../../index').generateWordsInFromText
const generateWordsFromMemoir = require('../../index').generateWordsFromMemoir
const generateMemoirFromWords = require('../../index').generateMemoirFromWords

const PsuedoRandom = require('../_support/pseudo-random')

const REGENERATE = !!process.env.REGENERATE

fs.readdirSync(__dirname).forEach(textName => {
  if (fs.statSync(path.join(__dirname, textName)).isDirectory()) {
    processDirectory(textName)
  }
})

function processDirectory (textName) {
  testGenerateWordsInFromText(textName)
  testGenerateMemoirFromWords(textName)
  testGenerateWordsFromMemoir(textName)
}

function testGenerateWordsInFromText (textName) {
  test('characterise generateWordsInFromText ' + textName, function (t) {
    const textPath = path.join(__dirname, textName, 'text.txt')
    const wordsInPath = path.join(__dirname, textName, 'words-in.json')
    const text = readTextFile(textPath)
    const actualWordsIn = generateWordsInFromText(text)
    if (REGENERATE) writeJsonFile(wordsInPath, actualWordsIn)
    const expectedWordsIn = readJsonFile(wordsInPath)
    t.deepEqual(actualWordsIn, expectedWordsIn)
    t.end()
  })
}

function testGenerateMemoirFromWords (textName) {
  test('characterise generateMemoirFromWords ' + textName, function (t) {
    const wordsInPath = path.join(__dirname, textName, 'words-in.json')
    const memoirPath = path.join(__dirname, textName, 'memoir.json')
    const wordsIn = readJsonFile(wordsInPath)
    const actualMemoir = generateMemoirFromWords(wordsIn)
    if (REGENERATE) writeJsonFile(memoirPath, actualMemoir)
    const expectedMemoir = readJsonFile(memoirPath)
    t.deepEqual(actualMemoir, expectedMemoir)
    t.end()
  })
}

function testGenerateWordsFromMemoir (textName) {
  test('characterise generateWordsFromMemoir ' + textName, function (t) {
    const psuedoRandom = PsuedoRandom()
    const memoirPath = path.join(__dirname, textName, 'memoir.json')
    const wordsOutPath = path.join(__dirname, textName, 'words-out.json')
    const memoir = readJsonFile(memoirPath)
    const actualWordsOut = generateWordsFromMemoir(memoir, 100, psuedoRandom)
    if (REGENERATE) writeJsonFile(wordsOutPath, actualWordsOut)
    const expectedWordsOut = readJsonFile(wordsOutPath)
    t.deepEqual(actualWordsOut, expectedWordsOut)
    t.end()
  })
}

function readJsonFile (filepath) {
  return JSON.parse(readTextFile(filepath))
}

function writeJsonFile (filepath, data) {
  return fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

function readTextFile (filepath) {
  return String(fs.readFileSync(filepath))
}
