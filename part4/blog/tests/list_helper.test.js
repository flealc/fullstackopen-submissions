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
    title: 'Like Me Please: The Inspiring History of A Likeless Blog',
    author: 'Blog_In_Progress',
    url: 'http://www.blogtosuccess.net',
    id: '5a422aa71b54a676234d17e3'
  }
]

const bothArePopular = listWithOneBlog.concat(listWithFourBlogs[0], {})

const listWithManyBlogs = [
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/catcher',
    likes: 456,
    id: 'm9n8b7v6c5x4z3a2s1d0f'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    url: 'https://www.example.com/mockingbird',
    likes: 789,
    id: 'q1w2e3r4t5y6u7i8o9p0a1s'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    url: 'https://www.example.com/gatsby',
    likes: 234,
    id: 'z2x3c4v5b6n7m8l9k0j1h'
  },
  {
    title: '1984',
    author: 'George Orwell',
    url: 'https://www.example.com/1984',
    likes: 567,
    id: 'p0o9i8u7y6t5r4e3w2q1a'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    url: 'https://www.example.com/hobbit',
    likes: 890,
    id: 'y1u2i3o4p5a6s7d8f9g0h'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    url: 'https://www.example.com/pride',
    likes: 345,
    id: 'l1k2j3h4g5f6d7s8a9p0o'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    url: 'https://www.example.com/alchemist',
    likes: 678,
    id: 'b1v2n3m4q5w6e7r8t9y0u'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    url: 'https://www.example.com/lotr',
    likes: 1234,
    id: 'h1j2k3l4m5n6b7v8c9x0z'
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    url: 'https://www.example.com/hunger',
    likes: 5678,
    id: 'g1f2d3s4a5p6o7i8u9y0t'
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    url: 'https://www.example.com/harry',
    likes: 9012,
    id: 'r1e2w3q4t5y6u7i8o9p0a'
  },
  {
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    url: 'https://www.example.com/narnia',
    likes: 3456,
    id: 'x1c2v3b4n5m6l7k8j9h0g'
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    url: 'https://www.example.com/davinci',
    likes: 7890,
    id: 'a1s2d3f4g5h6j7k8l9z0x'
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    url: 'https://www.example.com/girl',
    likes: 2345,
    id: 'q1w2e3r4t5y6u7i8o9p0a'
  },
  {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://www.example.com/hitchhiker',
    likes: 6789,
    id: 's1d2f3g4h5j6k7l8z9x0c'
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
    url: 'https://www.example.com/shining',
    likes: 12345,
    id: 'r1t2y3e4w5q6u7i8o9p0a'
  },
  {
    title: 'Franny and Zooey',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/franny',
    likes: 456,
    id: 'u2y3t4r5e6w7q8a9s0d1f'
  },
  {
    title: 'Raise High the Roof Beam, Carpenters',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/roof-beam',
    likes: 789,
    id: 'l9k8j7h6g5f4d3s2a1p0o'
  },
  {
    title: 'Zooey',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/zooey',
    likes: 234,
    id: 'w0e9r8t7y6u5i4o3p2a1s'
  },
  {
    title: 'Nine Stories',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/nine',
    likes: 123,
    id: 'c5v6b7n8m9a1s2d3f4g5h'
  },
  {
    title: 'Franny',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/franny-2',
    likes: 567,
    id: 'z0x9c8v7b6n5m4l3k2j1h'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/catcher-rye',
    likes: 567,
    id: 'z1x2c3v4b5n6m7l8k9j0h'
  },
  {
    title: 'Teddy',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/teddy',
    likes: 234,
    id: 'b1v2n3m4q5w6e7r8t9y0u'
  }
]

