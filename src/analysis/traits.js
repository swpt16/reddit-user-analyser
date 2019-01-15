/**
 * Get the first match according to the regexes
 * @param {String} str
 * @param {RegExp[]} regexes
 */
export function getFirstMatch(str, regexes) {
  if (!str) {
    return
  }

  for (let i = 0; i < regexes.length; i++) {
    const match = str.match(regexes[i])
    if (match) {
      return match[1]
    }
  }
}

/**
 * Searches all of the user's comments and submissions while executing
 * the regex against it.
 * @param {Object}
 * @param {RegExp[]} regexes
 */
export function getTrait({ submissions, comments }, regexes) {
  // The function to run the value through to clean it up.
  const normalize = getNormalizeFunc(regexes.name)

  // Search comments first.
  for (const comment of comments) {
    const result = getFirstMatch(comment.body, regexes)
    if (result) {
      return {
        value: normalize(result, comment.created_utc),
        post: comment,
      }
    }
  }
  // Then submissions (body and title).
  for (const submission of submissions) {
    const result =
      getFirstMatch(submission.title, regexes) ||
      getFirstMatch(submission.selftext, regexes)
    if (result) {
      return {
        value: normalize(result, submission.created_utc),
        post: submission,
      }
    }
  }

  // Trait was not found.
  return {
    value: 'Unknown',
    post: submissions[0] || comments[0],
  }
}

/**
 * The user will mention their age at a specific date, but we're
 * interested in their current age. This will return their current
 * age given the date it was posted at.
 * @param {String} value
 * @param {Number} timestamp
 * @return {Number}
 */
export function getAdjustedAge(value, timestamp) {
  return value !== 'Unknown'
    ? Number(value) +
        (new Date().getFullYear() - new Date(timestamp * 1000).getFullYear())
    : Number(value)
}

/**
 * Returns the appropriate normalizing function.
 * @param {String} name
 * @return {Function}
 */
export function getNormalizeFunc(name) {
  switch (name) {
    case 'AGE': {
      return getAdjustedAge
    }
    case 'GENDER': {
      return normalizeGender
    }
    case 'HEIGHT': {
      return normalizeHeight
    }
    case 'WEIGHT': {
      return normalizeWeight
    }
    default: {
      return x => x
    }
  }
}

/**
 * Normalizes units to either `kg` or `lbs`.
 * It's more common to leave off the units for imperial measurements.
 * @param {String} value
 * @return {String}
 */
export function normalizeWeight(value) {
  const digits = value.match(/\d+/)[0]
  return /kg|kilo/.test(value) ? `${digits} kg` : `${digits} lbs`
}

/**
 * Normalizes gender to a single letter - M / F.
 * @param {String} value
 * @return {String}
 */
export function normalizeGender(value) {
  const isM = /m|man|male|guy|dude|bloke/i.test(value)
  return isM ? 'M' : 'F'
}

/**
 * Normalizes height
 * @param {String} value
 * @return {String}
 */
export function normalizeHeight(value) {
  // TODO
  return value
}
