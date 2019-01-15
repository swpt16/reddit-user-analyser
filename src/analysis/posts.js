import flatten from 'lodash/flatten'
import meanBy from 'lodash/meanBy'
import { tokenize, getCountDictionary, getSortedCountTuples } from './utils'
import { binarySentiment, emotionalSentiment } from './sentiment'

const SUBMISSION_BODY_FIELD = 'selftext'
const COMMENT_BODY_FIELD = 'body'

/**
 * Falls back to the string `0` if the value is falsy or `"NaN"`
 * @param {*} value
 * @return {*}
 */
function withFallback(value) {
  return !value || value === 'NaN' ? '0' : value
}

/**
 * Returns the submission's body content, with fallback.
 * @param {Object} item
 * @return {String}
 */
function submissionBody(item) {
  return item[SUBMISSION_BODY_FIELD] || ''
}

/**
 * Returns the comment's body content, with fallback.
 * @param {Object} item
 * @return {String}
 */
function commentBody(item) {
  return item[COMMENT_BODY_FIELD] || ''
}

/**
 * Returns a words array for submissions and comments.
 * @param {Object}
 * @return {Object}
 */
export function getWords({ submissions, comments }) {
  return {
    submissions: submissions.map(item => tokenize(submissionBody(item))),
    comments: comments.map(item => tokenize(commentBody(item))),
  }
}

/**
 * Count how many times a user has posted (either comments or submissions)
 * in a subreddit.
 * @param {Object}
 * @return {Array}
 */
export function getTopSubreddits({ submissions, comments }) {
  return getSortedCountTuples(
    getCountDictionary([...submissions, ...comments], 'subreddit'),
  )
}

/**
 * Count how many times a particular word has been used, searching all comments
 * and submissions.
 * @param {Object}
 * @return {Array}
 */
export function getFrequentWords(words) {
  return (
    getSortedCountTuples(
      getCountDictionary(flatten([...words.submissions, ...words.comments])),
    )
      // filter out falsy values (empty strings)
      .filter(([name]) => name)
  )
}

/**
 * Returns the average word length used, split by submissions and comments.
 * @param {Object}
 * @return {Object}
 */
export function getAverageWordLength(words) {
  const field = 'length'
  return {
    submissions: withFallback(
      meanBy(flatten(words.submissions), field).toFixed(2),
    ),
    comments: withFallback(meanBy(flatten(words.comments), field).toFixed(2)),
  }
}

/**
 * Returns the average number of words per post, split by submissions and comments.
 * @param {Object}
 * @return {Object}
 */
export function getAverageNumberOfWordsPerPost(words) {
  const field = 'length'
  return {
    submissions: withFallback(Math.round(meanBy(words.submissions, field))),
    comments: withFallback(Math.round(meanBy(words.comments, field))),
  }
}

/**
 * Returns the average score, split by submissions and comments.
 * @param {Object}
 * @return {Object}
 */
export function getAverageKarma({ submissions, comments }) {
  const field = 'score'
  return {
    submissions: withFallback(Math.round(meanBy(submissions, field))),
    comments: withFallback(Math.round(meanBy(comments, field))),
  }
}

/**
 * Returns the controversiality percent.
 * @param {Array}
 * @return {String}
 */
export function getControversialityPercent(comments) {
  const field = 'controversiality'
  // PushShift API lacks the `controversiality` field
  const commentsWithField = comments.filter(comment =>
    comment.hasOwnProperty(field),
  )
  return withFallback((100 * meanBy(commentsWithField, field)).toFixed(1))
}

/**
 * Returns the average binary sentiment, split by submissions and comments.
 * @param {Object}
 * @return {Object}
 */
export function getBinarySentiment({ submissions, comments }) {
  function getSentiments(arr, field) {
    return arr.map(item => binarySentiment(item[field] || '')).filter(Boolean)
  }

  function getPositiveSentimentRatio(sentiments) {
    return (
      sentiments.reduce((acc, sentiment) => acc + (sentiment > 0 ? 1 : 0), 0) /
      sentiments.length
    )
  }

  const submissionSentiments = getSentiments(submissions, SUBMISSION_BODY_FIELD)
  const commentSentiments = getSentiments(comments, COMMENT_BODY_FIELD)

  return {
    submissions: getPositiveSentimentRatio(submissionSentiments),
    comments: getPositiveSentimentRatio(commentSentiments),
  }
}

/**
 * Returns the average emotional sentiment, split by submissions and comments.
 * @param {Object}
 * @return {Object}
 */
export function getEmotionalSentiment({ submissions, comments }) {
  return {
    submissions: submissions.map(item =>
      emotionalSentiment(submissionBody(item)),
    ),
    comments: comments.map(item => emotionalSentiment(commentBody(item))),
  }
}
