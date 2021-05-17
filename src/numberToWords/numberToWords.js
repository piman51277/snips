const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const tens = ['none', 'ten', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const extensions = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion']

function chunkToWords(n) {
    let out = []

    if (n >= 100) {
        const hundreds = Math.floor(n / 100)
        out.push(`${ones[hundreds]} hundred`)
    }


    const lastTwoDigits = n % 100

    //fuck english
    if (lastTwoDigits < 20 && lastTwoDigits > 10) {
        out.push(teens[lastTwoDigits - 11])
    } else {
        if (lastTwoDigits >= 10) out.push(tens[Math.floor(lastTwoDigits / 10)])
        const digit = lastTwoDigits % 10
        if (digit != 0) out.push(ones[digit])
    }

    return out.join(' ');
}

/**
 * Convert a number to word form
 * @param {number} number - number to convert 
 * @returns {string} - Word form of inputted number
 */
function numberToWords(number) {
    const stringForm = Math.abs(number).toString().split('.')
    //process head
    const head = stringForm[0]

    //if head is 0, just skip everything. we need to override for chunkToWords() anyways
    let wordChunks = [];
    if (head == 0) {
        wordChunks = ['zero']
    } else {
        //get chunks
        let chunks = []
        for (let i = head.length - 3; i >= -3; i -= 3) {
            chunks.push(head.slice(Math.max(i, 0), i + 3))
        }
        chunks = chunks.filter(n => n != '')


        //process chunks
        wordChunks.push(chunkToWords(chunks[0]))
        for (let i = 1; i < chunks.length; i++) {
            wordChunks.push(`${chunkToWords(chunks[i])} ${extensions[i]}`)
        }
    }

    //negative
    if (number < 0) wordChunks.push('negative')

    wordChunks.reverse();

    //process tail
    if (stringForm[1]) {
        wordChunks.push('point')
        for (i of stringForm[1]) {
            wordChunks.push(ones[i])
        }
    }

    return wordChunks.join(' ')
}

module.exports = numberToWords