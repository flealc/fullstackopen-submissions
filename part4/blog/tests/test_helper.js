const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [

  {
    title: 'How to do this',
    author: 'Me!',
    url: 'http://thisisanexample.com/blogpost/200345',
    likes: 5
  },
  {
    title: 'Maybe doing this is fun',
    author: 'SomeAuthor_345',
    url: 'http://myblogspot.com/maybe.html',
    likes: 6
  },
  {
    title: 'It takes some time',
    author: 'raw_philosopher',
    url: 'http://patience.com/news/time-is-of-the-essence',
    likes: 10
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find(({}))
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}