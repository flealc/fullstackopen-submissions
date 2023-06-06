import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('blog creator handler function gets calles with the right details', async () => {
  const mockHandler = jest.fn()

  render(<BlogForm createBlog={mockHandler} />)

  const fields = screen.getAllByRole('textbox')
  expect(fields).toHaveLength(3)

  const user = userEvent.setup()
  await user.type(fields[0], 'This is a sample. Blog!')
  await user.type(fields[1], 'John Testy')
  await user.type(fields[2], 'https://www.thisisatesturl.com')

  const button = screen.getByText('create')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].content).toBe({
    title: 'This is a sample. Blog!',
    author: 'John Testy',
    url: 'https://www.thisisatesturl.com'
  }.toJSON)
})