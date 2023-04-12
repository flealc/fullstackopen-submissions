const listHelper = require('../utils/list_helper')


const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    id: '5a422aa71b54a676234d17f8'
  }
]

const blogWithNoLikes = [
  {
    title: 'Like Me Please: The Inspiring History of A Likless Blog',
    author: 'Blog_In_Progress',
    url: 'http://www.blogtosuccess.net',
    id: '5a422aa71b54a676234d17e3'
  }
]

const listWithFourBlogs = [
  {
    title: 'How to do this',
    author: 'Me!',
    url: 'http://thisisanexample.com/blogpost/200345',
    likes: 5,
    id: '6436203f5da1183555b26eb6'
  },
  {
    title: 'Maybe doing this is fun',
    author: 'SomeAuthor_345',
    url: 'http://myblogspot.com/maybe.html',
    likes: 6,
    id: '643620495da1183555b26eba'
  },
  {
    title: 'It takes some time',
    author: 'raw_philosopher',
    url: 'http://patience.com/news/time-is-of-the-essence',
    likes: 10,
    id: '6436204b5da1183555b26ebc'
  },
  {
    title: 'Like Me Please: The Inspiring History of A Likless Blog',
    author: 'Blog_In_Progress',
    url: 'http://www.blogtosuccess.net',
    id: '5a422aa71b54a676234d17e3'
  }
]

const bothArePopular = listWithOneBlog.concat(listWithFourBlogs[0], {})

describe('total Likes', () => {

  test('when list has one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('when list is empty, equals zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when blog has no like field, result is zero', () => {
    expect(listHelper.totalLikes(blogWithNoLikes)).toBe(0)
  })
  test('when list contains several blogs, returns correct likes count', () => {
    expect(listHelper.totalLikes(listWithFourBlogs)).toBe(21)
  })
})

describe('favorite blog', () => {

  test('when list is empty, returns empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when blog has no likes field, it is considered to have zero likes', () => {
    expect(listHelper.favoriteBlog(blogWithNoLikes)).toEqual({})
  })

  test('returns most liked blog entry', () => {
    expect(listHelper.favoriteBlog(listWithFourBlogs)).toEqual(listWithFourBlogs[2])
  })

  test('returns a blog when ther is a tie', () => {
    expect(listHelper.favoriteBlog(bothArePopular)).toEqual(listWithOneBlog[0])
  })
})