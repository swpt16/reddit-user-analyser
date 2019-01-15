import { stripLinks } from './analysis/utils'

const PUSHSHIFT_LIMIT = 1000
const REDDIT_LIMIT = 100

/**
 * Recursive function to fetch all of the user's data.
 * Reddit's native API is preferred as it offers more information,
 * but is limited to 1000 entries. PushShift doesn't seem to consider
 * edits, and scores are delayed by months sometimes. PushShift is used
 * to fetch the entire history after 1000 entries (if necessary).
 * @param {Object} data
 * @param {String} data.username
 * @param {String} data.type
 * @param {Function} data.onComplete
 * @param {Array} data.coalescedData
 * @param {String} data.cursor
 * @param {Boolean} data.shouldUseRedditAPI
 * @param {Boolean} data.didTryPushShiftAPI
 */
export function fetchCombined({
  username,
  type,
  onComplete,
  coalescedData = [],
  cursor = '',
  shouldUseRedditAPI = true,
  didTryPushShiftAPI = false,
}) {
  fetch(
    shouldUseRedditAPI
      ? redditAPI({ username, type, cursor })
      : pushshiftAPI({ username, type, cursor }),
  )
    .then(response => response.json())
    .then(({ data }) => {
      const nextData = (shouldUseRedditAPI
        ? data.children.map(child => child.data)
        : data
      ).map(post => ({
        ...post,
        body: post.body !== undefined ? stripLinks(post.body) : undefined,
        selftext:
          post.selftext !== undefined ? stripLinks(post.selftext) : undefined,
      }))
      const allData = [...coalescedData, ...nextData]
      // Max limit reached suggests more data can be fetched
      if (
        nextData.length ===
        (shouldUseRedditAPI ? REDDIT_LIMIT : PUSHSHIFT_LIMIT)
      ) {
        fetchCombined({
          username,
          type,
          shouldUseRedditAPI,
          onComplete,
          coalescedData: allData,
          cursor: shouldUseRedditAPI
            ? nextData[REDDIT_LIMIT - 1].name
            : nextData[PUSHSHIFT_LIMIT - 1].created_utc,
        })
      } else if (!didTryPushShiftAPI) {
        // Reddit's API can display less than 1000 entries, even if there
        // are more than that. We'll try PushShift's API before exiting.
        // Move the cursor to the last item fetched from Reddit's API.
        fetchCombined({
          username,
          type,
          onComplete,
          coalescedData: allData,
          cursor: allData[allData.length - 1].created_utc,
          shouldUseRedditAPI: false,
          didTryPushShiftAPI: true,
        })
      } else {
        onComplete(allData)
      }
    })
}

/**
 * Return the URL to fetch the user's data from Reddit's API.
 * @param {Object} data
 * @param {String} data.username
 * @param {String} data.type
 * @param {String} data.cursor
 * @return {String} API link
 */
export function redditAPI({ username, type, cursor }) {
  const apiType = { submission: 'submitted', comment: 'comments' }[type]
  return `https://www.reddit.com/user/${username}/${apiType}.json?limit=${REDDIT_LIMIT}&after=${cursor}`
}

/**
 * Return the URL to fetch the user's data from PushShift's API.
 * @param {Object} data
 * @param {String} data.username
 * @param {String} data.type
 * @param {String} data.cursor
 * @return {String}
 */
export function pushshiftAPI({ username, type, cursor }) {
  return `https://api.pushshift.io/reddit/search/${type}/?author=${username}&limit=${PUSHSHIFT_LIMIT}&before=${cursor}`
}

/**
 * Function to fetch the user's "about" data.
 * @param {String} username
 * @return {Promise} the data
 */
export function fetchAbout(username) {
  return fetch(`https://www.reddit.com/user/${username}/about/.json`).then(
    response => response.json(),
  )
}
