const test = require('tape')
const fs = require('fs')
const path = require('path')
const findSubmemoir = require('../src/findSubmemoir')

const memoir = JSON.parse(String(fs.readFileSync(path.join(__dirname, '/characterisation/dig-dog-dot-dug/memoir.json'))))

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
