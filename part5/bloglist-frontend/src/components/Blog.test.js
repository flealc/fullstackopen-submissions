import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog >/', () => {

  let container

  beforeEach(() => {
    localStorage.setItem('loggedUser', JSON.stringify({ token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ…BiOHYt-xNaGlvM2I', username:'test_user',name:'TU' }))

    const blog = {
      title: 'This is a sample. Blog!',
      author: 'John Testy',
      url: 'https://www.thisisatesturl.com',
      likes: 1000,
      user: 'test_user'
    }
    container = render(<Blog blog={blog} />).container
  })

  test('renders title and author but not url or likes by default', () => {


    const div = container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('renders url and likes once the "view" button is clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('view')
    await user.click(button)

    const div = container.querySelector('.blogDetails')

    expect(div).toHaveStyle('display: none')
    screen.getByText('likes', { exact: false })
    screen.getByText('https://www.thisisatesturl.com')
  })

})