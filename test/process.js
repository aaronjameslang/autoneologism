const test = require('tape')
const processMemoir = require('../src/process').processMemoir

;[
  {
    memoir: { a: 1, b: 1, c: 1 },
    expectedMemoir: [1, 'a', 2, 'b', 3, 'c']
  },
  {
    memoir: { a: { b: 1, c: 1 } },
    expectedMemoir: { a: [1, 'b', 2, 'c'] }
  }
].forEach(fixture => {
  test(
    'processMemoir ' + JSON.stringify(fixture.memoir),
    t => {
      const actualSubmemoir = processMemoir(fixture.memoir)
      t.deepEqual(actualSubmemoir, fixture.expectedMemoir)
      t.end()
    }
  )
})
