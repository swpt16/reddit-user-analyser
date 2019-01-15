import React, { useState } from 'react'
import {
  GlobalStyle,
  TippyThemes,
  Container,
  Center,
} from './components/Framework'
import Header from './components/Header'
import Search from './components/Search'
import Analysis from './components/Analysis'
import { Emojione } from 'react-emoji-render'
import {
  getWords,
  getTopSubreddits,
  getFrequentWords,
  getAverageNumberOfWordsPerPost,
  getAverageWordLength,
  getAverageKarma,
  getControversialityPercent,
  getBinarySentiment,
} from './analysis/posts'
import { getTrait } from './analysis/traits'
import { fetchCombined, fetchAbout } from './api'
import * as regex from './analysis/regex'
import SUBMISSIONS from './data/cache/submissions.json'
import COMMENTS from './data/cache/comments.json'
import ABOUT from './data/cache/about.json'

const useCache = false && process.env.NODE_ENV === 'development'
const submissionsCache = SUBMISSIONS.data.children.map(child => child.data)
const commentsCache = COMMENTS.data.children.map(child => child.data)
const aboutCache = ABOUT.data

const INITIAL_STATUS = {
  isFetching: false,
  isCalculating: false,
  comment: false,
  submission: false,
  about: false,
}

function App() {
  const [status, setStatus] = useState(INITIAL_STATUS)
  const [username, setUsername] = useState('')
  const [about, setAbout] = useCache ? [aboutCache, () => {}] : useState({})
  const [submissions, setSubmissions] = useCache
    ? [submissionsCache, () => {}]
    : useState([])
  const [comments, setComments] = useCache
    ? [commentsCache, () => {}]
    : useState([])
  const posts = { submissions, comments }
  const words = getWords(posts)

  /**
   * Resets everything back to empty.
   */
  function onChangeUsername(input) {
    setUsername(input)
    setStatus(INITIAL_STATUS)
    setSubmissions([])
    setComments([])
  }

  /**
   * Update current fetching status.
   * @param {String} type
   */
  function updateStatus(type) {
    setStatus(status => {
      const next = { ...status, [type]: true }
      next.isFetching = !next.submission || !next.comment || !next.about
      return next
    })
  }

  /**
   * Once the 'Analyse' button is pressed, start fetching the user's data.
   */
  function onSubmit() {
    setStatus(status => ({ ...status, isFetching: true }))
    fetchCombined({
      username,
      type: 'submission',
      onComplete: data => {
        setSubmissions(data)
        updateStatus('submission')
      },
    })
    fetchCombined({
      username,
      type: 'comment',
      onComplete: data => {
        setComments(data)
        updateStatus('comment')
      },
    })
    fetchAbout(username).then(({ data }) => {
      setAbout(data)
      updateStatus('about')
    })
  }

  /**
   * Determines if there is no data stored once fetching is fully complete.
   * @return {Boolean}
   */
  function isEmptyDataOnFetchComplete() {
    return (
      submissions.length === 0 &&
      comments.length === 0 &&
      status.submission &&
      status.comment
    )
  }

  /**
   * Determines if the analysis UI should be displayed.
   * @return {Boolean}
   */
  function shouldDisplayAnalysis() {
    return !isEmptyDataOnFetchComplete() && status.comment && status.submission
  }

  /**
   * Returns the data object of all the analysis performed
   * @return {Object}
   */
  function createDataObject() {
    const avgKarma = getAverageKarma(posts)
    const avgNoWordsPerPost = getAverageNumberOfWordsPerPost(words)
    const avgWordLength = getAverageWordLength(words)

    return {
      username,
      about,
      traits: {
        physical: {
          age: getTrait(posts, regex.age),
          gender: getTrait(posts, regex.gender),
          height: getTrait(posts, regex.height),
          weight: getTrait(posts, regex.weight),
        },
        other: {
          location: getTrait(posts, regex.location),
          occupation: getTrait(posts, regex.occupation),
        },
      },
      posts: {
        card: {
          'Total Submissions': submissions.length,
          'Total Comments': comments.length,
          'Avg. Submission Karma': avgKarma.submissions,
          'Avg. Comment Karma': avgKarma.comments,
          'Avg. No. Words (Submissions)': avgNoWordsPerPost.submissions,
          'Avg. No. Words (Comments)': avgNoWordsPerPost.comments,
          'Avg. Word Length (Submissions)': avgWordLength.submissions,
          'Avg. Word Length (Comments)': avgWordLength.comments,
          '% Controversial Posts': getControversialityPercent(comments),
        },
        barLists: {
          topSubreddits: getTopSubreddits(posts),
          frequentWords: getFrequentWords(words),
        },
        sentiment: {
          binary: getBinarySentiment(posts),
        },
      },
    }
  }

  const data = createDataObject()

  if (!status.isFetching) {
    console.log(data)
  }

  return (
    <div>
      <GlobalStyle />
      <TippyThemes />
      <Header>
        <Container mobilePadding={2}>
          <Search
            username={username}
            setUsername={onChangeUsername}
            status={status}
            isLoading={status.isFetching}
            onSubmit={onSubmit}
          />
        </Container>
      </Header>
      <Container>
        {isEmptyDataOnFetchComplete() && (
          <Center style={{ fontSize: 18 }}>
            No data found for this user <Emojione text="😞" svg />
          </Center>
        )}
        {<Analysis data={data} />}
      </Container>
    </div>
  )
}

export default App
