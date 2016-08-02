let START_OF_WORD = {}
let END_OF_WORD = {}

module.exports =
class Digester {

    constructor(linkLength) {
        this.linkLength = linkLength || 2;
        this.memoir = {};
    }

    /**
     * @param word String
     */
    digestWord(word) {
        var link = [START_OF_WORD, START_OF_WORD, START_OF_WORD];
        for (let i = 0; i < word.length; i += 1) {
            let letter = word[i]
            link.shift();
            link.push(letter);
            var submemoir = this.memoir;
            link.forEach(function(linkLetter, index){
                if (!submemoir[linkLetter]) {
                    submemoir[linkLetter] = index === this.linkLength ? 0 : []
                }
                submemoir = submemoir[linkLetter]
            }.bind(this))
            submemoir += 1
        }

        link.shift();
        link.push(END_OF_WORD);

        var submemoir = this.memoir;
        link.forEach(function(linkLetter, index){
            if (!submemoir[linkLetter]) {
                submemoir[linkLetter] = index === this.linkLength ? 0 : []
            }
            submemoir = submemoir[linkLetter]
        }.bind(this))
        submemoir += 1
    }
}

/**
 * @param memoir array
 * @param link array
 */
module.exports.incrementSubmemoir =
function incrementSubmemoir(memoir, link) {
    let submemoir = memoir
    link.forEach(function(linkLetter, index){
        if (index === link.length - 1) {
            return // skip last
        }
        if (!submemoir[linkLetter]) {
            submemoir[linkLetter] = {}
        }
        submemoir = submemoir[linkLetter]
    }.bind(this))
    submemoir[link[link.length-1]] |= 0
    submemoir[link[link.length-1]] += 1
    return memoir
}
