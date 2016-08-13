let test = require('tape')
let digestWord = require('../src/digest').digestWord
let incrementSubmemoir = require('../src/digest').incrementSubmemoir

var fixtures = [
  {
    expectedMemoir: {
      'START': {
        'START': {
          'd': 4
        },
        'd': {
          'o': 2,
          'i': 1,
          'u': 1
        }
      },
      'd': {
        'o': {
          'g': 1,
          't': 1
        },
        'i': {
          'g': 1
        },
        'u': {
          'g': 1
        }
      },
      'o': {
        'g': {
          'END': 1
        },
        't': {
          'END': 1
        }
      },
      'i': {
        'g': {
          'END': 1
        }
      },
      'u': {
        'g': {
          'END': 1
        }
      }
    },
    words: ['dog', 'dig', 'dug', 'dot'],
    linkLength: 2
  }
]

function testDigest (expectedMemoir, words, linkLength, memoir, t) {
  t.plan(1)
  memoir = memoir || {}
  if (!memoir) throw new Error()
  words.forEach(function (word) {
    digestWord(memoir, word)
  })
  t.deepEqual(memoir, expectedMemoir)
}

test('digest', function (t) {
  fixtures.forEach(function (fixture) {
    t.test(
      'should correctly digest ' + JSON.stringify(fixture.words),
      testDigest.bind(null, fixture.expectedMemoir, fixture.words, fixture.linkLength, fixture.memoir)
    )
  })
})

test('incrementSubmemoir', function (t) {
  [
    {
      memoir: {},
      link: ['d', 'o', 'g'],
      expectedMemoir: {'d': {'o': {'g': 1}}}
    },
    {
      memoir: {'d': {'o': {'g': 1}}},
      link: ['d', 'o', 't'],
      expectedMemoir: {'d': {'o': {'g': 1, 't': 1}}}
    },
    {
      memoir: {'d': {'o': {'g': 1}}},
      link: ['d', 'u', 'g'],
      expectedMemoir: {'d': {'o': {'g': 1}, 'u': {'g': 1}}}
    }
  ].forEach(function (fixture) {
    t.test(
      'should incrementSubmemoir ' + JSON.stringify(fixture.link),
      function (t) {
        t.plan(1)
        incrementSubmemoir(fixture.memoir, fixture.link)
        t.deepEqual(fixture.memoir, fixture.expectedMemoir)
      }
    )
  })
})
