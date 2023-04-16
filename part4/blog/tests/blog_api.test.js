const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects =
  helper.initialBlogs.map(b => new Blog(b))

  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})


test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have a property "id"', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()
})

test('successfully create a new blog', async () => {
  const newBlog = {
    title: 'Like Me Please: The Inspiring History of A Likeless Blog',
    author: 'Blog_In_Progress',
    url: 'http://www.blogtosuccess.net',
    id: '5a422aa71b54a676234d17e3'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterPost = await helper.blogsInDb()
  const titles = blogsAfterPost.map(b => b.title)

  expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

  expect(titles).toContain('Like Me Please: The Inspiring History of A Likeless Blog')
})

afterAll(async () => {
  await mongoose.connection.close()
})