module.exports = function PsuedoRandom (seed) {
  seed = seed || 1
  return function pseudoRandom () {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
}
