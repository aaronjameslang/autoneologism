module.exports = findSubmemoir

/**
 * This function takes a memoir and a link
 *   (described by an array, offset and length)
 * Using the link it navigates the memoir and
 *   returns the submemoir it finds
 *
 * @param memoir array
 * @param links array
 * @param offset int
 * @param length int
 * @returns submemoir array
 */
function findSubmemoir (memoir, links, offset, length) {
  const end = offset + length
  let submemoir = memoir
  for (let index = offset; index < end; index += 1) {
    const linkLetter = links[index]
    submemoir[linkLetter] = submemoir[linkLetter] || {}
    submemoir = submemoir[linkLetter]
  }
  return submemoir
}
