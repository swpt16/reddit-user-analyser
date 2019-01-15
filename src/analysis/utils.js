/**
 * Returns a dictionary of how many times a particular string occurs
 * in an array.
 * @param {Array} arr
 * @param {String} key
 * @return {Object}
 */
export function getCountDictionary(arr, key) {
  return arr.reduce((acc, item) => {
    const prop = key ? item[key] : item
    if (acc[prop] === undefined) {
      acc[prop] = 1
    } else {
      acc[prop]++
    }
    return acc
  }, {})
}

/**
 * Returns an array of tuples in the shape [string, number] sorted
 * in descending order.
 * @param {Object} countDictionary
 * @return {Array}
 */
export function getSortedCountTuples(countDictionary) {
  return Object.entries(countDictionary).sort(
    ([a], [b]) => countDictionary[b] - countDictionary[a],
  )
}

/**
 * Capitalizes the first letter of a string.
 * @param {String} str
 * @return {String}
 */
export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * Removes links from a string.
 * @param {String} str
 * @return {String}
 */
export function stripLinks(str) {
  const URL_RE = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g
  return str.replace(URL_RE, '')
}

/**
 * Returns an array of words from a string (normalized).
 * @param {String} str
 * @return {String[]}
 */
export function tokenize(str) {
  return str
    .toLowerCase()
    .replace(/\n/g, ' ')
    .replace(/[^\s\w'’-]|\s\d+|\s-|-\s/g, '')
    .replace(/\s+/, ' ')
    .split(' ')
}
