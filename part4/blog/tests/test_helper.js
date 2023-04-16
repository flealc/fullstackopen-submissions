const Blog = require('../models/blog')

const initialBlogs = [

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
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}