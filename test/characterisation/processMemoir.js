const util = require('./util')
const processMemoir = require('../../index').processMemoir

util.test((name, linkLength, test) => {
  test('characterise processMemoir ' + name + ' ' + linkLength, function (t) {
    const memoir = util.getMemoir(name, linkLength)
    const actualProcessedMemoir = processMemoir(memoir)
    if (util.REGENERATE) util.setProcessedMemoir(name, linkLength, actualProcessedMemoir)
    const expectedProcessedMemoir = util.getProcessedMemoir(name, linkLength)
    t.deepEqual(actualProcessedMemoir, expectedProcessedMemoir)
    t.end()
  })
})
