module.exports = findSubmemoir

/**
 * @param memoir array
 * @param link array
 * @returns submemoir array
 */
function findSubmemoir (memoir, link, offset, length) {
  const end = offset + length
  let submemoir = memoir
  for (let index = offset; index < end; index += 1) {
    const linkLetter = link[index]
    submemoir[linkLetter] = submemoir[linkLetter] || {}
    submemoir = submemoir[linkLetter]
  }
  return submemoir
}
