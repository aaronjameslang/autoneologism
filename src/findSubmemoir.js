module.exports = findSubmemoir

/**
 * This function takes a memoir and a link
 *   (described by an array, offset and length)
 * Using the link it navigates the memoir and
 *   returns the submemoir it finds
 *
 * @param {array} memoir
 * @param {array} links
 * @param {int} offset
 * @param {int} length
 * @returns {array} submemoir
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