const listWithMoreBlogs = [
  {
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    url: 'https://www.example.com/sherlock',
    likes: 789,
    id: 'q1w2e3r4t5y6u7i8o9p0a'
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    url: 'https://www.example.com/dorian-gray',
    likes: 234,
    id: 'z2x3c4v5b6n7m8l9k0j1h'
  },
  {
    title: 'The War of the Worlds',
    author: 'H.G. Wells',
    url: 'https://www.example.com/war-worlds',
    likes: 567,
    id: 'p0o9i8u7y6t5r4e3w2q1a'
  },
  {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://www.example.com/hitchhiker',
    likes: 890,
    id: 'y1u2i3o4p5a6s7d8f9g0h'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/catcher',
    likes: 345,
    id: 'l1k2j3h4g5f6d7s8a9p0o'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    url: 'https://www.example.com/hobbit',
    likes: 678,
    id: 'b1v2n3m4q5w6e7r8t9y0u'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    url: 'https://www.example.com/pride',
    likes: 1234,
    id: 'h1j2k3l4m5n6b7v8c9x0z'
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    url: 'https://www.example.com/hunger',
    likes: 5678,
    id: 'g1f2d3s4a5p6o7i8u9y0t'
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    url: 'https://www.example.com/harry',
    likes: 9012,
    id: 'r1e2w3q4t5y6u7i8o9p0a'
  },
  {
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    url: 'https://www.example.com/narnia',
    likes: 3456,
    id: 'x1c2v3b4n5m6l7k8j9h0g'
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    url: 'https://www.example.com/davinci',
    likes: 7890,
    id: 'a1s2d3f4g5h6j7k8l9z0x'
  },
  {
    title: 'Raise High the Roof Beam, Carpenters',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/roof-beam',
    likes: 987,
    id: 'q2w3e4r5t6y7u8i9o0p1a'
  },
  {
    title: 'Dirk Gently\'s Holistic Detective Agency',
    author: 'Douglas Adams',
    url: 'https://www.example.com/dirk-gently',
    likes: 763,
    id: 'z3x4c5v6b7n8m9l0k1j2h'
  },
  {
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    url: 'https://www.example.com/fellowship',
    likes: 456,
    id: 's1d2f3g4h5j6k7l8z9x0c'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    url: 'https://www.example.com/mockingbird',
    likes: 789,
    id: 'u2y3t4r5e6w7q8a9s0d1f'
  },
  {
    title: 'Nineteen Eighty-Four',
    author: 'George Orwell',
    url: 'https://www.example.com/nineteen',
    likes: 123,
    id: 'l9k8j7h6g5f4d3s2a1p0o'
  },
  {
    title: 'The Invisible Man',
    author: 'H.G. Wells',
    url: 'https://www.example.com/invisible-man',
    likes: 234,
    id: 'w0e9r8t7y6u5i4o3p2a1s'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Bronte',
    url: 'https://www.example.com/wuthering-heights',
    likes: 567,
    id: 'z1x2c3v4b5n6m7l8k9j0h'
  },
  {
    title: 'Life of Pi',
    author: 'Yann Martel',
    url: 'https://www.example.com/life-pi',
    likes: 890,
    id: 'y9u8i7o6p5a4s3d2f1g0h'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    url: 'https://www.example.com/brave-new-world',
    likes: 1234,
    id: 'g9f8d7s6a5p4o3i2u1y0t'
  },
  {
    title: 'The Two Towers',
    author: 'J.R.R. Tolkien',
    url: 'https://www.example.com/two-towers',
    likes: 5678,
    id: 's9d8f7g6h5j4k3l2z1x0c'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    url: 'https://www.example.com/great-gatsby',
    likes: 9012,
    id: 'r9e8w7q6t5y4u3i2o1p0a'
  },
  {
    title: 'The Return of the King',
    author: 'J.R.R. Tolkien',
    url: 'https://www.example.com/return-king',
    likes: 3456,
    id: 'x9c8v7b6n5m4l3k2j1h0g'
  }
]


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

describe('most blogs', () => {

  test('when list is empty, returns empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('returns an object with the right author and blog count', () => {
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
      'author': 'J.D. Salinger',
      'blogs': 8,
    })
  })
})

describe('most likes', () => {

  test('when list is empty, returns empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('returns an object with the right author and likes count', () => {
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({ author: 'Stephen King', likes: 12345 })
  })

  test('returns an object with the right author and likes count', () => {
    expect(listHelper.mostLikes(listWithMoreBlogs)).toEqual({ author: 'J.R.R. Tolkien', likes: 10268 })
  })

})