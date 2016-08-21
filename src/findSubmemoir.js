module.exports = findSubmemoir

/**
 * @param memoir array
 * @param link array
 * @returns submemoir array
 */
function findSubmemoir (memoir, link) {
  let submemoir = memoir
  link.forEach(function (linkLetter) {
    submemoir[linkLetter] = submemoir[linkLetter] || {}
    submemoir = submemoir[linkLetter]
  })
  return submemoir
}
