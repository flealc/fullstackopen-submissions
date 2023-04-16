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
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    url: 'https://www.example.com/catcher',
    likes: 456
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterPost = await helper.blogsInDb()
  const titles = blogsAfterPost.map(b => b.title)

  expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

  expect(titles).toContain('The Catcher in the Rye')
})

test('if the likes property is missing, it will default to zero', async () => {

  const newBlog = {
    title: 'Like Me Please: The Inspiring History of A Likeless Blog',
    author: 'Blog_In_Progress',
    url: 'http://www.blogtosuccess.net',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('if the title field is missing, server responds with 400 Bad Request', async () => {
  const newBlog = {
    author: 'Blog_In_Progress',
    url: 'http://www.blogtosuccess.net',
    likes: 456
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('if the url field is missing, server responds with 400 Bad Request', async () => {
  const newBlog = {
    title: 'Like Me Please: The Inspiring History of A Likeless Blog',
    author: 'Blog_In_Progress',
    likes: 456
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deletion of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = (await blogsAtEnd).map(b => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('updating likes count for a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ ...blogToUpdate, likes: blogToUpdate.likes + 5 })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  expect(response.body.likes).toEqual(blogToUpdate.likes + 5)
})

afterAll(async () => {
  await mongoose.connection.close()
})