const test = require('tape')
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const generateMemoirFromWords = require('../../index').generateMemoirFromWords
const processMemoir = require('../../index').processMemoir
const generateWordsFromMemoir = require('../../index').generateWordsFromMemoir

const PsuedoRandom = require('../_support/pseudo-random')

const REGENERATE = !!process.env.REGENERATE
const REPEAT = Number(process.env.REPEAT) || 1
const QUICK = !!process.env.QUICK

fs.readdirSync(__dirname).forEach(textName => {
  if (fs.statSync(path.join(__dirname, textName)).isDirectory()) {
    for (let i = 0; i < REPEAT; i += 1) {
      processDirectory(textName)
    }
  }
})

function processDirectory (name) {
  const minimumLinkLength = 2
  const maximumLinkLength = getMaximumLinkLength(name)
  for (
    let linkLength = minimumLinkLength; linkLength <= maximumLinkLength; linkLength += 1
  ) {
    if (linkLength < minimumLinkLength) return
    testGenerateMemoirFromWords(name, linkLength)
    testGenerateProcessedMemoirFromMemoir(name, linkLength)
    testGenerateWordsFromMemoir(name, linkLength)
  }
}

function getMaximumLinkLength (name) {
  const wordsInPath = getWordsInPath(name)
  const command = 'wc -l ' + wordsInPath
  const wordsInCount = Number(String(execSync(command)).split(' ')[0])
  if (wordsInCount < 1000) {
    return 5
  } else {
    return QUICK ? 0 : 3
  }
}

function testGenerateMemoirFromWords (name, linkLength) {
  test('characterise generateMemoirFromWords ' + name + ' ' + linkLength, function (t) {
    const wordsIn = readWordList(name)
    const memoirPath = path.join(__dirname, name, 'memoir-' + linkLength + '.json')
    const actualMemoir = generateMemoirFromWords(wordsIn, linkLength)
    if (REGENERATE) writeJsonFile(memoirPath, actualMemoir)
    const expectedMemoir = require(memoirPath)
    t.deepEqual(actualMemoir, expectedMemoir)
    t.end()
  })
}

function testGenerateProcessedMemoirFromMemoir (name, linkLength) {
  test('characterise processMemoir ' + name + ' ' + linkLength, function (t) {
    const memoirPath = path.join(__dirname, name, 'memoir-' + linkLength + '.json')
    const processedMemoirPath = path.join(__dirname, name, 'memoir-processed-' + linkLength + '.json')
    const memoir = require(memoirPath)
    const actualProcessedMemoir = processMemoir(memoir)
    if (REGENERATE) writeJsonFile(processedMemoirPath, actualProcessedMemoir)
    const expectedProcessedMemoir = require(processedMemoirPath)
    t.deepEqual(actualProcessedMemoir, expectedProcessedMemoir)
    t.end()
  })
}

function testGenerateWordsFromMemoir (name, linkLength) {
  test('characterise generateWordsFromMemoir ' + name + '' + linkLength, function (t) {
    const psuedoRandom = PsuedoRandom()
    const wordsIn = readWordList(name)
    const processedMemoirPath = path.join(__dirname, name, 'memoir-processed-' + linkLength + '.json')
    const wordsOutPath = path.join(__dirname, name, 'words-out-' + linkLength + '.json')
    const processedMemoir = require(processedMemoirPath)
    const actualWordsOut = generateWordsFromMemoir(processedMemoir, linkLength, 100, wordsIn, psuedoRandom)
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

function getWordsInPath (name) {
  return path.join(__dirname, name, 'words-in.txt')
}
