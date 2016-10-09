const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const tape = require('tape')

const REGENERATE = !!process.env.REGENERATE
const REPEAT = Number(process.env.REPEAT) || 1
const QUICK = !!process.env.QUICK

module.exports = {
  REGENERATE: REGENERATE,
  test: test,
  getWordsIn: getWordsIn,
  getMemoir: getMemoir,
  setMemoir: setMemoir,
  getProcessedMemoir: getProcessedMemoir,
  setProcessedMemoir: setProcessedMemoir,
  getWordsOut: getWordsOut,
  setWordsOut: setWordsOut
}

function test (test) {
  fs.readdirSync(__dirname).forEach(textName => {
    if (fs.statSync(path.join(__dirname, textName)).isDirectory()) {
      for (let i = 0; i < REPEAT; i += 1) {
        processDirectory(test, textName)
      }
    }
  })
}

function processDirectory (test, name) {
  const minimumLinkLength = 2
  const maximumLinkLength = getMaximumLinkLength(name)
  for (
    let linkLength = minimumLinkLength; linkLength <= maximumLinkLength; linkLength += 1
  ) {
    if (linkLength < minimumLinkLength) return
    test(name, linkLength, tape)
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

function getWordsIn (name) {
  const filepath = getWordsInPath(name)
  const text = String(fs.readFileSync(filepath))
  const words = text.split(/\s+/).filter(word => !!word)
  return words
}

function getWordsInPath (name) {
  return path.join(__dirname, name, 'words-in.txt')
}

function setMemoir (name, linkLength, memoir) {
  writeJsonFile(getMemoirPath(name, linkLength), memoir)
}

function getMemoir (name, linkLength) {
  return require(getMemoirPath(name, linkLength))
}

function getMemoirPath (name, linkLength) {
  return path.join(__dirname, name, 'memoir-' + linkLength + '.json')
}

function setProcessedMemoir (name, linkLength, memoir) {
  writeJsonFile(getProcessedMemoirPath(name, linkLength), memoir)
}

function getProcessedMemoir (name, linkLength) {
  return require(getProcessedMemoirPath(name, linkLength))
}

function getProcessedMemoirPath (name, linkLength) {
  return path.join(__dirname, name, 'memoir-processed-' + linkLength + '.json')
}

function setWordsOut (name, linkLength, wordsOut) {
  writeJsonFile(getWordsOutPath(name, linkLength), wordsOut)
}

function getWordsOut (name, linkLength) {
  return require(getWordsOutPath(name, linkLength))
}

function getWordsOutPath (name, linkLength) {
  return path.join(__dirname, name, 'words-out-' + linkLength + '.json')
}

function writeJsonFile (filepath, data) {
  return fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

if (REGENERATE) {
  require('./generateMemoirFromWords')
  require('./processMemoir')
  require('./generateWordsFromMemoir')
}
