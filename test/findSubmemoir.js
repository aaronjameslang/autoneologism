const test = require('tape')
const findSubmemoir = require('../src/findSubmemoir')

const memoir = require('./characterisation/dig-dog-dot-dug/memoir-3')

;[
  {
    link: ['START', 'START'],
    expectedSubmemoir: {d: 4}
  },
  {
    link: ['START', 'START', 'd'],
    expectedSubmemoir: 4
  }
].forEach(fixture => {
  test(
    'findSubmemoir ' + JSON.stringify(fixture.memoir) + ' ' + JSON.stringify(fixture.link),
    t => {
      const actualSubmemoir = findSubmemoir(memoir, fixture.link)
      t.deepEqual(actualSubmemoir, fixture.expectedSubmemoir)
      t.end()
    }
  )
})
