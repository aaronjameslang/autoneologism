const test = require('tape')
const incrementSubmemoir = require('../src/digest')._incrementSubmemoir

;[
  {
    memoir: {},
    link: ['d', 'o', 'g'],
    expectedMemoir: { d: { o: { g: 1 } } }
  },
  {
    memoir: { d: { o: { g: 1 } } },
    link: ['d', 'o', 't'],
    expectedMemoir: { d: { o: { g: 1, t: 1 } } }
  },
  {
    memoir: { d: { o: { g: 1 } } },
    link: ['d', 'u', 'g'],
    expectedMemoir: { d: { o: { g: 1 }, u: { g: 1 } } }
  }
].forEach(fixture => {
  test.test(
    'should incrementSubmemoir ' + JSON.stringify(fixture.link),
    t => {
      t.plan(1)
      incrementSubmemoir(fixture.memoir, fixture.link, 0, fixture.link.length)
      t.deepEqual(fixture.memoir, fixture.expectedMemoir)
    }
  )
})
