const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('username validity tests', () => {

  beforeEach( async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('passw0rd', 10)
    const user = new User({ username: 'itsme', password: passwordHash })

    await user.save()
  })

  test('creation succeeds when all parameters properly submitted', async () => {

    const initialUsers = await helper.usersInDb()
    const user = {
      username: 'fleal',
      user: 'FL',
      password: 's3cur3pass'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

    const users = usersAtEnd.map(user => user.username)
    expect(users).toContain('fleal')
  })

  test('creation fails if username already exists', async () => {

    const initialUsers = await helper.usersInDb()
    const user = {
      username: 'itsme',
      user: 'IM',
      password: 's3cur3pass'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)

  })

  test('creation fails if username too short', async () => {
    const initialUsers = await helper.usersInDb()
    const user = {
      username: 'it',
      user: 'IM',
      password: 's3cur3pass'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` (`it`) is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('creation fails if username not provided', async () => {
    const initialUsers = await helper.usersInDb()
    const user = {
      username: '',
      user: 'IM',
      password: 's3cur3pass'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('creation fails if password too short', async () => {
    const initialUsers = await helper.usersInDb()
    const user = {
      username: 'itsme',
      user: 'IM',
      password: 'pa'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('creation fails if password not provided', async () => {
    const initialUsers = await helper.usersInDb()
    const user = {
      username: 'itsme',
      user: 'IM',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('a password is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })


  afterAll( async () => {
    mongoose.connection.close()
  })
})