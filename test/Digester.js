let test = require('tape');
let Digester = require('../src/Digester')

var fixtures = [
    {
        expectedMemoir: [],
        words: ['dog', 'dig', 'dug', 'dot'],
        linkLength: 2,
    }
]

function testDigest(expectedMemoir, words, linkLength, memoir, t) {
    console.log(expectedMemoir, words, linkLength)
    t.plan(1)
    let digester = new Digester(linkLength);
    words.forEach(function (word) {
        digester.digestWord(word)
    })
    let actualMemoir = digester.memoir
    t.equal(actualMemoir, expectedMemoir)
}

test('T', function (t) {
    t.plan(1)
    t.equal(1, 1)
})

// test('Digester', function (t) {
//     fixtures.forEach(function (fixture) {
//         t.test(
//             'should correctly digest ' + JSON.stringify(fixture.words),
//             testDigest.bind(null, fixture.expectedMemoir, fixture.words, fixture.linkLength, fixture.memoir)
//         )
//     })
// })

test('incrementSubmemoir', function (t) {
    [
        {
            memoir: {},
            link: ['d', 'o', 'g'],
            expectedMemoir: {'d':{'o':{'g':1}}}
        },
        {
            memoir: {'d':{'o':{'g':1}}},
            link: ['d', 'o', 't'],
            expectedMemoir: {'d':{'o':{'g':1,'t':1}}}
        },
        {
            memoir: {'d':{'o':{'g':1}}},
            link: ['d', 'u', 'g'],
            expectedMemoir: {'d':{'o':{'g':1},'u':{'g':1}}}
        },
    ].forEach(function (fixture) {
        t.test(
            'should incrementSubmemoir ' + JSON.stringify(fixture.link),
            function(t) {
                t.plan(1)
                Digester.incrementSubmemoir(fixture.memoir, fixture.link)
                t.deepEqual(fixture.memoir, fixture.expectedMemoir)
            }
        )
    })
})
