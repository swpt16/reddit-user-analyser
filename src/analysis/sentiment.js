import valenceAFINN from '../data/afinn-165--extended.json'
import emotionAFINN from '../data/afinn-165--emotions.json'
import { tokenize } from './utils'

const negators = [
  'cant',
  "can't",
  'can’t',
  'dont',
  "don't",
  'don’t',
  'doesnt',
  "doesn't",
  'doesn’t',
  'not',
  'non',
  'wont',
  "won't",
  'won’t',
  'isnt',
  "isn't",
  'isn’t',
]

const intensifiers = [
  'fucking',
  'absolutely',
  'very',
  'really',
  'extremely',
  'incredibly',
  'definitely',
  'so',
]

/**
 * Custom strategy to apply to the current token by applying negators + intensifiers.
 * @param {String[]} words
 * @param {Number} index
 * @param {Number} valence
 * @return smart valence
 */
function strategy(words, index, valence) {
  let newValence = valence
  let multiplier = 1
  let previousWord = words[index - 1]
  const nextWord = words[index + 1]

  if (intensifiers.includes(previousWord)) {
    multiplier = 2
    previousWord = words[index - 2]
  }

  if (negators.includes(previousWord)) {
    newValence = valence * -1
  }

  // Special case since people like using this word to intensify something
  // If intensifying a positive word, reutrn 0 valence
  if (words[index] === 'fucking' && valenceAFINN[nextWord] > 0) {
    return 0
  }

  return multiplier * newValence
}

/**
 * Returns the comparative binary (positive or negative) sentiment.
 * @param {String} text
 * @return {Number}
 */
export function binarySentiment(text) {
  const words = tokenize(text)
  const score = words.reduce((acc, word, index) => {
    return acc + strategy(words, index, valenceAFINN[word] || 0)
  }, 0)
  return score / words.length
}

/**
 * Returns the emotional sentiment score (dictionary)
 * @param {String} text
 * @return {Object}
 */
export function emotionalSentiment(text) {
  return tokenize(text).reduce(
    (acc, word) => {
      const emotion = emotionAFINN[word]
      const valence = valenceAFINN[word]
      if (emotion) {
        acc[emotion] += acc[emotion] * Math.abs(valence || 1)
      }
      return acc
    },
    {
      anger: 0,
      confusion: 0,
      disgust: 0,
      fear: 0,
      joy: 0,
      none: 0,
      passion: 0,
      sadness: 0,
      shame: 0,
    },
  )
}
