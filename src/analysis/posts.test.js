import * as Posts from './posts'

describe('getWords', () => {
  it('works with simple English', () => {
    const words = Posts.getWords({
      submissions: [{ selftext: 'here is some text' }],
      comments: [{ body: 'more text' }],
    })
    const firstSubmission = words.submissions[0]
    const firstComment = words.comments[0]
    expect(firstSubmission[0]).toBe('here')
    expect(firstSubmission[1]).toBe('is')
    expect(firstSubmission[2]).toBe('some')
    expect(firstSubmission[3]).toBe('text')
    expect(firstComment[0]).toBe('more')
    expect(firstComment[1]).toBe('text')
    expect(firstSubmission.length).toBe(4)
    expect(firstComment.length).toBe(2)
  })

  it('works with punctuation and other language characters', () => {
    const words = Posts.getWords({
      submissions: [
        {},
        {
          selftext: 'français!!!!29192; go. .',
        },
        { selftext: '.' },
      ],
      comments: [
        { body: 'text. with; punctuation, mixed---in.' },
        { body: 'je suis français!!!!29192 ---;' },
        { body: 'ß, etc' },
      ],
    })
    expect(words.submissions[0][0]).toBe(undefined)
    expect(words.submissions[1][0]).toBe('français')
    expect(words.submissions[1][1]).toBe('29192')
    expect(words.submissions[1][2]).toBe('go')
    expect(words.submissions[2][0]).toBe('')
    expect(words.comments[0][0]).toBe('text')
    expect(words.comments[0][1]).toBe('with')
    expect(words.comments[0][2]).toBe('punctuation')
    expect(words.comments[0][3]).toBe('mixed---in')
    expect(words.comments[0][4]).toBe(undefined)
    expect(words.comments[1][0]).toBe('je')
    expect(words.comments[1][1]).toBe('suis')
    expect(words.comments[1][2]).toBe('français')
    expect(words.comments[2][0]).toBe('ß')
    expect(words.comments[2][1]).toBe('etc')
  })
})

describe('getTopSubreddits', () => {
  it('returns a sorted array of tuples with shape [name, count]', () => {
    const topSubreddits = Posts.getTopSubreddits({
      submissions: [
        { subreddit: 'example' },
        { subreddit: 'example' },
        { subreddit: 'other' },
        { subreddit: 'react' },
        { subreddit: 'other' },
      ],
      comments: [
        { subreddit: 'react' },
        { subreddit: 'example' },
        { subreddit: 'example' },
        { subreddit: 'react' },
      ],
    })
    expect(topSubreddits).toEqual([['example', 4], ['react', 3], ['other', 2]])
  })
})

describe('getFrequentWords', () => {
  it('returns a sorted array of tuples with the shape [word, count]', () => {
    const words = Posts.getWords({
      submissions: [
        {},
        { selftext: 'one two two three three' },
        { selftext: 'one' },
      ],
      comments: [{ body: 'one one one one' }, { body: 'three' }],
    })
    const frequentWords = Posts.getFrequentWords(words)
    expect(frequentWords).toEqual([['one', 6], ['three', 3], ['two', 2]])
  })
})

describe('getAverageNumberOfWordsPerPost', () => {
  it('works', () => {
    const words = Posts.getWords({
      submissions: [
        { selftext: 'hello this is some text' },
        { selftext: 'this is an example. 129128. Six seven eight.' },
      ],
      comments: [{ body: 'hello' }, { body: 'this is a test.' }],
    })
    const result = Posts.getAverageNumberOfWordsPerPost(words)
    expect(result.submissions).toBe(7)
    expect(result.comments).toBe(3)
  })
})

describe('averageWordLength', () => {
  it('works', () => {
    const words = Posts.getWords({
      submissions: [
        { selftext: 'these are some words.' },
        { selftext: 'more words.' },
      ],
      comments: [
        { body: 'an extremely long sentence' },
        { body: 'example' },
        { body: 'at' },
      ],
    })
    const result = Posts.getAverageWordLength(words)
    expect(result.submissions).toBe('4.33')
    expect(result.comments).toBe('5.33')
  })
})

describe('getAverageKarma', () => {
  it('works', () => {
    const result = Posts.getAverageKarma({
      submissions: [{ score: 10 }, { score: 5 }],
      comments: [{ score: 5 }, { score: 6 }, { score: 7 }],
    })
    expect(result.submissions).toBe(8)
    expect(result.comments).toBe(6)
  })
})

describe('getControversialityPercent', () => {
  it('works', () => {
    const result = Posts.getControversialityPercent({
      comments: [
        { controversiality: 1 },
        { controversiality: 0 },
        { controversiality: 0 },
      ],
    })
    expect(result).toBe('33.3')
  })
})
