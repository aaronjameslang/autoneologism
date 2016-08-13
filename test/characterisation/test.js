const test = require('tape')
const fs = require('fs')
const path = require('path')

console.log(__dirname);

const generateMemoirFromText = require('../../src/generate').generateMemoirFromText
const generateWordsFromMemoir = require('../../src/generate').generateWordsFromMemoir
const psuedoRandom = require('../_support/pseudo-random')()

const REGENERATE = false

fs.readdirSync(__dirname).forEach(textName => {
  if (fs.statSync(path.join(__dirname, textName)).isDirectory()) {
    processDirectory(textName)
  }
})

function processDirectory (textName) {
  testGenerateMemoirFromText(textName)
  testGenerateWordsFromMemoir(textName)
}

function testGenerateMemoirFromText (textName) {
  test('characterise generateMemoirFromText ' + textName, function (t) {
    const textPath = path.join(__dirname, textName, 'text.txt')
    const memoirPath = path.join(__dirname, textName, 'memoir.json')
    const text = readTextFile(textPath)
    const actualMemoir = generateMemoirFromText(text)
    if (REGENERATE) writeJsonFile(memoirPath, actualMemoir)
    const expectedMemoir = readJsonFile(memoirPath)
    t.deepEqual(actualMemoir, expectedMemoir)
    t.end()
  })
}

function testGenerateWordsFromMemoir (textName) {
  test('characterise generateWordsFromMemoir ' + textName, function (t) {
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
