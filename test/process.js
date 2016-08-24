const test = require('tape')
const processMemoir = require('../src/process').processMemoir

;[
  {
    memoir: {'a': 1, 'b': 1, 'c': 1},
    expectedMemoir: [['a', 1], ['b', 2], ['c', 3]]
  },
  {
    memoir: {'a': {'b': 1, 'c': 1}},
    expectedMemoir: {'a': [['b', 1], ['c', 2]]}
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
