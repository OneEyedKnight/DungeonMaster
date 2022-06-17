module.exports = {
    chunk: function chunk(array, size) {
        let copy = array;
        let chunkedArray = [];
        for (let i = 0; i < copy.length; i += size) {
            chunkedArray.push(copy.slice(i, i + size));
        }

        return chunkedArray;
    }
}