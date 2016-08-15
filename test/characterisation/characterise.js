const test = require('tape')
const fs = require('fs')
const path = require('path')

const generateWordsFromMemoir = require('../../index').generateWordsFromMemoir
const generateMemoirFromWords = require('../../index').generateMemoirFromWords

const PsuedoRandom = require('../_support/pseudo-random')

const REGENERATE = !!process.env.REGENERATE

fs.readdirSync(__dirname).forEach(textName => {
  if (fs.statSync(path.join(__dirname, textName)).isDirectory()) {
    processDirectory(textName)
  }
})

function processDirectory (name) {
  testGenerateMemoirFromWords(name)
  testGenerateWordsFromMemoir(name)
}

function testGenerateMemoirFromWords (name) {
  test('characterise generateMemoirFromWords ' + name, function (t) {
    const wordsIn = readWordList(name)
    const memoirPath = path.join(__dirname, name, 'memoir.json')
    const actualMemoir = generateMemoirFromWords(wordsIn)
    if (REGENERATE) writeJsonFile(memoirPath, actualMemoir)
    const expectedMemoir = readJsonFile(memoirPath)
    t.deepEqual(actualMemoir, expectedMemoir)
    t.end()
  })
}

function testGenerateWordsFromMemoir (name) {
  test('characterise generateWordsFromMemoir ' + name, function (t) {
    const psuedoRandom = PsuedoRandom()
    const wordsIn = readWordList(name)
    const memoirPath = path.join(__dirname, name, 'memoir.json')
    const wordsOutPath = path.join(__dirname, name, 'words-out.json')
    const memoir = readJsonFile(memoirPath)
    const actualWordsOut = generateWordsFromMemoir(memoir, 100, wordsIn, psuedoRandom)
    if (REGENERATE) writeJsonFile(wordsOutPath, actualWordsOut)
    const expectedWordsOut = readJsonFile(wordsOutPath)
    t.deepEqual(actualWordsOut, expectedWordsOut)
    t.end()
  })
}

function readJsonFile (filepath) {
  return JSON.parse(String(fs.readFileSync(filepath)))
}

function writeJsonFile (filepath, data) {
  return fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

function readWordList (name) {
  const filepath = path.join(__dirname, name, 'words-in.txt')
  const text =  String(fs.readFileSync(filepath))
  const words = text.split(/\s+/).filter(word => !!word)
  return words
}
