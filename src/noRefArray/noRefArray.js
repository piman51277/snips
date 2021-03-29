/**
 * Creates a filled Array with no references
 * @param {*} fill - what to fill the array with 
 * @param  {...any} dimensions - the dimensions of the array
 * @returns - the filled array
 */
function noRefArray(fill, ...dimensions) {
    const MAX_POS = dimensions.length - 1;
    
    // recursively creates tree
    function recursiveHelper(pos) {
        let subarr = [];
        if (pos >= MAX_POS) {
            for (let i = 0; i < dimensions[pos]; i++) {
                const fillCopy = fill;//hack to attempt to remove references
                subarr.push(fillCopy)
            }
        } else {
            for (let i = 0; i < dimensions[pos]; i++) {
                subarr.push(recursiveHelper(pos + 1))
            }
        }
        return subarr;
    }
    
    return recursiveHelper(0)
}