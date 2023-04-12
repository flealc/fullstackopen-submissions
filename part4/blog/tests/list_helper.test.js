const listHelper = require('../utils/list_helper')

describe('total Likes', () => {
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

  const listWithThreeBlogs = [
    {
      'title': 'How to do this',
      'author': 'Me!',
      'url': 'http://thisisanexample.com/blogpost/200345',
      'likes': 5,
      'id': '6436203f5da1183555b26eb6'
    },
    {
      'title': 'Maybe doing this is fun',
      'author': 'SomeAuthor_345',
      'url': 'http://myblogspot.com/maybe.html',
      'likes': 6,
      'id': '643620495da1183555b26eba'
    },
    {
      'title': 'It takes some time',
      'author': 'raw_philosopher',
      'url': 'http://patience.com/news/time-is-of-the-essence',
      'likes': 10,
      'id': '6436204b5da1183555b26ebc'
    },
    {
      title: 'Like Me Please: The Inspiring History of A Likless Blog',
      author: 'Blog_In_Progress',
      url: 'http://www.blogtosuccess.net',
      id: '5a422aa71b54a676234d17e3'
    }
  ]


  test('when list has one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('when list is empty, equals 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when blog has no like field, result is zero', () => {
    expect(listHelper.totalLikes(blogWithNoLikes)).toBe(0)
  })
  test('when list contains several blogs, returns correct likes count', () => {
    expect(listHelper.totalLikes(listWithThreeBlogs)).toBe(21)
  })
})